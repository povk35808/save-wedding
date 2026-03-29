<template>
  <div class="min-h-screen bg-[#f8fafc] font-sans animate-in fade-in duration-300 relative overflow-x-hidden pb-28">
    
    <div class="sticky top-0 z-50 bg-[#f8fafc]/90 backdrop-blur-sm border-b border-slate-100/50">
      <div class="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <router-link to="/" class="w-9 h-9 rounded-full bg-white border border-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-50 transition-colors active:scale-95 shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
          </router-link>
          <div>
            <h1 class="text-lg md:text-xl font-black text-slate-900 tracking-tight">គណនីរបស់ខ្ញុំ</h1>
            <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">My Account</p>
          </div>
        </div>
        
        <button @click="fetchRealData" :disabled="isLoading" class="w-9 h-9 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-100 transition-colors active:scale-95 shrink-0">
          <svg :class="{'animate-spin': isLoading}" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
        </button>
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

      <div class="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100/60 mb-4 relative overflow-hidden">
        <div v-if="isLoading" class="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-10 transition-opacity">
          <svg class="animate-spin h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
        </div>

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

      <div class="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100/60 mb-6 relative">
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
            <p class="text-[11px] font-bold text-orange-500">{{ formattedExpiryDate }}</p>
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

      <div class="space-y-3">
        <a href="https://t.me/MMKDaro" target="_blank" class="w-full py-4 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 text-white font-black text-[13px] flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20 active:scale-95 transition-transform border border-slate-700 hover:from-slate-700 hover:to-slate-800">
          <svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
          ធ្វើបច្ចុប្បន្នភាព / បន្តការប្រើប្រាស់ (Upgrade)
        </a>

        <button @click="showPasswordModal = true" class="w-full py-4 rounded-2xl bg-white text-slate-600 font-black text-[13px] flex items-center justify-center gap-2 shadow-sm border border-slate-200 hover:bg-slate-50 active:scale-95 transition-transform">
          <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          ប្តូរពាក្យសម្ងាត់ (Change Password)
        </button>
      </div>

    </div>

    <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
      <div v-if="showPasswordModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center px-4">
        <div class="bg-white rounded-[2rem] p-6 w-full max-w-sm shadow-2xl">
          
          <div class="flex justify-between items-center mb-5">
            <h3 class="text-lg font-black text-slate-800 flex items-center gap-2">
              <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
              ប្តូរពាក្យសម្ងាត់
            </h3>
            <button @click="showPasswordModal = false" class="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          
          <form @submit.prevent="submitChangePassword" class="space-y-4">
            <div>
              <label class="block text-[11px] font-bold text-slate-500 mb-1">ពាក្យសម្ងាត់ចាស់ *</label>
              <input v-model="passwords.old" type="password" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 outline-none focus:border-indigo-400 transition-colors" placeholder="••••••••" />
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-500 mb-1">ពាក្យសម្ងាត់ថ្មី *</label>
              <input v-model="passwords.new" type="password" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 outline-none focus:border-indigo-400 transition-colors" placeholder="••••••••" />
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-500 mb-1">បញ្ជាក់ពាក្យសម្ងាត់ថ្មី *</label>
              <input v-model="passwords.confirm" type="password" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 outline-none focus:border-indigo-400 transition-colors" placeholder="••••••••" />
            </div>

            <button type="submit" :disabled="isChanging" class="w-full mt-2 py-3.5 bg-blue-600 text-white rounded-xl text-[13px] font-black hover:bg-blue-700 transition-colors shadow-md shadow-blue-200 flex justify-center items-center">
              <span v-if="!isChanging">រក្សាទុកពាក្យសម្ងាត់</span>
              <svg v-else class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            </button>
          </form>

        </div>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useToast } from "vue-toastification";

const toast = useToast();
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const isLoading = ref(true);

// 🌟 ទាញយកទិន្នន័យពី LocalStorage ជាចម្បង (ត្រូវគ្នាជាមួយ Backend 100%)
const savedProfileStr = localStorage.getItem('user_profile') || '{}';
const savedProfile = JSON.parse(savedProfileStr);

const userName = ref(savedProfile.username || savedProfile.name || localStorage.getItem('username') || 'អ្នកប្រើប្រាស់');

// 🌟 ប្រើឈ្មោះ record_limit ដែលត្រូវនឹង Database
const maxTransactions = ref(parseInt(savedProfile.record_limit || localStorage.getItem('lines') || 100));
const expiryDate = ref(savedProfile.expiry_date || localStorage.getItem('expire_date') || '2030-01-01');

const createdDate = ref(savedProfile.created_at || localStorage.getItem('created_at') || new Date().toISOString());

const usedTransactions = ref(0);

const showPasswordModal = ref(false);
const isChanging = ref(false);
const passwords = ref({ old: '', new: '', confirm: '' });

