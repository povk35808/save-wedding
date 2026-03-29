<template>
  <div class="min-h-screen bg-[#f8fafc] pb-28 font-sans animate-in fade-in duration-300">
    
    <div class="bg-gradient-to-br from-blue-600 to-indigo-600 pt-8 pb-16 px-5 rounded-b-[2rem] shadow-sm relative overflow-hidden">
      <div class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
      
      <div class="relative z-10 max-w-md mx-auto">
        <h1 class="text-2xl md:text-3xl font-black text-white tracking-tight drop-shadow-sm">បញ្ជីទិន្នន័យចងដៃ</h1>
        <p class="text-blue-100/90 mt-0.5 text-[10px] font-black uppercase tracking-widest">Contributions</p>
      </div>
    </div>

    <div class="max-w-md mx-auto px-4 -mt-7 relative z-30 mb-5">
      <div class="bg-white p-1.5 rounded-[1.2rem] shadow-[0_8px_20px_-12px_rgba(0,0,0,0.15)] flex items-center gap-2 border border-slate-100 relative">
        
        <div class="relative flex-1 group">
          <svg class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <input 
            v-model="searchQuery" 
            class="w-full bg-slate-50/50 rounded-xl pl-10 pr-4 py-3 outline-none text-[13px] font-bold text-slate-700 placeholder-slate-400 transition-colors focus:bg-slate-100" 
            placeholder="ស្វែងរកឈ្មោះ ឬកម្មវិធី..." 
          />
        </div>
        
        <button @click="showFilter = !showFilter" :class="showFilter || filterDate ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-500'" class="w-11 h-11 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-colors shrink-0 relative">
          <span v-if="filterDate" class="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
        </button>

        <div v-if="showFilter" class="absolute top-[110%] right-0 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 animate-in zoom-in-95 duration-200 origin-top-right">
          <label class="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">ច្រោះតាមកាលបរិច្ឆេទ</label>
          <input 
            v-model="filterDate" 
            type="date" 
            class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-700 outline-none focus:border-blue-500 transition-colors custom-date-input mb-3" 
          />
          <div class="flex gap-2">
            <button @click="clearFilter" class="flex-1 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200">សម្អាត</button>
            <button @click="showFilter = false" class="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-md shadow-blue-200">យល់ព្រម</button>
          </div>
        </div>

      </div>
    </div>

    <div class="max-w-md mx-auto px-4">
      <div v-if="paginatedData.length > 0">
        
        <div v-for="item in paginatedData" :key="item.id" class="bg-white rounded-[1.2rem] p-4 shadow-sm border border-slate-100/60 mb-3 hover:shadow-md transition-shadow">
          
          <div class="flex items-center justify-between gap-3 mb-4">
            <div class="flex items-center gap-3 min-w-0">
              <div class="w-10 h-10 rounded-[0.8rem] bg-blue-50 text-blue-600 flex items-center justify-center font-black text-base shrink-0 uppercase border border-blue-100/50">
                {{ item.guest_name.charAt(0) }}
              </div>
              <div class="min-w-0">
                <h3 class="text-[14px] font-black text-slate-800 truncate">{{ item.guest_name }}</h3>
                <p class="text-[9px] text-slate-400 font-bold mt-0.5">{{ getTimeRemaining(item.created_at) }}</p>
              </div>
            </div>
            
            <div class="flex gap-1.5 shrink-0">
              <router-link :to="'/edit/'+item.id" class="w-8 h-8 rounded-full border border-slate-100 text-slate-400 hover:text-blue-500 hover:bg-blue-50 flex items-center justify-center transition-colors">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
              </router-link>
              <button @click="confirmDelete(item.id)" class="w-8 h-8 rounded-full border border-slate-100 text-slate-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
            </div>
          </div>

          <div class="flex justify-between items-center mb-4">
            <span class="text-[11px] font-bold text-slate-400">ទឹកប្រាក់</span>
            <div class="text-right flex items-baseline gap-1.5">
              <span class="text-[10px] font-black uppercase text-slate-400">{{ item.currency === 'USD' ? 'USD' : 'KHR' }}</span>
              <span class="text-xl font-black leading-none tracking-tight" :class="item.currency === 'USD' ? 'text-blue-600' : 'text-emerald-500'">
                {{ formatCurrency(item.amount, item.currency) }}
              </span>
            </div>
          </div>

          <div class="h-px bg-slate-100 w-full mb-3"></div>

          <div class="space-y-2.5 px-0.5">
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-2 flex-1 min-w-0">
                <div class="text-indigo-400"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15.546c.523 0 .974.276 1.167.683H20v.683a1.725 1.725 0 11-3.45 0v-.683h-.25c.193-.407.644-.683 1.167-.683a1.725 1.725 0 113.45 0zM12 21a9 9 0 110-18 9 9 0 010 18zm0-9a3 3 0 100-6 3 3 0 000 6z"></path></svg></div>
                <span class="text-[11px] font-bold text-slate-600 truncate">{{ item.event_name }}</span>
              </div>
              <div class="flex items-center gap-2 shrink-0">
                <div class="text-orange-400"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>
                <span class="text-[11px] font-bold text-slate-600">{{ new Date(item.event_date).toLocaleDateString('en-GB') }}</span>
              </div>
            </div>
            
            <div v-if="item.address" class="flex items-start gap-2 pt-1">
              <div class="text-slate-400 shrink-0"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></div>
              <span class="text-[10px] font-bold text-slate-500 truncate mt-0.5">{{ item.address }}</span>
            </div>
          </div>

        </div>

        <div ref="observerTarget" class="py-6 flex justify-center items-center">
          <svg v-if="displayLimit < filteredData.length" class="animate-spin h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          <span v-else-if="filteredData.length > 14" class="text-xs font-bold text-slate-400">អស់ទិន្នន័យហើយ</span>
        </div>

      </div>

      <div v-else class="py-16 text-center">
        <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100">
          <svg class="w-7 h-7 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
        </div>
        <p class="font-black text-slate-700 text-[14px]">មិនមានទិន្នន័យទេ</p>
      </div>

    </div>

    <router-link to="/add" class="md:hidden fixed bottom-6 right-5 z-[100] w-[52px] h-[52px] bg-blue-600 text-white rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(37,99,235,0.4)] active:scale-95 transition-transform border-[2.5px] border-white">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path></svg>
    </router-link>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';
