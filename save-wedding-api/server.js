require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware សម្រាប់អនុញ្ញាតការហៅ API និងការទទួលទិន្នន័យ JSON
app.use(cors());
app.use(express.json());

// កូនសោសម្ងាត់សម្រាប់បង្កើត Token (គួរដាក់ក្នុង File .env)
const JWT_SECRET = process.env.JWT_SECRET || 'save-wedding-secret-key-2024';

// ភ្ជាប់ទៅ Database (CockroachDB)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// ==========================================
// Middleware: ផ្ទៀងផ្ទាត់សោសម្ងាត់ (Token Authentication)
// ==========================================
const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'អ្នកមិនទាន់បាន Login ទេ!' });
  
  const token = authHeader.split(' ')[1]; // យកពាក្យ Bearer ចេញ
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'សោសម្ងាត់ (Token) ផុតកំណត់ ឬមិនត្រឹមត្រូវ!' });
    req.user = user; // ភ្ជាប់ទិន្នន័យ user (id, role) ទៅកាន់ request
    next();
  });
};


// ==========================================
// ផ្នែកទី១៖ API សម្រាប់គណនី (Authentication)
// ==========================================

// ១.១ API សម្រាប់ Login ចូលប្រព័ន្ធ
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'ឈ្មោះគណនី ឬលេខសម្ងាត់មិនត្រឹមត្រូវ!' });
    }

    const user = result.rows[0];

    // 🌟 ឆែកមើលថាតើគណនីត្រូវបាន "ផ្អាក" ឬទេ?
    if (user.is_active === false) {
      return res.status(403).json({ error: 'គណនីរបស់អ្នកត្រូវបានផ្អាកជាបណ្តោះអាសន្ន! សូមទាក់ទង Admin។' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(401).json({ error: 'ឈ្មោះគណនី ឬលេខសម្ងាត់មិនត្រឹមត្រូវ!' });

    // បន្តបង្កើត Token ធម្មតា...
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ message: 'Login ជោគជ័យ', token, user: { id: user.id, username: user.username, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// ផ្នែកទី២៖ API សម្រាប់គ្រប់គ្រងគណនី User (មានតែ Owner ទើបប្រើបាន)
// ==========================================

// ២.១ ទាញយកបញ្ជី User ទាំងអស់ (មិនបង្ហាញ Owner ទេ)
app.get('/api/users', authenticate, async (req, res) => {
  if(req.user.role !== 'owner') return res.status(403).json({error: 'មានតែ Owner ទេដែលអាចប្រើមុខងារនេះបាន!'});
  
  try {
    const result = await pool.query("SELECT id, username, role, plan_type, record_limit, storage_limit_kb, expiry_date, created_at FROM users WHERE role != 'owner' ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ២.២ បង្កើតគណនី User ថ្មី (រួមទាំងការកំណត់ Limit ផ្សេងៗ)
app.post('/api/users', authenticate, async (req, res) => {
  if(req.user.role !== 'owner') return res.status(403).json({error: 'មានតែ Owner ទេដែលអាចបង្កើតគណនីបាន!'});

  const { username, password, plan_type, record_limit, storage_limit_kb, expiry_date } = req.body;
  try {
    // ឆែកមើលក្រែងលោមានឈ្មោះនេះរួចហើយ
    const check = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if(check.rows.length > 0) return res.status(400).json({error: 'ឈ្មោះគណនីនេះមានរួចហើយ!'});

    // Hash Password និងរក្សាទុកទិន្នន័យ
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    
    const result = await pool.query(
      "INSERT INTO users (username, password_hash, role, plan_type, record_limit, storage_limit_kb, expiry_date) VALUES ($1, $2, 'user', $3, $4, $5, $6) RETURNING id, username, role",
      [username, password_hash, plan_type || 'Free', record_limit || 200, storage_limit_kb || 10240, expiry_date || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ២.៣ លុបគណនី User ចោល
app.delete('/api/users/:id', authenticate, async (req, res) => {
  if(req.user.role !== 'owner') return res.status(403).json({error: 'មានតែ Owner ទេដែលអាចលុបគណនីបាន!'});

  const { id } = req.params;
  try {
    // យើងក៏គួរតែលុប Contributions របស់ User នោះផងដែរមុននឹងលុបគណនី (ការពារសំរាម Database)
    await pool.query('DELETE FROM contributions WHERE user_id = $1', [id]);
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    
    res.json({ message: "លុបគណនីជោគជ័យ" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ==========================================
// ផ្នែកទី៣៖ API សម្រាប់ការចំណាយ (Contributions)
// ==========================================

// ៣.១ API សម្រាប់បញ្ចូលទិន្នន័យចងដៃថ្មី (Create) ជាមួយការត្រួតពិនិត្យ
app.post('/api/contributions', authenticate, async (req, res) => {
  const { guest_name, event_name, amount, currency, event_date, notes, address } = req.body;
  
  try {
    // ១. ទាញយកព័ត៌មានគណនីមកត្រួតពិនិត្យ
    const userQuery = await pool.query('SELECT expiry_date, record_limit FROM users WHERE id = $1', [req.user.id]);
    const userData = userQuery.rows[0];

    // ២. ឆែកមើលថាតើគណនីផុតកំណត់ថ្ងៃឬនៅ?
    if (userData.expiry_date && new Date(userData.expiry_date) < new Date()) {
      return res.status(403).json({ error: 'គណនីរបស់អ្នកបានផុតកំណត់ហើយ! សូមទាក់ទងមកកាន់ Admin។' });
    }

    // ៣. ឆែកមើលចំនួនប្រវត្តិការ (Record Limit) បើមានកំណត់
    if (userData.record_limit !== null) {
        const countQuery = await pool.query('SELECT count(*) FROM contributions WHERE user_id = $1', [req.user.id]);
        if (parseInt(countQuery.rows[0].count) >= userData.record_limit) {
        return res.status(403).json({ error: `អ្នកបានបញ្ចូលលើសទំហំកំណត់ (${userData.record_limit} ជួរ) ហើយ! សូមអាប់ដេតគម្រោងថ្មី។` });
        }
    }

    // ៤. បញ្ចូលទិន្នន័យដោយភ្ជាប់ជាមួយ user_id របស់អ្នកដែលបាន Login
    const result = await pool.query(
      'INSERT INTO contributions (guest_name, event_name, amount, currency, event_date, notes, address, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [guest_name, event_name, amount, currency, event_date, notes, address, req.user.id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ២.៣ API សម្រាប់កែប្រែគណនី (Edit User)
app.put('/api/users/:id', authenticate, async (req, res) => {
  if(req.user.role !== 'owner') return res.status(403).json({error: 'មានតែ Owner ទេដែលអាចកែប្រែបាន!'});
  const { id } = req.params;
  const { username, password, plan_type, record_limit, storage_limit_kb, expiry_date } = req.body;
  
  try {
    let query, values;
    if (password) { // បើមានវាយលេខសម្ងាត់ថ្មី
      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(password, salt);
      query = "UPDATE users SET username=$1, password_hash=$2, plan_type=$3, record_limit=$4, storage_limit_kb=$5, expiry_date=$6 WHERE id=$7 RETURNING id";
      values = [username, password_hash, plan_type, record_limit, storage_limit_kb, expiry_date, id];
    } else { // បើមិនប្តូរលេខសម្ងាត់ទេ
      query = "UPDATE users SET username=$1, plan_type=$2, record_limit=$3, storage_limit_kb=$4, expiry_date=$5 WHERE id=$6 RETURNING id";
      values = [username, plan_type, record_limit, storage_limit_kb, expiry_date, id];
    }
    await pool.query(query, values);
    res.json({ message: "កែប្រែជោគជ័យ" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ២.៤ API សម្រាប់ផ្អាក/បើកគណនី (Toggle Status)
app.patch('/api/users/:id/status', authenticate, async (req, res) => {
  const { id } = req.params;
  const { is_active } = req.body; // ត្រូវប្រាកដថា Frontend បញ្ជូនឈ្មោះ key នេះមក
  try {
    await pool.query('UPDATE users SET is_active = $1 WHERE id = $2', [is_active, id]);
    res.json({ message: "Update ជោគជ័យ" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ៣.២ API សម្រាប់ទាញយកទិន្នន័យ និងស្វែងរក (Read / Search) តែរបស់ខ្លួនឯងប៉ុណ្ណោះ
app.get('/api/contributions', authenticate, async (req, res) => {
  const { search } = req.query;
  try {
    // ត្រងយកតែទិន្នន័យដែលជាកម្មសិទ្ធិរបស់ user_id នោះ
    let query = 'SELECT * FROM contributions WHERE user_id = $1 ORDER BY event_date DESC';
    let values = [req.user.id];

    if (search) {
      query = 'SELECT * FROM contributions WHERE user_id = $1 AND (guest_name ILIKE $2 OR event_name ILIKE $2) ORDER BY event_date DESC';
      values = [req.user.id, `%${search}%`];
    }

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🌟 ១. API សម្រាប់ទាញយកទិន្នន័យចងដៃ "មួយជាក់លាក់" (សម្រាប់បង្ហាញពេលបើកទំព័រ Edit)
app.get('/api/contributions/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    // ទាញយកតែទិន្នន័យដែលមាន id ត្រូវគ្នា និងជារបស់ User ដែលកំពុង Login ប៉ុណ្ណោះ
    const result = await pool.query(
      'SELECT * FROM contributions WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "រកមិនឃើញទិន្នន័យនេះទេ!" });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🌟 ២. API សម្រាប់ Update (រក្សាទុកការកែប្រែ)
app.put('/api/contributions/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { guest_name, event_name, amount, currency, event_date, address, notes } = req.body;
    
    const result = await pool.query(
      `UPDATE contributions 
       SET guest_name = $1, event_name = $2, amount = $3, currency = $4, event_date = $5, address = $6, notes = $7 
       WHERE id = $8 AND user_id = $9 
       RETURNING *`,
      [guest_name, event_name, amount, currency, event_date, address, notes, id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "រកមិនឃើញទិន្នន័យ ឬអ្នកគ្មានសិទ្ធិកែប្រែ!" });
    }
    
    res.json({ message: "កែប្រែទិន្នន័យបានជោគជ័យ", data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ៣.៣ API សម្រាប់កែប្រែទិន្នន័យ (Update)
app.put('/api/contributions/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { guest_name, event_name, amount, currency, event_date, notes, address } = req.body;
  try {
    // អនុញ្ញាតឲ្យកែតែទិន្នន័យរបស់ខ្លួនឯង
    const result = await pool.query(
      'UPDATE contributions SET guest_name = $1, event_name = $2, amount = $3, currency = $4, event_date = $5, notes = $6, address = $7 WHERE id = $8 AND user_id = $9 RETURNING *',
      [guest_name, event_name, amount, currency, event_date, notes, address, id, req.user.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'រកមិនឃើញទិន្នន័យនេះទេ ឬអ្នកគ្មានសិទ្ធិកែប្រែវាឡើយ' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ៣.៤ API សម្រាប់លុបទិន្នន័យ (Delete)
app.delete('/api/contributions/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    // អនុញ្ញាតឲ្យលុបតែទិន្នន័យរបស់ខ្លួនឯង
    const result = await pool.query('DELETE FROM contributions WHERE id = $1 AND user_id = $2 RETURNING id', [id, req.user.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'រកមិនឃើញទិន្នន័យនេះទេ ឬអ្នកគ្មានសិទ្ធិលុបវាឡើយ' });
    }
    
    res.json({ message: "លុបទិន្នន័យជោគជ័យ" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// បើកដំណើរការ Server (Start Server)
// ==========================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`\n✅ Server កំពុងដំណើរការនៅលើ Port ${PORT}`);
    console.log(`🔗 API URL: http://localhost:${PORT}/api\n`);
});