// 🌟 ការគណនា (Calculations)
const remainingTransactions = computed(() => Math.max(0, maxTransactions.value - usedTransactions.value));
const txPercent = computed(() => maxTransactions.value > 0 ? Math.min(100, (usedTransactions.value / maxTransactions.value) * 100) : 0);

const formattedExpiryDate = computed(() => {
  if (!expiryDate.value) return 'មិនទាន់កំណត់';
  return new Date(expiryDate.value).toLocaleDateString('en-GB'); 
});

const remainingDays = computed(() => {
  if (!expiryDate.value) return 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0); 
  const exp = new Date(expiryDate.value);
  const diff = exp.getTime() - today.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 3600 * 24)));
});

const totalDays = computed(() => {
  if (!expiryDate.value || !createdDate.value) return 365;
  const start = new Date(createdDate.value);
  const exp = new Date(expiryDate.value);
  const diff = exp.getTime() - start.getTime();
  return Math.max(1, Math.ceil(diff / (1000 * 3600 * 24)));
});

const daysUsed = computed(() => Math.max(0, totalDays.value - remainingDays.value));
const daysPercent = computed(() => totalDays.value > 0 ? Math.min(100, (daysUsed.value / totalDays.value) * 100) : 0);

// 🌟 មុខងារហៅ API វៃឆ្លាត (ទាញយក Profile ផ្ទាល់ខ្លួន) ដោយគ្មាន Error កងវិលៗ
const fetchRealData = async () => {
  isLoading.value = true;
  try {
    const token = localStorage.getItem('token') || '';
    const config = { headers: { Authorization: `Bearer ${token}` } };

    // ១. រាប់ចំនួនកំណត់ត្រាជាក់ស្តែង
    try {
      const contribRes = await axios.get(`${API_URL}/contributions`, config);
      if (contribRes.data) usedTransactions.value = contribRes.data.length;
    } catch (e) {
      console.warn("Could not fetch contributions.");
    }

    // ២. ហៅ API /auth/me ដើម្បីយកការ Update ថ្មីៗពី Database (បើ Backend មាន API នេះ)
    try {
      const res = await axios.get(`${API_URL}/auth/me`, config);
      if (res.data) {
        // ចាប់យកទិន្នន័យចំឈ្មោះ Field របស់ Database (record_limit)
        maxTransactions.value = res.data.record_limit ?? maxTransactions.value;
        expiryDate.value = res.data.expiry_date ?? expiryDate.value;
        userName.value = res.data.username ?? userName.value;
        
        // ធ្វើបច្ចុប្បន្នភាព LocalStorage
        localStorage.setItem('lines', maxTransactions.value);
        localStorage.setItem('expire_date', expiryDate.value);
        localStorage.setItem('user_profile', JSON.stringify(res.data));
      }
    } catch (e) {
      // ប្រសិនបើ Backend មិនទាន់មាន /api/auth/me ទេ ក៏វានឹងមិនលោត Error ក្រហមពេញអេក្រង់ឡើយ ព្រោះយើងបាន Catch ទុក
      console.log("Using LocalStorage fallback as /api/auth/me is not available yet.");
    }

  } catch (error) {
    toast.error("មានបញ្ហាក្នុងការអាប់ដេតទិន្នន័យពីប្រព័ន្ធ!");
  } finally {
    setTimeout(() => { isLoading.value = false; }, 500);
  }
};

const submitChangePassword = async () => {
  if (passwords.value.new !== passwords.value.confirm) {
    toast.error("ពាក្យសម្ងាត់ថ្មី មិនដូចគ្នាទេ!"); return;
  }
  if (passwords.value.new.length < 6) {
    toast.warning("ពាក្យសម្ងាត់ត្រូវមានយ៉ាងហោចណាស់ ៦ ខ្ទង់"); return;
  }

  isChanging.value = true;
  try {
    const token = localStorage.getItem('token') || '';
    await axios.put(`${API_URL}/users/change-password`, {
      oldPassword: passwords.value.old,
      newPassword: passwords.value.new
    }, { headers: { Authorization: `Bearer ${token}` } });
    
    toast.success("ប្តូរពាក្យសម្ងាត់បានជោគជ័យ! 🔒");
    showPasswordModal.value = false;
    passwords.value = { old: '', new: '', confirm: '' };

  } catch (error) {
    const errorMsg = error.response?.data?.error || error.response?.data?.message || "ពាក្យសម្ងាត់ចាស់មិនត្រឹមត្រូវទេ!";
    toast.error(errorMsg);
  } finally {
    isChanging.value = false;
  }
};

onMounted(() => {
  fetchRealData();
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&display=swap');
* {
  font-family: 'Kantumruy Pro', sans-serif;
}
</style>