import { useToast } from "vue-toastification";

const toast = useToast();
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const contributionData = ref([]);
const searchQuery = ref('');
const filterDate = ref('');
const showFilter = ref(false);

// 🌟 Infinite Scroll State
const displayLimit = ref(14);
const observerTarget = ref(null);

// Reset limit រាល់ពេល Search ឬ Filter
watch([searchQuery, filterDate], () => {
  displayLimit.value = 14;
});

const clearFilter = () => {
  filterDate.value = '';
  showFilter.value = false;
};

// ទាញយកទិន្នន័យ
const fetchContributions = async () => {
  try {
    const response = await axios.get(`${API_URL}/contributions`);
    contributionData.value = response.data;
  } catch (error) {
    toast.error("មិនអាចទាញយកទិន្នន័យបានទេ");
  }
};

onMounted(() => {
  fetchContributions();

  // 🌟 បង្កើត Intersection Observer សម្រាប់ទាញយក ១៤ ទៀតពេលអូសដល់ក្រោម
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && displayLimit.value < filteredData.value.length) {
      // បន្ថែម 14 កាតទៀតពេលអូសដល់ក្រោម
      setTimeout(() => {
        displayLimit.value += 14;
      }, 300); // ដាក់ Delay បន្តិចឱ្យមានអារម្មណ៍ Smooth ពេល Loading
    }
  }, { threshold: 1.0 });

  // ភ្ជាប់ Observer ទៅកាន់ Element នៅខាងក្រោមបញ្ជី
  if (observerTarget.value) {
    observer.observe(observerTarget.value);
  }
});

// ស្វែងរក និង ច្រោះ (Filter)
const filteredData = computed(() => {
  return contributionData.value.filter(item => {
    // ស្វែងរកឈ្មោះ
    const matchesSearch = searchQuery.value 
      ? item.guest_name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
        item.event_name.toLowerCase().includes(searchQuery.value.toLowerCase())
      : true;
    
    // ច្រោះថ្ងៃខែ
    const matchesDate = filterDate.value 
      ? new Date(item.event_date).toISOString().split('T')[0] === filterDate.value 
      : true;

    return matchesSearch && matchesDate;
  });
});

// 🌟 ទិន្នន័យដែលត្រូវបង្ហាញ (កាត់ត្រឹម Limit ១៤)
const paginatedData = computed(() => {
  return filteredData.value.slice(0, displayLimit.value);
});

// Format លុយ
const formatCurrency = (amount, currency) => {
  if (currency === 'USD') {
    return parseFloat(amount).toFixed(2);
  } else {
    return new Intl.NumberFormat('en-US').format(amount);
  }
};

// ពេលវេលា
const getTimeRemaining = (dateString) => {
  const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " ឆ្នាំមុន";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " ខែមុន";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " ថ្ងៃមុន";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " ម៉ោងមុន";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " នាទីមុន";
  return "ទើបបញ្ចូល";
};

// លុប
const confirmDelete = (id) => {
  if (window.confirm("តើអ្នកពិតជាចង់លុបទិន្នន័យនេះមែនទេ?")) {
    deleteContribution(id);
  }
};

const deleteContribution = async (id) => {
  try {
    await axios.delete(`${API_URL}/contributions/${id}`);
    toast.success("បានលុបជោគជ័យ! 🗑️");
    fetchContributions(); 
  } catch (error) {
    toast.error("មានបញ្ហាក្នុងការលុប!");
  }
};
</script>

<style>
/* Font ខ្មែរឱ្យច្បាស់ និងរលោង */
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&display=swap');
* {
  font-family: 'Kantumruy Pro', sans-serif;
}

/* Custom UI Date Picker ឱ្យស្អាត */
.custom-date-input::-webkit-calendar-picker-indicator {
  cursor: pointer;
  opacity: 0.6;
  transition: 0.2s;
}
.custom-date-input::-webkit-calendar-picker-indicator:hover {
  opacity: 1;
}
</style>