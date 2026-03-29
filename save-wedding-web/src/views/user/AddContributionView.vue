<template>
  <div class="min-h-screen bg-[#f8fafc] font-sans animate-in fade-in duration-300 relative overflow-x-hidden">
    
    <div class="sticky top-0 z-50 bg-[#f8fafc]/90 backdrop-blur-sm border-b border-slate-100/50">
      <div class="max-w-[1400px] mx-auto px-4 py-2.5 md:py-3 flex items-center justify-between gap-3">
        <div class="flex items-center gap-2 md:gap-3">
          <router-link to="/" class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white border border-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-50 transition-colors active:scale-95 shrink-0">
            <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
          </router-link>
          <div>
            <h1 class="text-base md:text-xl font-black text-slate-900 tracking-tight">កត់ត្រាថ្មី</h1>
            <p class="hidden md:block text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Add New Event</p>
          </div>
        </div>
        
        <button @click="submitForm" class="px-4 py-2 md:px-5 md:py-2.5 rounded-xl bg-blue-600 text-white text-[12px] font-black tracking-wide flex items-center gap-2 shadow-md shadow-blue-200 active:scale-95 transition-all">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
          រក្សាទុក
        </button>
      </div>
    </div>

    <div class="max-w-md md:max-w-[1400px] mx-auto px-4 py-4 md:py-10 pb-20">
      
      <div class="grid grid-cols-1 md:grid-cols-2 md:gap-x-10 gap-y-3 md:gap-y-6">
        
        <div class="bg-white rounded-2xl md:rounded-[1.5rem] p-4 md:p-7 shadow-sm border border-slate-100/50">
          <div class="mb-3 md:mb-5 flex items-center gap-3">
            <div class="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100/50 shrink-0">
              <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15.546c.523 0 .974.276 1.167.683H20v.683a1.725 1.725 0 11-3.45 0v-.683h-.25c.193-.407.644-.683 1.167-.683a1.725 1.725 0 113.45 0zM12 21a9 9 0 110-18 9 9 0 010 18zm0-9a3 3 0 100-6 3 3 0 000 6z"></path></svg>
            </div>
            <label class="block text-[12px] md:text-sm font-black text-slate-700 uppercase tracking-wide">ឈ្មោះកម្មវិធី *</label>
          </div>
          
          <div class="relative">
            <select 
              v-model="eventName" 
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 md:py-3.5 text-sm font-bold text-slate-800 outline-none focus:border-indigo-400 focus:bg-white transition-all appearance-none cursor-pointer"
            >
              <option value="" disabled selected>ជ្រើសរើសកម្មវិធី...</option>
              <option v-for="type in mainEventTypes" :key="type" :value="type">{{ type }}</option>
              <option value="custom">-- វាយបញ្ចូលដោយដៃ --</option>
            </select>
            <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>

          <transition enter-active-class="transition duration-200" enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0">
            <input v-if="eventName === 'custom' || isCustomMode" v-model="customEventName" type="text" class="w-full mt-2 bg-white border border-indigo-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 outline-none" placeholder="វាយឈ្មោះកម្មវិធីនៅទីនេះ..." @input="isCustomMode = true" />
          </transition>
        </div>

        <div class="bg-white rounded-2xl md:rounded-[1.5rem] p-4 md:p-7 shadow-sm border border-slate-100/50">
          <div class="mb-3 md:mb-5">
            <div class="flex items-center gap-3 mb-2 md:mb-3">
              <div class="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center border border-slate-100/50 shrink-0">
                <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </div>
              <label class="block text-[12px] md:text-sm font-black text-slate-700 uppercase tracking-wide">ឈ្មោះម្ចាស់កម្មវិធី *</label>
            </div>
            <input v-model="hostName" type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 md:py-3.5 text-sm font-bold text-slate-800 outline-none focus:border-indigo-400 focus:bg-white transition-colors custom-placeholder" placeholder="បូរ៉ា និង ស្រីពៅ (ការបង ស្រីពេជ្រ)" />
          </div>
        </div>

        <div class="bg-white rounded-2xl md:rounded-[1.5rem] p-4 md:p-7 shadow-sm border border-slate-100/50">
          <div class="flex items-center gap-3 mb-2 md:mb-3">
            <div class="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center border border-orange-100/50 shrink-0">
              <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            </div>
            <label class="block text-[12px] md:text-sm font-black text-slate-700 uppercase tracking-wide">កាលបរិច្ឆេទ *</label>
          </div>
          <input v-model="eventDate" type="date" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 md:py-3.5 text-sm font-bold text-slate-800 outline-none focus:border-indigo-400 focus:bg-white transition-colors custom-date-input" />
        </div>

        <div class="bg-white rounded-2xl md:rounded-[1.5rem] p-4 md:p-7 shadow-sm border border-slate-100/50">
          <div class="flex items-center gap-3 mb-3 md:mb-5">
            <div class="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100/50 shrink-0">
              <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <label class="block text-[12px] md:text-sm font-black text-slate-700 uppercase tracking-wide">ទឹកប្រាក់ចងដៃ *</label>
          </div>

          <div class="grid grid-cols-[100px,1fr] md:grid-cols-[120px,1fr] gap-2">
            <select v-model="currency" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 md:py-3.5 text-sm font-black text-slate-800 outline-none appearance-none cursor-pointer text-center">
              <option value="KHR">៛ KHR</option>
              <option value="USD">$ USD</option>
            </select>
            <input v-model="amount" type="number" step="any" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 md:py-3.5 text-base md:text-sm font-bold text-slate-800 outline-none focus:border-indigo-400 focus:bg-white transition-colors" placeholder="0.00" />
          </div>
        </div>

        <div class="md:col-span-2 bg-white rounded-2xl md:rounded-[1.5rem] p-4 md:p-7 shadow-sm border border-slate-100/50">
          <div class="flex items-center gap-3 mb-2 md:mb-3">
            <div class="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center border border-rose-100/50 shrink-0">
              <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </div>
            <label class="block text-[12px] md:text-sm font-black text-slate-700 uppercase tracking-wide">ទីតាំង (ប្រសិនបើមាន)</label>
          </div>
          <input v-model="address" type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 md:py-3.5 text-sm font-bold text-slate-800 outline-none focus:border-indigo-400 focus:bg-white transition-colors" placeholder="ឧ. កោះពេជ្រ អគារ L" />
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useToast } from "vue-toastification";

