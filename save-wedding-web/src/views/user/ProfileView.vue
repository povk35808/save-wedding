<template>
  <div class="min-h-screen bg-[#f8fafc] font-sans animate-in fade-in duration-300 relative overflow-x-hidden pb-28">
    
    <div class="sticky top-0 z-50 bg-[#f8fafc]/90 backdrop-blur-sm border-b border-slate-100/50">
      <div class="max-w-[1400px] mx-auto px-4 py-3 flex items-center gap-3">
        <router-link to="/" class="w-9 h-9 rounded-full bg-white border border-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-50 transition-colors active:scale-95 shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
        </router-link>
        <div>
          <h1 class="text-lg md:text-xl font-black text-slate-900 tracking-tight">គណនីរបស់ខ្ញុំ</h1>
          <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">My Account</p>
        </div>
      </div>
    </div>

    <div class="max-w-md md:max-w-3xl mx-auto px-4 py-6">
      
      <div class="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-[1.5rem] p-6 shadow-lg shadow-blue-500/20 mb-6 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
        <div class="flex items-center gap-4 relative z-10">
          <div class="w-16 h-16 rounded-full bg-white text-blue-600 flex items-center justify-center font-black text-2xl uppercase border-4 border-blue-400/30 shadow-inner shrink-0">
            {{ userName ? userName.charAt(0) : 'អ' }}
          </div>
          <div>
            <h2 class="text-xl font-black text-white leading-tight mb-1">{{ userName }}</h2>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-sm text-[10px] font-bold text-white uppercase tracking-wider border border-white/10">
              <span class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> គណនីសកម្ម
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100/60 mb-4">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100/50">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            </div>
            <div>
              <h3 class="text-sm font-black text-slate-800">ចំនួនកំណត់ត្រា</h3>
              <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Transactions</p>
            </div>
          </div>
          <div class="text-right">
            <span class="text-xs font-black text-indigo-600">{{ usedTransactions }}</span>
            <span class="text-xs font-bold text-slate-400"> / {{ maxTransactions }}</span>
          </div>
        </div>

        <div class="w-full bg-slate-100 rounded-full h-2.5 mb-3 overflow-hidden">
          <div class="bg-indigo-500 h-full rounded-full transition-all duration-1000" :style="{ width: txPercent + '%' }"></div>
        </div>
        
        <div class="flex justify-between text-[11px] font-bold">
          <span class="text-slate-500">បានប្រើ៖ <span class="text-slate-800">{{ usedTransactions }}</span></span>
          <span class="text-slate-500">នៅសល់៖ <span class="text-emerald-600">{{ remainingTransactions }}</span> ដង</span>
        </div>
      </div>

      <div class="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100/60 mb-6">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center border border-orange-100/50">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div>
              <h3 class="text-sm font-black text-slate-800">សុពលភាពគណនី</h3>
              <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Expiration</p>
            </div>
          </div>
          <div class="text-right">
            <p class="text-xs font-black text-slate-700">ផុតកំណត់</p>
            <p class="text-[11px] font-bold text-orange-500">{{ expiryDateDisplay }}</p>
          </div>
        </div>

        <div class="w-full bg-slate-100 rounded-full h-2.5 mb-3 overflow-hidden">
          <div class="bg-orange-400 h-full rounded-full transition-all duration-1000" :style="{ width: daysPercent + '%' }"></div>
        </div>
        
        <div class="flex justify-between text-[11px] font-bold">
          <span class="text-slate-500">បានប្រើ៖ <span class="text-slate-800">{{ daysUsed }}</span> ថ្ងៃ</span>
          <span class="text-slate-500">នៅសល់៖ <span class="text-emerald-600">{{ remainingDays }}</span> ថ្ងៃទៀត</span>
        </div>
      </div>

      <a href="https://t.me/MMKDaro" target="_blank" class="w-full py-4 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 text-white font-black text-[13px] flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20 active:scale-95 transition-transform border border-slate-700 hover:from-slate-700 hover:to-slate-800">
        <svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
        ធ្វើបច្ចុប្បន្នភាព / បន្តការប្រើប្រាស់ (Upgrade)
      </a>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// 🌟 ទាញយកឈ្មោះពី LocalStorage (ត្រូវប្រាកដថាពេល Login ធ្លាប់ Save ឈ្មោះ)
const userName = ref(localStorage.getItem('username') || localStorage.getItem('userName') || localStorage.getItem('name') || 'អ្នកប្រើប្រាស់');

// 🌟 1. កំណត់ត្រាប្រវត្តិការ (Transactions) ទាញពី API ពិត
const maxTransactions = ref(100);  // កំណត់ Limite តាមម្ចាស់ App
const usedTransactions = ref(0);   // ចំនួនជាក់ស្តែងពី Database

const remainingTransactions = computed(() => Math.max(0, maxTransactions.value - usedTransactions.value));
const txPercent = computed(() => Math.min(100, (usedTransactions.value / maxTransactions.value) * 100));

// 🌟 2. សុពលភាពថ្ងៃ (Expiration Calculation) ពិតប្រាកដ
const totalDays = ref(365); // ឧទាហរណ៍៖ អាយុកាលគណនី ១ ឆ្នាំ

// រកមើលថាគណនីបង្កើតពីថ្ងៃណា (បើអត់មានកំណត់យកថ្ងៃនេះ)
const createdAtLocal = localStorage.getItem('created_at') || new Date().toISOString();
const startDate = new Date(createdAtLocal);

// ថ្ងៃផុតកំណត់ = ថ្ងៃបង្កើត + 365 ថ្ងៃ
const expDate = new Date(startDate);
expDate.setDate(startDate.getDate() + totalDays.value);
const expiryDateDisplay = ref(expDate.toLocaleDateString('en-GB'));

// គណនាថ្ងៃប្រើជាក់ស្តែង និងថ្ងៃនៅសល់
const remainingDays = computed(() => {
  const today = new Date();
  const timeDiff = expDate.getTime() - today.getTime();
  return Math.max(0, Math.ceil(timeDiff / (1000 * 3600 * 24)));
});

const daysUsed = computed(() => {
  const today = new Date();
  const timeDiff = today.getTime() - startDate.getTime();
  const used = Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24))); // បើទើបបង្កើត គិតថាប្រើបាន 1 ថ្ងៃ
  return Math.min(used, totalDays.value);
});

const daysPercent = computed(() => Math.min(100, (daysUsed.value / totalDays.value) * 100));

// 🌟 អនុវត្តទាញទិន្នន័យពី API ពេលបើកទំព័រ
const fetchUserData = async () => {
  try {
    // ទាញយកចំនួនបញ្ជីជាក់ស្តែងរបស់ User
    const response = await axios.get(`${API_URL}/contributions`);
    usedTransactions.value = response.data.length; // យកចំនួនកាតដែលមានស្រាប់
  } catch (error) {
    console.error("Error fetching transactions count", error);
  }
};

onMounted(() => {
  fetchUserData();
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&display=swap');
* {
  font-family: 'Kantumruy Pro', sans-serif;
}
</style>