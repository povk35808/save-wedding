<template>
  <div class="max-w-xl mx-auto min-h-screen bg-[#f8fafc] pb-24 animate-in fade-in duration-500">
    
    <div class="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-b-[2.5rem] pt-10 pb-20 px-6 relative overflow-hidden shadow-md">
      <div class="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl -mr-10 -mt-10"></div>
      <div class="absolute bottom-0 left-0 w-32 h-32 bg-blue-400 opacity-20 rounded-full blur-xl -ml-10 -mb-10"></div>
      
      <button @click="$router.push('/')" class="absolute top-8 left-6 p-2 bg-white/10 backdrop-blur-md rounded-xl text-white hover:bg-white/20 transition-colors border border-white/20">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
      </button>

      <div class="relative z-10 flex flex-col items-center text-center mt-4">
        <div class="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/20 shadow-sm">
          <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
        </div>
        
        <h1 class="text-2xl font-black text-white tracking-wide">កែប្រែទិន្នន័យ</h1>
        <p class="text-blue-100 text-xs font-medium mt-2">កែសម្រួលព័ត៌មានចំណាយដែលបានកត់ត្រា</p>
      </div>
    </div>

    <div class="px-5 -mt-12 relative z-20">
      <div class="bg-white rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-slate-100 p-6 sm:p-8">
        
        <div v-if="isFetching" class="flex flex-col items-center justify-center py-10">
           <svg class="animate-spin h-8 w-8 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
           <p class="text-sm font-bold text-slate-500">កំពុងទាញទិន្នន័យ...</p>
        </div>

        <form v-else @submit.prevent="handleUpdate" class="space-y-6 animate-in fade-in duration-300">
          
          <div class="space-y-2">
            <label class="block text-[13px] font-black text-slate-700">ឈ្មោះអ្នកដែលយើងទៅចូលរួម <span class="text-red-500">*</span></label>
            <input 
              v-model="form.guest_name" 
              type="text" 
              class="w-full bg-slate-50/50 border border-slate-200/80 rounded-2xl p-4 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all shadow-inner" 
              required 
            />
          </div>

          <div class="space-y-2">
            <label class="block text-[13px] font-black text-slate-700">ឈ្មោះកម្មវិធី <span class="text-red-500">*</span></label>
            <input 
              v-model="form.event_name" 
              type="text" 
              class="w-full bg-slate-50/50 border border-slate-200/80 rounded-2xl p-4 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all shadow-inner" 
              required 
            />
          </div>

          <div class="space-y-2">
            <label class="block text-[13px] font-black text-slate-700">ទីតាំងកម្មវិធី (អាសយដ្ឋាន)</label>
            <input 
              v-model="form.address" 
              type="text" 
              class="w-full bg-slate-50/50 border border-slate-200/80 rounded-2xl p-4 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all shadow-inner" 
            />
          </div>

          <div class="space-y-2">
            <label class="block text-[13px] font-black text-slate-700">ចំនួនទឹកប្រាក់ <span class="text-red-500">*</span></label>
            <div class="flex shadow-inner rounded-2xl overflow-hidden border border-slate-200/80 focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white transition-all bg-slate-50/50">
              <select v-model="form.currency" class="bg-transparent border-r border-slate-200/80 text-slate-700 font-black text-sm outline-none block p-4 cursor-pointer w-28">
                <option value="KHR">៛ រៀល</option>
                <option value="USD">$ ដុល្លារ</option>
              </select>
              <input 
                v-model="form.amount" 
                type="number" 
                min="0" 
                step="0.01" 
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
                class="w-full bg-slate-50/50 border border-slate-200/80 rounded-2xl p-4 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all shadow-inner custom-date-input" 
                required 
              />
            </div>
          </div>

          <div class="pt-4 flex gap-3">
            <button type="button" @click="$router.push('/')" class="w-1/3 bg-slate-100 text-slate-600 py-4.5 rounded-2xl font-black text-sm hover:bg-slate-200 transition-colors">
              បោះបង់
            </button>
            <button 
              type="submit" 
              :disabled="isSaving" 
              class="w-2/3 bg-blue-600 text-white py-4.5 rounded-2xl font-black text-[15px] shadow-[0_8px_20px_rgba(37,99,235,0.25)] flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70"
            >
              <svg v-if="isSaving" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <span v-else>រក្សាទុកការកែប្រែ</span>
            </button>
          </div>

        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const toast = useToast();
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const isFetching = ref(true);
const isSaving = ref(false);

const form = ref({
  guest_name: '',
  event_name: '',
  address: '',
  amount: '',
  currency: 'KHR',
  event_date: '',
  notes: ''
});

// ទាញយកទិន្នន័យចាស់ពេលបើកទំព័រ
onMounted(async () => {
  const recordId = route.params.id; // ទាញយក ID ពី URL
  try {
    const response = await axios.get(`${API_URL}/contributions/${recordId}`);
    const data = response.data;
    
    // បញ្ចូលទិន្នន័យចាស់ទៅក្នុង Form
    form.value = {
      guest_name: data.guest_name,
      event_name: data.event_name,
      address: data.address || '',
      amount: data.amount,
      currency: data.currency || 'KHR',
      // Format ថ្ងៃឱ្យត្រូវជាមួយ input type="date" (YYYY-MM-DD)
      event_date: data.event_date ? new Date(data.event_date).toISOString().split('T')[0] : '',
      notes: data.notes || ''
    };
  } catch (error) {
    toast.error("រកមិនឃើញទិន្នន័យនេះទេ!");
    router.push('/'); // បើ Error អោយលោតទៅទំព័រដើមវិញ
  } finally {
    isFetching.value = false;
  }
});

// រក្សាទុកទិន្នន័យថ្មី
const handleUpdate = async () => {
  if (isSaving.value) return;
  isSaving.value = true;
  const recordId = route.params.id;

  try {
    await axios.put(`${API_URL}/contributions/${recordId}`, form.value);
    
    toast.success("កែប្រែបានជោគជ័យ! ✨", {
      timeout: 2000,
      icon: "✅"
    });
    
    setTimeout(() => {
      router.push('/');
    }, 1000);
    
  } catch (error) {
    const errorMsg = error.response?.data?.error || "មានបញ្ហាក្នុងការកែប្រែ!";
    toast.error(errorMsg, { icon: "⚠️" });
  } finally {
    isSaving.value = false;
  }
};
</script>

<style scoped>
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
input[type=number] {
  -moz-appearance: textfield;
}

.custom-date-input::-webkit-calendar-picker-indicator {
  cursor: pointer;
  opacity: 0.5;
  transition: 0.2s;
}
.custom-date-input::-webkit-calendar-picker-indicator:hover {
  opacity: 1;
}
</style>