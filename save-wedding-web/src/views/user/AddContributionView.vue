<template>
  <div class="max-w-xl mx-auto min-h-screen bg-[#f8fafc] pb-24 animate-in fade-in duration-500">
    
    <div class="bg-blue-600 rounded-b-[2.5rem] pt-10 pb-20 px-6 relative overflow-hidden shadow-md">
      <div class="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl -mr-10 -mt-10"></div>
      <div class="absolute bottom-0 left-0 w-32 h-32 bg-blue-400 opacity-20 rounded-full blur-xl -ml-10 -mb-10"></div>
      
      <div class="relative z-10 flex flex-col items-center text-center">
        <div class="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/20 shadow-sm">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path></svg>
        </div>
        
        <h1 class="text-2xl font-black text-white tracking-wide">កត់ត្រាការចំណាយថ្មី</h1>
        <p class="text-blue-100 text-xs font-medium mt-2">រៀបចំទិន្នន័យចងដៃរបស់អ្នកឱ្យមានសណ្តាប់ធ្នាប់</p>
      </div>
    </div>

    <div class="px-5 -mt-12 relative z-20">
      <div class="bg-white rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-slate-100 p-6 sm:p-8">
        
        <form @submit.prevent="handleSubmit" class="space-y-6">
          
          <div class="space-y-2">
            <label class="block text-[13px] font-black text-slate-700">ឈ្មោះអ្នកដែលយើងទៅចូលរួម <span class="text-red-500">*</span></label>
            <input 
              v-model="form.guest_name" 
              type="text" 
              placeholder="ឧ. សុខា និង ធីតា" 
              class="w-full bg-white border border-slate-200 rounded-2xl p-4 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm" 
              required 
            />
          </div>

          <div class="space-y-2">
            <label class="block text-[13px] font-black text-slate-700">ឈ្មោះកម្មវិធី <span class="text-red-500">*</span></label>
            <input 
              v-model="form.event_name" 
              type="text" 
              placeholder="ឧ. មង្គលការ" 
              class="w-full bg-white border border-slate-200 rounded-2xl p-4 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm" 
              required 
            />
          </div>

          <div class="space-y-2">
            <label class="block text-[13px] font-black text-slate-700">ទីតាំងកម្មវិធី (អាសយដ្ឋាន)</label>
            <input 
              v-model="form.address" 
              type="text" 
              placeholder="ឧ. អគារ A, កោះពេជ្រ" 
              class="w-full bg-white border border-slate-200 rounded-2xl p-4 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm" 
            />
          </div>

          <div class="space-y-2">
            <label class="block text-[13px] font-black text-slate-700">ចំនួនទឹកប្រាក់ <span class="text-red-500">*</span></label>
            <div class="flex shadow-sm rounded-2xl overflow-hidden border border-slate-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all bg-white">
              <select v-model="form.currency" class="bg-slate-50 border-r border-slate-200 text-slate-700 font-black text-sm outline-none block p-4 cursor-pointer w-28">
                <option value="KHR">៛ រៀល</option>
                <option value="USD">$ ដុល្លារ</option>
              </select>
              <input 
                v-model="form.amount" 
                type="number" 
                min="0" 
                step="0.01" 
                placeholder="0.00" 
                class="w-full bg-transparent border-none text-slate-900 font-black text-lg focus:ring-0 outline-none block p-4" 
                required 
              />
            </div>
          </div>

          <div class="space-y-2">
            <label class="block text-[13px] font-black text-slate-700">កាលបរិច្ឆេទ <span class="text-red-500">*</span></label>
            <div class="relative">
              <input 
                v-model="form.event_date" 
                type="date" 
                class="w-full bg-white border border-slate-200 rounded-2xl p-4 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm custom-date-input" 
                required 
              />
            </div>
          </div>

          <div class="pt-4">
            <button 
              type="submit" 
              :disabled="isLoading" 
              class="w-full bg-blue-600 text-white py-4.5 rounded-2xl font-black text-[15px] shadow-[0_8px_20px_rgba(37,99,235,0.25)] flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70"
            >
              <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <span v-else>រក្សាទុកទិន្នន័យ</span>
            </button>
          </div>

        </form>
      </div>
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
const isLoading = ref(false);

// State សម្រាប់ Form (ភ្ជាប់ជាមួយឈ្មោះ Column ក្នុង Database)
const form = ref({
  guest_name: '',
  event_name: '',
  address: '',
  amount: '',
  currency: 'KHR', // លំនាំដើមជារៀល
  event_date: new Date().toISOString().split('T')[0], // យកថ្ងៃបច្ចុប្បន្ន
  notes: '' // មិនបានដាក់ក្នុង UI តែបញ្ជូនទៅ Backend ការពារ Error
});

const handleSubmit = async () => {
  if (isLoading.value) return;
  isLoading.value = true;

  try {
    // បញ្ជូនទិន្នន័យទៅ Backend (វានឹងភ្ជាប់ជាមួយ Token ស្វ័យប្រវត្តិដោយសារ Axios Interceptor ក្នុង main.ts)
    await axios.post(`${API_URL}/contributions`, form.value);
    
    toast.success("កត់ត្រាចំណាយបានជោគជ័យ! 🎉", {
      timeout: 3000,
      icon: "✅"
    });
    
    // បញ្ជូនអ្នកប្រើទៅកាន់ទំព័រដើម (បញ្ជីទិន្នន័យ)
    setTimeout(() => {
      router.push('/');
    }, 1000);
    
  } catch (error) {
    const errorMsg = error.response?.data?.error || "មានបញ្ហាក្នុងការរក្សាទុក! សូមព្យាយាមម្តងទៀត។";
    toast.error(errorMsg, {
      timeout: 4000,
      icon: "⚠️"
    });
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* លាក់សញ្ញាព្រួញឡើងចុះ (Spinners) នៅក្នុងប្រអប់វាយលេខ */
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
input[type=number] {
  -moz-appearance: textfield; /* សម្រាប់ Firefox */
}

/* កែប្រែប្រអប់ Date Picker ឱ្យស្រឡះស្អាត */
.custom-date-input::-webkit-calendar-picker-indicator {
  cursor: pointer;
  opacity: 0.6;
  transition: 0.2s;
}
.custom-date-input::-webkit-calendar-picker-indicator:hover {
  opacity: 1;
}
</style>