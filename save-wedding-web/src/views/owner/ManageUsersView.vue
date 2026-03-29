<template>
  <div class="max-w-[1200px] mx-auto space-y-8 pb-12 animate-in fade-in duration-700">
    
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-6 md:p-8 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100">
      <div class="flex items-center gap-6">
        <div class="w-16 h-16 rounded-3xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-100 shrink-0">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
        </div>
        <div>
          <h2 class="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">គ្រប់គ្រងអតិថិជន</h2>
          <p class="text-sm text-slate-500 font-medium mt-1 uppercase tracking-widest opacity-70">Client Management System</p>
        </div>
      </div>
      
      <div class="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
        <div class="relative w-full sm:w-80 group">
          <input v-model="searchQuery" type="text" placeholder="ស្វែងរកឈ្មោះគណនី..." class="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-slate-700 shadow-inner" />
          <svg class="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        
        <button @click="openAddModal" class="px-8 py-3.5 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4"></path></svg>
          បង្កើតថ្មី
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      <div v-for="user in filteredUsers" :key="user.id" class="group bg-white rounded-[2.5rem] p-8 border border-slate-50 shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(79,70,229,0.1)] transition-all duration-500 relative flex flex-col">
        
        <div class="absolute top-8 right-8">
  <div v-if="user.is_active === true" class="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full uppercase tracking-widest border border-emerald-100 flex items-center gap-1.5">
    <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> សកម្ម
  </div>
  <div v-else class="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-black rounded-full uppercase tracking-widest border border-red-100 flex items-center gap-1.5">
    <span class="w-1.5 h-1.5 bg-red-500 rounded-full"></span> ផ្អាក
  </div>
</div>

        <div class="flex flex-col items-center text-center mb-8">
          <div class="w-20 h-20 rounded-[2rem] bg-slate-50 flex items-center justify-center text-slate-400 mb-5 border border-slate-100 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors duration-500 font-black text-3xl shadow-inner">
             {{ user.username.charAt(0).toUpperCase() }}
          </div>
          <h3 class="text-xl font-black text-slate-800">{{ user.username }}</h3>
          <p class="text-indigo-500 text-[11px] font-black mt-1.5 uppercase tracking-widest">{{ user.plan_type || 'Free Plan' }}</p>
        </div>

        <div class="bg-slate-50/70 rounded-[1.5rem] p-5 space-y-4 mb-8 flex-1 border border-slate-100/50">
           <div class="flex items-center justify-between">
             <span class="text-[11px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
               <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
               ដែនកំណត់
             </span>
             <span class="text-sm font-bold text-slate-700 bg-white px-3 py-1 rounded-lg shadow-sm border border-slate-100">
               {{ user.record_limit ? `${user.record_limit} Records` : `${user.storage_limit_kb} KB` }}
             </span>
           </div>
           
           <div class="flex items-center justify-between pt-4 border-t border-slate-200/50">
             <span class="text-[11px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
               <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
               សុពលភាព
             </span>
             <span class="text-[11px] font-black px-3 py-1.5 rounded-lg bg-white shadow-sm border border-slate-100" :class="getTimeRemaining(user.expiry_date).color">
               {{ getTimeRemaining(user.expiry_date).text }}
             </span>
           </div>
        </div>

        <div class="grid grid-cols-3 gap-3">
          <button @click="openEditModal(user)" class="py-3 bg-white border border-slate-100 hover:bg-indigo-600 hover:text-white text-indigo-600 rounded-2xl font-black text-[11px] transition-all duration-300 flex flex-col items-center gap-1 shadow-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg> កែប្រែ
          </button>
          
          <button @click="toggleStatus(user)" 
  class="py-3 rounded-2xl font-black text-[11px] transition-all duration-300 flex flex-col items-center gap-1 shadow-md active:scale-95" 
  :class="user.is_active === true ? 'bg-orange-50 text-orange-500 border border-orange-100' : 'bg-emerald-500 text-white shadow-emerald-200'">
  
  <svg v-if="user.is_active === true" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
  </svg>
  
  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
  </svg>

  {{ user.is_active === true ? 'ផ្អាក' : 'បើកវិញ' }}
