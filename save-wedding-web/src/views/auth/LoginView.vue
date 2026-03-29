<template>
  <div class="min-h-[100dvh] flex items-center justify-center bg-gradient-to-br from-[#f0f4ff] to-[#e0e7ff] p-4 relative overflow-hidden">
    
    <div class="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
    <div class="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

    <div class="w-full max-w-[400px] relative z-10 flex flex-col items-center">
      
      <div class="w-full bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white p-8 sm:p-10 text-center">
        
        <div class="mx-auto flex items-center justify-center w-20 h-20 rounded-[1.5rem] bg-blue-600 text-white shadow-[0_8px_20px_rgba(37,99,235,0.3)] mb-6">
          <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        
        <h1 class="text-[26px] font-black text-gray-900 mb-1">សូមស្វាគមន៍</h1>
        <p class="text-[13px] font-medium text-gray-500 mb-8">ចូលគណនីដើម្បីគ្រប់គ្រងប្រព័ន្ធ Save-Wedding</p>

        <form @submit.prevent="handleLogin" class="space-y-5 text-left">
          
          <div class="space-y-1.5">
            <label class="block text-xs font-bold text-gray-700 ml-1">ឈ្មោះគណនី ឬ អ៊ីមែល</label>
            <div class="relative">
               <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
               </div>
               <input v-model="form.username" type="text" placeholder="បញ្ចូលឈ្មោះគណនី" class="w-full bg-transparent border border-gray-200 text-gray-900 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block pl-11 p-3.5 transition-all outline-none text-sm font-medium" required />
            </div>
          </div>

          <div class="space-y-1.5">
            <div class="flex justify-between items-center ml-1">
               <label class="block text-xs font-bold text-gray-700">លេខសម្ងាត់</label>
               <a href="#" class="text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors">ភ្លេចលេខសម្ងាត់?</a>
            </div>
            <div class="relative">
               <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
               </div>
               <input v-model="form.password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••" class="w-full bg-transparent border border-gray-200 text-gray-900 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block pl-11 pr-11 p-3.5 transition-all outline-none text-sm font-medium tracking-widest" required />
               
               <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600">
                  <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
               </button>
            </div>
          </div>

          <button type="submit" :disabled="isLoading" class="w-full text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-70 font-bold rounded-2xl text-sm px-5 py-3.5 mt-8 text-center flex justify-center items-center gap-2 transition-all shadow-[0_8px_20px_rgba(37,99,235,0.25)] transform active:scale-[0.98]">
             <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
             <span v-else>ចូលប្រើប្រាស់</span>
          </button>
        </form>
      </div>

      <p class="text-center text-xs font-bold text-gray-500 mt-8">
        មិនទាន់មានគណនី? <a href="#" class="text-blue-600 hover:underline">ទាក់ទងអ្នកគ្រប់គ្រង</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
import axios from 'axios';

const router = useRouter();
const toast = useToast();
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const form = ref({ username: '', password: '' });
const showPassword = ref(false);
const isLoading = ref(false);

const handleLogin = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  
  try {
    const response = await axios.post(`${API_URL}/auth/login`, form.value);
    
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userRole', response.data.user.role);
    localStorage.setItem('username', response.data.user.username);
    
    toast.success(`សួស្តី ${response.data.user.username}!`, { icon: "👋" });

    // 🌟 កន្លែងកែប្រែថ្មី៖ បែងចែកទំព័រពេល Login ជោគជ័យ
    if (response.data.user.role === 'owner') {
      router.push('/users'); // បើជា Owner ឱ្យលោតទៅទំព័រគ្រប់គ្រង
    } else {
      router.push('/'); // បើជា User ឱ្យលោតទៅទំព័រដើម
    }
    
  } catch (error) {
    toast.error(error.response?.data?.error || "មានបញ្ហាក្នុងការភ្ជាប់!");
  } finally {
    isLoading.value = false;
  }
};
</script>