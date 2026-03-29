<template>
  <div class="h-[100dvh] flex bg-[#f8fafc] font-sans text-gray-900 overflow-hidden relative">
    
    <aside v-if="$route.name !== 'login' && $route.name !== 'setup'" class="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      <div class="h-20 flex items-center justify-center px-4">
        <h1 class="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center gap-2">
          <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Save-Wedding
        </h1>
      </div>
      
      <nav class="flex-1 overflow-y-auto py-6 px-4 space-y-1.5 hide-scrollbar">
        
        <template v-if="userRole === 'user'">
          <p class="px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2 mb-3">ម៉ឺនុយចម្បង</p>
          
          <router-link to="/" class="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-gray-500 font-bold hover:bg-gray-50 hover:text-blue-600 transition-all" active-class="bg-blue-50/70 text-blue-600 shadow-sm border border-blue-100/50">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            បញ្ជីទិន្នន័យ
          </router-link>
          
          <router-link to="/add" class="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-gray-500 font-bold hover:bg-gray-50 hover:text-blue-600 transition-all" active-class="bg-blue-50/70 text-blue-600 shadow-sm border border-blue-100/50">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            បញ្ចូលចំណាយ
          </router-link>
        </template>

        <template v-if="userRole === 'owner'">
          <p class="px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2 mb-3">សម្រាប់អ្នកគ្រប់គ្រង</p>
          
          <router-link to="/users" class="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-gray-500 font-bold hover:bg-gray-50 hover:text-blue-600 transition-all" active-class="bg-blue-50/70 text-blue-600 shadow-sm border border-blue-100/50">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            គ្រប់គ្រងគណនី
          </router-link>
          
          <button @click="comingSoon" class="w-full flex justify-between items-center gap-4 px-4 py-3.5 rounded-2xl text-gray-500 font-bold hover:bg-gray-50 transition-all">
            <div class="flex items-center gap-4">
              <svg class="w-6 h-6 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
              របាយការណ៍
            </div>
            <span class="text-[9px] bg-orange-100 text-orange-600 px-2 py-1 rounded-md">ឆាប់ៗនេះ</span>
          </button>
        </template>

        <p class="px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest mt-8 mb-3">ផ្សេងៗ</p>
        
        <button @click="comingSoon" class="w-full flex justify-between items-center gap-4 px-4 py-3.5 rounded-2xl text-gray-500 font-bold hover:bg-gray-50 transition-all">
          <div class="flex items-center gap-4">
            <svg class="w-6 h-6 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            ការកំណត់
          </div>
          <span class="text-[9px] bg-orange-100 text-orange-600 px-2 py-1 rounded-md">ឆាប់ៗនេះ</span>
        </button>

        <button @click="comingSoon" class="w-full flex justify-between items-center gap-4 px-4 py-3.5 rounded-2xl text-gray-500 font-bold hover:bg-gray-50 transition-all">
          <div class="flex items-center gap-4">
            <svg class="w-6 h-6 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            គណនីខ្ញុំ
          </div>
          <span class="text-[9px] bg-orange-100 text-orange-600 px-2 py-1 rounded-md">ឆាប់ៗនេះ</span>
        </button>
      </nav>

      <div class="p-5 border-t border-gray-100">
        <button @click="showLogoutModal = true" class="flex items-center justify-center gap-3 w-full py-3.5 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          ចាកចេញ
        </button>
      </div>
    </aside>

    <main class="flex-1 flex flex-col h-full overflow-hidden relative">
      <header v-if="$route.name !== 'login' && $route.name !== 'setup'" class="md:hidden h-16 bg-white/90 backdrop-blur-xl flex items-center justify-center px-4 shrink-0 shadow-[0_2px_15px_rgba(0,0,0,0.03)] z-10 sticky top-0 border-b border-gray-100">
        <h1 class="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Save-Wedding</h1>
      </header>

      <div class="flex-1 overflow-y-auto p-0 sm:p-6 md:p-10 pb-32 md:pb-10 hide-scrollbar relative">
        <router-view></router-view>
      </div>
    </main>

    <nav v-if="$route.name !== 'login' && $route.name !== 'setup'" class="md:hidden fixed bottom-0 left-0 right-0 z-[100] px-3 pb-5 pointer-events-none">
      <div class="bg-white/95 backdrop-blur-xl border border-white/60 shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-[2rem] flex justify-between items-center h-16 px-4 pointer-events-auto relative">
        
        <router-link v-if="userRole === 'user'" to="/" class="flex flex-col items-center justify-center w-[20%] h-full text-gray-400 hover:text-blue-600 transition-colors" active-class="text-blue-600">
          <svg class="w-6 h-6 mb-1 transition-transform duration-300 active:scale-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          <span class="text-[9px] font-extrabold tracking-wide">បញ្ជី</span>
        </router-link>
        
        <router-link v-if="userRole === 'owner'" to="/users" class="flex flex-col items-center justify-center w-[20%] h-full text-gray-400 hover:text-blue-600 transition-colors" active-class="text-blue-600">
           <svg class="w-6 h-6 mb-1 transition-transform duration-300 active:scale-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
           <span class="text-[9px] font-extrabold tracking-wide">គ្រប់គ្រង</span>
        </router-link>

        <div v-if="userRole === 'user'" @click="comingSoon" class="flex flex-col items-center justify-center w-[20%] h-full text-gray-400 hover:text-blue-600 transition-colors cursor-pointer relative">
           <span class="absolute top-1 right-2 w-2 h-2 bg-orange-400 rounded-full border border-white animate-pulse"></span>
           <svg class="w-6 h-6 mb-1 transition-transform duration-300 active:scale-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
           <span class="text-[9px] font-extrabold tracking-wide">គណនីខ្ញុំ</span>
        </div>
        <div v-if="userRole === 'owner'" @click="comingSoon" class="flex flex-col items-center justify-center w-[20%] h-full text-gray-400 hover:text-blue-600 transition-colors cursor-pointer relative">
           <span class="absolute top-1 right-2 w-2 h-2 bg-orange-400 rounded-full border border-white animate-pulse"></span>
           <svg class="w-6 h-6 mb-1 transition-transform duration-300 active:scale-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
           <span class="text-[9px] font-extrabold tracking-wide">របាយការណ៍</span>
        </div>

        <div class="relative -top-6 flex justify-center w-[20%]">
          <router-link v-if="userRole === 'user'" to="/add" class="bg-gradient-to-tr from-blue-600 to-indigo-500 text-white p-3.5 rounded-full shadow-[0_8px_25px_rgba(37,99,235,0.4)] hover:shadow-[0_10px_30px_rgba(37,99,235,0.5)] active:scale-95 transition-all duration-300 ring-4 ring-white flex items-center justify-center">
             <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path></svg>
          </router-link>
          <router-link v-if="userRole === 'owner'" to="/users" class="bg-gradient-to-tr from-indigo-600 to-purple-600 text-white p-3.5 rounded-full shadow-[0_8px_25px_rgba(79,70,229,0.4)] hover:shadow-[0_10px_30px_rgba(79,70,229,0.5)] active:scale-95 transition-all duration-300 ring-4 ring-white flex items-center justify-center">
             <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path></svg>
          </router-link>
        </div>

        <div @click="comingSoon" class="flex flex-col items-center justify-center w-[20%] h-full text-gray-400 hover:text-blue-600 transition-colors cursor-pointer relative">
           <svg class="w-6 h-6 mb-1 transition-transform duration-300 active:scale-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
           <span class="text-[9px] font-extrabold tracking-wide">ការកំណត់</span>
        </div>

        <div @click="showLogoutModal = true" class="flex flex-col items-center justify-center w-[20%] h-full text-red-400 hover:text-red-500 transition-colors cursor-pointer">
          <svg class="w-6 h-6 mb-1 transition-transform duration-300 active:scale-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          <span class="text-[9px] font-extrabold tracking-wide">ចាកចេញ</span>
        </div>
      </div>
    </nav>

    <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="showLogoutModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center px-4">
        <div class="bg-white rounded-[2rem] p-6 w-full max-w-[320px] shadow-2xl animate-in zoom-in-95 duration-200">
          
          <div class="w-14 h-14 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-5 border-4 border-white shadow-sm">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          </div>
          
          <h3 class="text-lg font-black text-slate-800 text-center mb-2">តើអ្នកចង់ចាកចេញមែនទេ?</h3>
          <p class="text-[11px] font-bold text-slate-500 text-center mb-6">អ្នកនឹងត្រូវចូលគណនីម្តងទៀតនៅពេលក្រោយ។</p>
          
          <div class="flex gap-2.5">
            <button @click="showLogoutModal = false" class="flex-1 py-3.5 bg-slate-100 text-slate-600 rounded-xl text-xs font-black hover:bg-slate-200 transition-colors">បោះបង់</button>
            <button @click="confirmLogout" class="flex-1 py-3.5 bg-red-500 text-white rounded-xl text-xs font-black hover:bg-red-600 transition-colors shadow-md shadow-red-200">ចាកចេញ</button>
          </div>
          
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useToast } from "vue-toastification";

const router = useRouter();
const route = useRoute();
const toast = useToast();

const userRole = ref(localStorage.getItem('userRole'));
const showLogoutModal = ref(false); // 🌟 State សម្រាប់គ្រប់គ្រង Modal

watch(() => route.path, () => {
  userRole.value = localStorage.getItem('userRole');
});

const comingSoon = () => {
  toast.info("មុខងារនេះនឹងមានក្នុងពេលឆាប់ៗនេះ! 🚀", {
    timeout: 3000,
    position: "top-center"
  });
};

// 🌟 មុខងារថ្មី សម្រាប់ពេលយល់ព្រមលុបពិតប្រាកដ
const confirmLogout = () => {
  showLogoutModal.value = false; // បិទ Modal វិញ
  localStorage.clear();
  toast.success("អ្នកបានចាកចេញពីគណនី", { timeout: 2000 });
  router.push('/login');
};
</script>

<style>
/* Font ខ្មែរ (ត្រូវតែនៅលើគេបង្អស់) */
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&display=swap');

* {
  font-family: 'Kantumruy Pro', sans-serif;
}

/* លាក់ Scrollbar តែនៅតែអាច Scroll បាន */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>