</button>

          <button @click="confirmDelete(user)" class="py-3 bg-white border border-slate-100 hover:bg-red-500 hover:text-white text-red-500 rounded-2xl font-black text-[11px] transition-all duration-300 flex flex-col items-center gap-1 shadow-sm">
             <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg> លុប
          </button>
        </div>
      </div>
    </div>

    <div v-if="isDeleteModalOpen" class="fixed inset-0 z-[150] flex items-center justify-center p-6">
      <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity" @click="isDeleteModalOpen = false"></div>
      <div class="relative bg-white rounded-[2.5rem] p-10 max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95 duration-200 border border-white">
        <div class="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner"><svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg></div>
        <h3 class="text-2xl font-black text-slate-900">តើអ្នកពិតជាចង់លុប?</h3>
        <p class="text-slate-500 mt-3 font-medium leading-relaxed">គណនី <span class="text-slate-900 font-bold">"{{ userToDelete?.username }}"</span> និងរាល់ទិន្នន័យចំណាយទាំងអស់នឹងត្រូវបានលុបជារៀងរហូត។</p>
        <div class="flex gap-4 mt-10">
          <button @click="isDeleteModalOpen = false" class="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black hover:bg-slate-200 transition-colors">បោះបង់</button>
          <button @click="proceedDelete" class="flex-1 py-4 bg-red-500 text-white rounded-2xl font-black shadow-lg shadow-red-100 hover:bg-red-600 transition-all active:scale-95">យល់ព្រមលុប</button>
        </div>
      </div>
    </div>

    <div v-if="isModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div class="absolute inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity" @click="isModalOpen = false"></div>
      <div class="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] border border-white">
        
        <div class="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white z-10 shrink-0">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
               <svg v-if="isEditMode" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
               <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
            </div>
            <div>
              <h3 class="text-xl font-black text-slate-800">{{ isEditMode ? 'កែប្រែគណនី' : 'បង្កើតគណនីថ្មី' }}</h3>
              <p class="text-[10px] text-slate-400 font-black mt-0.5 uppercase tracking-[0.2em]">{{ isEditMode ? 'Edit Account' : 'New Setup' }}</p>
            </div>
          </div>
          <button @click="isModalOpen = false" class="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <form id="userForm" @submit.prevent="saveUser" class="p-8 overflow-y-auto space-y-8 bg-slate-50/30 flex-1 hide-scrollbar">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="block text-xs font-black text-slate-500 uppercase tracking-widest">ឈ្មោះគណនី <span class="text-red-500">*</span></label>
              <input v-model="form.username" type="text" class="w-full bg-white border border-slate-200 rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-800 shadow-sm" required />
            </div>
            <div class="space-y-2">
              <label class="block text-xs font-black text-slate-500 uppercase tracking-widest">លេខសម្ងាត់ <span v-if="!isEditMode" class="text-red-500">*</span></label>
              <input v-model="form.password" type="password" :placeholder="isEditMode ? 'ទុកចោលបើមិនចង់ប្តូរ' : '••••••••'" class="w-full bg-white border border-slate-200 rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none font-bold tracking-widest text-slate-800 shadow-sm" :required="!isEditMode" />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="block text-xs font-black text-slate-500 uppercase tracking-widest">តម្លៃគម្រោង (Plan)</label>
              <div class="flex shadow-sm rounded-2xl overflow-hidden border border-slate-200 bg-white">
                <select v-model="form.priceCurrency" class="bg-slate-50 border-r border-slate-200 text-slate-700 font-bold text-sm outline-none block px-4 w-24">
                  <option value="KHR">៛</option>
                  <option value="USD">$</option>
                </select>
                <input v-model="form.priceAmount" type="number" min="0" step="100" class="w-full bg-transparent border-none text-slate-800 font-black text-lg focus:ring-0 outline-none block p-4" />
              </div>
            </div>
            <div class="space-y-2">
              <label class="block text-xs font-black text-slate-500 uppercase tracking-widest">ថ្ងៃផុតកំណត់ <span class="text-red-500">*</span></label>
              <input v-model="form.expiry_date" type="date" class="w-full bg-white border border-slate-200 rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-700 shadow-sm" required />
            </div>
          </div>

          <div class="space-y-4">
            <label class="block text-xs font-black text-slate-500 uppercase tracking-widest">ដែនកំណត់ទិន្នន័យ</label>
            <div class="bg-slate-100/80 p-1.5 rounded-[1.2rem] flex relative border border-slate-200/50">
              <div class="absolute inset-y-1.5 w-[calc(50%-6px)] bg-white rounded-xl shadow-sm transition-all duration-300" :class="limitType === 'record' ? 'left-1.5' : 'left-[calc(50%+4.5px)]'"></div>
              <button type="button" @click="limitType = 'record'" class="relative z-10 flex-1 py-3 text-xs font-black rounded-xl" :class="limitType === 'record' ? 'text-indigo-600' : 'text-slate-500'">ចំនួនជួរ (Records)</button>
              <button type="button" @click="limitType = 'storage'" class="relative z-10 flex-1 py-3 text-xs font-black rounded-xl" :class="limitType === 'storage' ? 'text-indigo-600' : 'text-slate-500'">ទំហំផ្ទុក (KB)</button>
            </div>
            <div class="relative shadow-sm rounded-2xl overflow-hidden border border-slate-200 bg-white">
              <input v-model="limitValue" type="number" min="1" class="w-full bg-transparent border-none p-5 font-black text-2xl text-slate-800 outline-none" required />
              <div class="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-100 px-4 py-2 rounded-xl font-black text-[10px] text-slate-500 border border-slate-200">
                {{ limitType === 'record' ? 'LINES' : 'KILOBYTES' }}
              </div>
            </div>
          </div>
        </form>

        <div class="px-8 py-6 border-t border-slate-100 bg-white shrink-0 flex gap-4 justify-end items-center">
           <button type="button" @click="isModalOpen = false" class="px-8 py-4 bg-slate-50 text-slate-600 rounded-2xl font-black hover:bg-slate-100 transition-colors">បោះបង់</button>
           <button form="userForm" type="submit" :disabled="isLoading" class="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center gap-2 active:scale-95 disabled:opacity-70">
             <svg v-if="isLoading" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
             {{ isLoading ? 'រក្សាទុក...' : (isEditMode ? 'កែប្រែគណនី' : 'បង្កើតគណនី') }}
           </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useToast } from "vue-toastification";