const router = useRouter();
const toast = useToast();
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const hostName = ref('');
const eventName = ref('');
const customEventName = ref('');
const isCustomMode = ref(false);
const amount = ref('');
const currency = ref('KHR'); // 🌟 Default ជាប្រាក់រៀលតាមសំណូមពរ
const eventDate = ref(new Date().toISOString().split('T')[0]);
const address = ref('');

const mainEventTypes = ['រៀបការ', 'ភ្ជាប់ពាក្យ', 'កាត់ចំណងដៃ', 'ជប់លៀង', 'ឡើងផ្ទះ', 'ខួបកំណើត', 'បុណ្យសព'];

const submitForm = async () => {
  let finalEventName = eventName.value;
  if (eventName.value === 'custom') {
    finalEventName = customEventName.value;
  }

  if (!hostName.value || !finalEventName || !amount.value || !eventDate.value) {
    toast.warning("សូមបំពេញព័ត៌មានដែលចាំបាច់ (*)");
    return;
  }

  const payload = {
    guest_name: hostName.value,
    event_name: finalEventName,
    amount: parseFloat(amount.value),
    currency: currency.value,
    event_date: eventDate.value,
    address: address.value
  };

  try {
    await axios.post(`${API_URL}/contributions`, payload);
    toast.success("បានកត់ត្រាជោគជ័យ! 📋");
    router.push('/');
  } catch (error) {
    toast.error("មានបញ្ហាក្នុងការរក្សាទុក!");
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&display=swap');
* { font-family: 'Kantumruy Pro', sans-serif; }

.custom-date-input::-webkit-calendar-picker-indicator {
  cursor: pointer; opacity: 0.6; transition: 0.2s;
}

.custom-placeholder::placeholder {
  color: #94a3b8; font-weight: normal; font-size: 13px;
}

/* លាក់ Spinner លើ Input Number */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none; margin: 0;
}
</style>