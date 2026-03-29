require('dotenv').config();
const { Client } = require('pg');

// ទាញយក URL ពី File .env របស់អ្នក
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  console.log("កំពុងព្យាយាមភ្ជាប់ទៅកាន់ CockroachDB...");
  
  try {
    await client.connect();
    console.log("🎉 ជោគជ័យ! អ្នកបានភ្ជាប់ទៅកាន់ Database រួចរាល់។");

    // សាកល្បងទាញយកឈ្មោះ Table មកបង្ហាញ ដើម្បីឲ្យកាន់តែច្បាស់
    const res = await client.query('SHOW TABLES;');
    console.log("👉 បញ្ជី Table នៅក្នុង Database របស់អ្នកមាន៖");
    console.table(res.rows);

  } catch (err) {
    console.error("❌ បរាជ័យ! មិនអាចភ្ជាប់បានទេ ដោយសារបញ្ហាខាងក្រោម៖");
    console.error(err.message);
  } finally {
    // បិទការភ្ជាប់វិញពេលតេស្តចប់
    await client.end();
  }
}

testConnection();