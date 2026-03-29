<template>
  <div class="min-h-screen bg-[#f8fafc] pb-28 font-sans animate-in fade-in duration-300 relative">
    
    <div class="bg-gradient-to-br from-blue-600 to-indigo-600 pt-10 pb-20 px-5 rounded-b-[2.5rem] shadow-sm relative overflow-hidden">
      <div class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
      
      <div class="relative z-10 max-w-md mx-auto flex items-center justify-center">
        <button @click="$router.push('/')" class="absolute left-0 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        
        <div class="text-center flex flex-col items-center">
          <div class="w-12 h-12 bg-white/20 backdrop-blur-md rounded-[1.2rem] flex items-center justify-center mb-3 border border-white/30 shadow-inner">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4"></path></svg>
          </div>
          <h1 class="text-2xl font-black text-white tracking-tight drop-shadow-sm">កត់ត្រាការចំណាយថ្មី</h1>
          <p class="text-blue-100/90 mt-0.5 text-[10px] font-bold uppercase tracking-widest">Add Contribution</p>
        </div>
      </div>
    </div>

    <div class="max-w-md mx-auto px-4 -mt-10 relative z-20">
      <div class="bg-white rounded-[2rem] shadow-xl shadow-blue-900/5 border border-slate-100 p-6 sm:p-8">
        
        <form @submit.prevent="handleSubmit" class="space-y-5">
          
          <div class="space-y-2">
            <label class="flex items-center gap-2 text-[12px] font-black text-slate-700 uppercase tracking-wide">
              <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              ឈ្មោះអ្នកដែលយើងទៅចូលរួម <span class="text-red-500">*</span>
            </label>
            <input 
              v-model="form.guest_name" 
              type="text" 
              placeholder="ឧ. សុខា និង ធីតា"
              class="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none transition-all placeholder:text-slate-400 placeholder:font-medium" 
              required 
            />
          </div>

          <div class="space-y-2">
            <label class="flex items-center gap-2 text-[12px] font-black text-slate-700 uppercase tracking-wide">
              <svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15.546c.523 0 .974.276 1.167.683H20v.683a1.725 1.725 0 11-3.45 0v-.683h-.25c.193-.407.644-.683 1.167-.683a1.725 1.725 0 113.45 0zM12 21a9 9 0 110-18 9 9 0 010 18zm0-9a3 3 0 100-6 3 3 0 000 6z"></path></svg>
              ឈ្មោះកម្មវិធី <span class="text-red-500">*</span>
            </label>
            
            <div class="relative">
              <select 
                v-model="selectedEvent" 
                class="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 pr-10 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white outline-none transition-all appearance-none cursor-pointer"
                required
              >
                <option value="" disabled selected>ជ្រើសរើសកម្មវិធី...</option>
                <option value="រៀបការ">រៀបការ</option>
                <option value="កាត់ចំណងដៃ">កាត់ចំណងដៃ</option>
                <option value="ភ្ជាប់ពាក្យ">ភ្ជាប់ពាក្យ</option>
                <option value="ជប់លៀង">ជប់លៀង</option>
                <option value="ឡើងផ្ទះ">ឡើងផ្ទះ</option>
                <option value="ខួបកំណើត">ខួបកំណើត</option>
                <option value="other" class="font-black text-blue-600">ផ្សេងៗ... (វាយបញ្ចូលខ្លួនឯង)</option>
              </select>
              <svg class="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>

            <transition enter-active-class="transition duration-300 ease-out" enter-from-class="transform -translate-y-2 opacity-0" enter-to-class="transform translate-y-0 opacity-100">
              <input 
                v-if="selectedEvent === 'other'"
                v-model="customEvent" 
                type="text" 
                placeholder="វាយឈ្មោះកម្មវិធីនៅទីនេះ..."
                class="w-full bg-white border border-indigo-200 rounded-2xl p-4 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all mt-2 shadow-sm" 
                required 
              />
            </transition>
          </div>

          <div class="space-y-2">
            <label class="flex items-center gap-2 text-[12px] font-black text-slate-700 uppercase tracking-wide">
              <svg class="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              ទីតាំងកម្មវិធី (អាសយដ្ឋាន)
            </label>
            <input 
              v-model="form.address" 
              type="text" 
              placeholder="ឧ. អគារ A, កោះពេជ្រ"
              class="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white outline-none transition-all placeholder:text-slate-400 placeholder:font-medium" 
            />
          </div>

          <div class="space-y-2">
            <label class="flex items-center gap-2 text-[12px] font-black text-slate-700 uppercase tracking-wide">
              <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              ចំនួនទឹកប្រាក់ <span class="text-red-500">*</span>
            </label>
            <div class="flex rounded-2xl overflow-hidden border border-slate-100 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 focus-within:bg-white transition-all bg-slate-50 shadow-sm">
              <div class="relative w-28 shrink-0 border-r border-slate-200">
                <select v-model="form.currency" class="w-full bg-transparent text-slate-700 font-black text-sm outline-none p-4 appearance-none cursor-pointer text-center relative z-10">
                  <option value="KHR">៛ រៀល</option>
                  <option value="USD">$ ដុល្លារ</option>
                </select>
                <svg class="w-4 h-4 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 z-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
              </div>
              <input 
                v-model="form.amount" 
                type="number" 
                min="0" 
                step="0.01" 
                placeholder="0.00"
                class="w-full bg-transparent border-none text-slate-900 font-black text-xl focus:ring-0 outline-none p-4 text-right" 
                required 
              />
            </div>
          </div>

          <div class="space-y-2 pb-2">
            <label class="flex items-center gap-2 text-[12px] font-black text-slate-700 uppercase tracking-wide">
              <svg class="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              កាលបរិច្ឆេទ <span class="text-red-500">*</span>
            </label>
            <input 
              v-model="form.event_date" 
              type="date" 
              class="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 focus:bg-white outline-none transition-all custom-date-input" 
              required 
            />
          </div>

          <div class="pt-4 flex gap-3 border-t border-slate-100">
            <button type="button" @click="$router.push('/')" class="w-1/3 bg-slate-100 text-slate-600 py-4 rounded-2xl font-black text-[13px] hover:bg-slate-200 transition-colors active:scale-95">
              បោះបង់
            </button>
            <button 
              type="submit" 
              :disabled="isSaving" 
              class="w-2/3 bg-blue-600 text-white py-4 rounded-2xl font-black text-[14px] shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70 disabled:active:scale-100 hover:bg-blue-700"
            >
              <svg v-if="isSaving" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <span v-else>រក្សាទុកទិន្នន័យ</span>
            </button>
          </div>

        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