import axios from 'axios';

const toast = useToast();
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const users = ref([]);
const searchQuery = ref('');
const isModalOpen = ref(false);
const isEditMode = ref(false);
const isLoading = ref(false);

const isDeleteModalOpen = ref(false);
const userToDelete = ref(null);

const form = ref({ id: null, username: '', password: '', priceAmount: 0, priceCurrency: 'KHR', expiry_date: '' });
const limitType = ref('record');
const limitValue = ref(200); 

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value;
  return users.value.filter(u => u.username.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

const getTimeRemaining = (dateString) => {
  if (!dateString) return { text: 'គ្មានកំណត់', color: 'text-slate-600' };
  const diff = new Date(dateString) - new Date();
  if (diff <= 0) return { text: 'ផុតកំណត់', color: 'text-red-500 font-black' };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  return { text: `នៅសល់ ${days}ថ្ងៃ ${hours}ម៉ោង`, color: 'text-orange-500 font-bold' };
};

const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    users.value = response.data;
  } catch (error) { toast.error("មិនអាចទាញយកទិន្នន័យបានទេ"); }
};

const openAddModal = () => {
  isEditMode.value = false;
  form.value = { id: null, username: '', password: '', priceAmount: 0, priceCurrency: 'KHR', expiry_date: '' };
  limitValue.value = 200;
  isModalOpen.value = true;
};