import axios from 'axios';

const router = useRouter();
const toast = useToast();
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const isSaving = ref(false);

// 🌟 Smart Dropdown State
const selectedEvent = ref(''); 
const customEvent = ref('');

const form = ref({
  guest_name: '',
  event_name: '', // នឹងត្រូវ Update តាម selectedEvent ឬ customEvent ពេល Submit
  address: '',
  amount: '',
  currency: 'KHR',
  event_date: '',
  notes: ''
});

// ចាប់យកថ្ងៃនេះជាថ្ងៃ Default
onMounted(() => {
  form.value.event_date = new Date().toISOString().split('T')[0];
});

// រក្សាទុកទិន្នន័យ
const handleSubmit = async () => {
  if (isSaving.value) return;

  // 🌟 Logic សម្រាប់ Smart Dropdown
  if (selectedEvent.value === 'other') {
    if (!customEvent.value.trim()) {
      toast.error("សូមវាយបញ្ចូលឈ្មោះកម្មវិធីរបស់អ្នក!");
      return;
    }
    form.value.event_name = customEvent.value;
  } else {
    form.value.event_name = selectedEvent.value;
  }

  isSaving.value = true;

  try {
    await axios.post(`${API_URL}/contributions`, form.value);
    
    toast.success("រក្សាទុកបានជោគជ័យ! 🎉", {
      timeout: 2000
    });
    
    setTimeout(() => {
      router.push('/');
    }, 1000);
    
  } catch (error) {
    const errorMsg = error.response?.data?.error || "មានបញ្ហាក្នុងការរក្សាទុក!";
    toast.error(errorMsg);
  } finally {
    isSaving.value = false;
  }
};
</script>

<style scoped>
/* លាក់ព្រួញឡើងចុះ (Spinners) របស់ Input Number */
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
input[type=number] {
  -moz-appearance: textfield;
}

/* Custom UI Date Picker */
.custom-date-input::-webkit-calendar-picker-indicator {
  cursor: pointer;
  opacity: 0.5;
  transition: 0.2s;
}
.custom-date-input::-webkit-calendar-picker-indicator:hover {
  opacity: 1;
}

/* Font ខ្មែរ */
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&display=swap');
* {
  font-family: 'Kantumruy Pro', sans-serif;
}
</style>