const openEditModal = (user) => {
  isEditMode.value = true;
  let amount = 0, currency = 'KHR';
  if(user.plan_type && user.plan_type !== 'Free') {
    currency = user.plan_type.includes('$') ? 'USD' : 'KHR';
    amount = parseFloat(user.plan_type.replace(/[^0-9.]/g, ''));
  }
  form.value = { id: user.id, username: user.username, password: '', priceAmount: amount, priceCurrency: currency, expiry_date: user.expiry_date ? new Date(user.expiry_date).toISOString().split('T')[0] : '' };
  if (user.record_limit) { limitType.value = 'record'; limitValue.value = user.record_limit; }
  else { limitType.value = 'storage'; limitValue.value = user.storage_limit_kb; }
  isModalOpen.value = true;
};

const saveUser = async () => {
  isLoading.value = true;
  let planString = form.value.priceAmount > 0 ? `Paid (${form.value.priceCurrency === 'USD' ? '$' : '៛'}${form.value.priceAmount})` : 'Free';
  const payload = { username: form.value.username, password: form.value.password, plan_type: planString, expiry_date: form.value.expiry_date, record_limit: limitType.value === 'record' ? limitValue.value : null, storage_limit_kb: limitType.value === 'storage' ? limitValue.value : null };

  try {
    if (isEditMode.value) {
      if(!payload.password) delete payload.password; 
      await axios.put(`${API_URL}/users/${form.value.id}`, payload);
      toast.success("កែប្រែគណនីជោគជ័យ!", { icon: "✏️" });
    } else {
      await axios.post(`${API_URL}/users`, payload);
      toast.success("បង្កើតគណនីជោគជ័យ!", { icon: "🎉" });
    }
    isModalOpen.value = false; fetchUsers(); 
  } catch (error) { toast.error(error.response?.data?.error || "មានបញ្ហា!", { icon: "⚠️" }); }
  finally { isLoading.value = false; }
};

const toggleStatus = async (user) => {
  // ១. កំណត់តម្លៃថ្មីដែលត្រូវប្តូរ (បើ true ទៅ false, បើ false ទៅ true)
  const newStatus = !(user.is_active === true); 
  
  try {
    // ២. ហៅ API ទៅ Backend
    await axios.patch(`${API_URL}/users/${user.id}/status`, { is_active: newStatus });
    
    // 🌟 ៣. UPDATE FRONTEND STATE ភ្លាមៗ (សំខាន់បំផុត)
    // យើងស្វែងរក User ក្នុង Array `users.value` ហើយប្តូរតម្លៃវាផ្ទាល់តែម្តង
    const index = users.value.findIndex(u => u.id === user.id);
    if (index !== -1) {
      users.value[index].is_active = newStatus;
    }

    // ៤. បង្ហាញការជូនដំណឹង
    if (newStatus) {
      toast.success(`បានបើកដំណើរការគណនី "${user.username}" ឡើងវិញ! ✅`);
    } else {
      toast.warning(`បានផ្អាកគណនី "${user.username}" ជាបណ្តោះអាសន្ន! ⏸️`);
    }
    
  } catch (error) {
    console.error("Error updating status:", error);
    toast.error("មិនអាចផ្លាស់ប្តូរស្ថានភាពបានទេ!");
  }
};

const confirmDelete = (user) => {
  userToDelete.value = user;
  isDeleteModalOpen.value = true;
};

const proceedDelete = async () => {
  try {
    await axios.delete(`${API_URL}/users/${userToDelete.value.id}`);
    toast.success("លុបគណនីជោគជ័យ!"); fetchUsers();
  } catch (error) { toast.error("បរាជ័យ!"); }
  finally { isDeleteModalOpen.value = false; userToDelete.value = null; }
};

onMounted(fetchUsers);
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>