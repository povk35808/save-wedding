<template>
  <div class="min-h-screen bg-[#f8fafc] pb-28 font-sans animate-in fade-in duration-300 relative overflow-x-hidden">
    
    <div class="bg-gradient-to-br from-blue-600 to-indigo-600 pt-8 pb-16 px-5 rounded-b-[2rem] shadow-sm relative overflow-hidden">
      <div class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
      <div class="relative z-10 max-w-md md:max-w-[1400px] mx-auto flex justify-between items-center">
        <div>
          <h1 class="text-2xl md:text-3xl font-black text-white tracking-tight drop-shadow-sm">បញ្ជីទិន្នន័យចងដៃ</h1>
          <p class="text-blue-100/90 mt-0.5 text-[10px] md:text-xs font-black uppercase tracking-widest">Contributions</p>
        </div>
      </div>
    </div>

    <div class="max-w-md md:max-w-[1400px] mx-auto px-4 -mt-8 relative z-40 mb-3">
      <div class="bg-white p-1.5 rounded-[1.5rem] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.12)] flex items-center gap-2 border border-slate-100/50">
        
        <div class="relative flex-1">
          <svg class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <input 
            v-model="searchQuery" 
            class="w-full bg-slate-50/50 rounded-2xl pl-10 pr-4 py-3.5 outline-none text-[13px] font-bold text-slate-700 placeholder-slate-400 transition-colors focus:bg-slate-100/50" 
            placeholder="ស្វែងរកឈ្មោះ ឬកម្មវិធី..." 
          />
        </div>
        
        <button @click="exportToPDF" :disabled="isExporting" class="h-12 px-3 md:px-5 rounded-[1.2rem] bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all flex items-center justify-center gap-2 shrink-0 border border-blue-100 active:scale-95 disabled:opacity-50">
          <svg v-if="!isExporting" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          <svg v-else class="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          <span class="hidden md:block text-xs font-black uppercase tracking-wider">ទាញយក PDF</span>
        </button>

        <div ref="filterContainer" class="relative">
          <button @click="showFilter = !showFilter" :class="showFilter || isDateFilterActive ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-500'" class="w-12 h-12 rounded-[1.2rem] flex items-center justify-center hover:bg-slate-100 transition-colors shrink-0 relative active:scale-95">
            <span v-if="isDateFilterActive" class="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white shadow-sm"></span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
          </button>

          <transition enter-active-class="transition duration-200 ease-out" enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-150 ease-in" leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
            <div v-if="showFilter" class="absolute top-[115%] right-0 w-[320px] max-w-[90vw] bg-white rounded-[1.5rem] shadow-2xl border border-slate-100 p-4 z-50 origin-top-right">
              
              <div class="flex items-center justify-between mb-3">
                <label class="block text-[11px] font-black text-slate-800 uppercase tracking-widest">ច្រោះកាលបរិច្ឆេទ</label>
                <button v-if="isDateFilterActive" @click="clearDateFilter" class="text-[9px] font-black text-red-500 bg-red-50 px-2.5 py-1.5 rounded-lg hover:bg-red-100 transition-colors">សម្អាត (CLEAR)</button>
              </div>

              <div class="flex bg-slate-100 p-1 rounded-xl mb-4">
                <button @click="filterType = 'day'" :class="filterType === 'day' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'" class="flex-1 py-2 text-[10px] font-black uppercase rounded-lg transition-all">ថ្ងៃ</button>
                <button @click="filterType = 'month'" :class="filterType === 'month' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'" class="flex-1 py-2 text-[10px] font-black uppercase rounded-lg transition-all">ខែ</button>
                <button @click="filterType = 'year'" :class="filterType === 'year' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'" class="flex-1 py-2 text-[10px] font-black uppercase rounded-lg transition-all">ឆ្នាំ</button>
                <button @click="filterType = 'range'" :class="filterType === 'range' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'" class="flex-1 py-2 text-[10px] font-black uppercase rounded-lg transition-all">ចន្លោះ</button>
              </div>
              
              <div class="min-h-[50px]">
                <input v-if="filterType === 'day'" v-model="filterDate" type="date" class="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm font-bold text-slate-700 outline-none focus:border-blue-500 transition-colors custom-date-input" />
                <input v-if="filterType === 'month'" v-model="filterMonth" type="month" class="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm font-bold text-slate-700 outline-none focus:border-blue-500 transition-colors custom-date-input" />
                <input v-if="filterType === 'year'" v-model="filterYear" type="number" placeholder="វាយបញ្ចូលឆ្នាំ (ឧទាហរណ៍: 2026)" class="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm font-bold text-slate-700 outline-none focus:border-blue-500 transition-colors" />
                
                <div v-if="filterType === 'range'" class="flex items-center gap-2">
                  <input v-model="filterStartDate" type="date" class="w-1/2 bg-slate-50 border border-slate-100 rounded-xl p-3 text-[11px] font-bold text-slate-700 outline-none custom-date-input" />
                  <span class="text-slate-300 font-black">-</span>
                  <input v-model="filterEndDate" type="date" class="w-1/2 bg-slate-50 border border-slate-100 rounded-xl p-3 text-[11px] font-bold text-slate-700 outline-none custom-date-input" />
                </div>
              </div>

            </div>
          </transition>
        </div>

      </div>
    </div>

    <div class="max-w-md md:max-w-[1400px] mx-auto px-4 mb-4 relative z-30">
      <div class="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1.5 pt-1">
        <button 
          v-for="type in eventTypes" 
          :key="type"
          @click="selectedEventType = type"
          :class="selectedEventType === type ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30 border-indigo-600' : 'bg-white text-slate-500 hover:bg-slate-50 border-slate-200/80'"
          class="whitespace-nowrap px-4 py-2 rounded-[1rem] border text-[11px] font-black tracking-wide transition-all active:scale-95 shrink-0"
        >
          {{ type }}
        </button>
      </div>
    </div>

    <div class="max-w-md md:max-w-[1400px] mx-auto px-4 space-y-3 z-10 relative">
      <div v-if="paginatedData.length > 0" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 space-y-0">
        
        <div v-for="item in paginatedData" :key="item.id" class="bg-white rounded-[1.2rem] p-4 shadow-sm border border-slate-100/60 hover:shadow-md transition-shadow flex flex-col justify-between">
          <div class="flex items-center justify-between gap-3 mb-4">
            <div class="flex items-center gap-3 min-w-0">
              <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-lg shrink-0 uppercase border border-blue-100/50">
                {{ item.guest_name.charAt(0) }}
              </div>
              <div class="min-w-0">
                <h3 class="text-[14px] font-black text-slate-800 truncate">{{ item.guest_name }}</h3>
                <p class="text-[9px] text-slate-400 font-bold mt-0.5 uppercase tracking-widest">{{ getTimeRemaining(item.created_at) }}</p>
              </div>
            </div>
            
            <div class="flex gap-1.5 shrink-0">
              <router-link :to="'/edit/'+item.id" class="w-8 h-8 rounded-full border border-slate-100 text-slate-400 hover:text-blue-500 hover:bg-blue-50 flex items-center justify-center transition-colors active:scale-95">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
              </router-link>
              <button @click="prepareDelete(item.id)" class="w-8 h-8 rounded-full border border-slate-100 text-slate-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors active:scale-95">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
            </div>
          </div>

          <div class="flex justify-between items-center bg-slate-50/50 p-3 rounded-[0.8rem] border border-slate-100/50 mb-3">
            <span class="text-[11px] font-bold text-slate-400">ទឹកប្រាក់</span>
            <div class="text-right flex items-baseline gap-1.5">
              <span class="text-[9px] font-black uppercase text-slate-400">{{ item.currency === 'USD' ? 'USD' : 'KHR' }}</span>
              <span class="text-xl font-black leading-none tracking-tight" :class="item.currency === 'USD' ? 'text-blue-600' : 'text-emerald-500'">
                {{ formatCurrency(item.amount, item.currency) }}
              </span>
            </div>
          </div>

          <div class="space-y-2 px-1">
            <div class="flex items-center justify-between gap-4">
              <div class="flex items-center gap-2 min-w-0">
                <div class="text-indigo-400"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15.546c.523 0 .974.276 1.167.683H20v.683a1.725 1.725 0 11-3.45 0v-.683h-.25c.193-.407.644-.683 1.167-.683a1.725 1.725 0 113.45 0zM12 21a9 9 0 110-18 9 9 0 010 18zm0-9a3 3 0 100-6 3 3 0 000 6z"></path></svg></div>
                <span class="text-[11px] font-bold text-slate-600 truncate">{{ item.event_name }}</span>
              </div>
              <div class="flex items-center gap-2 shrink-0">
                <div class="text-orange-400"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>
                <span class="text-[11px] font-bold text-slate-600">{{ new Date(item.event_date).toLocaleDateString('en-GB') }}</span>
              </div>
            </div>
            <div v-if="item.address" class="flex items-start gap-2 pt-1 border-t border-slate-50 mt-1">
              <div class="text-slate-400 shrink-0 mt-0.5"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></div>
              <span class="text-[10px] font-bold text-slate-500 truncate">{{ item.address }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="paginatedData.length > 0" ref="observerTarget" class="py-6 flex justify-center items-center col-span-1 sm:col-span-2 xl:col-span-4">
        <svg v-if="displayLimit < filteredData.length" class="animate-spin h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
        <span v-else-if="filteredData.length > 14" class="text-[10px] font-bold text-slate-300 uppercase tracking-widest">អស់ទិន្នន័យហើយ</span>
      </div>
      <div v-else class="py-16 text-center col-span-1 sm:col-span-2 xl:col-span-4">
        <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100">
          <svg class="w-7 h-7 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
        </div>
        <p class="font-black text-slate-700 text-[14px]">មិនមានទិន្នន័យទេ</p>
      </div>
    </div>

    <div style="position: absolute; top: -10000px; left: -10000px; width: 800px; z-index: -10; opacity: 0; pointer-events: none;">
      <div id="pdf-report-content" style="background-color: #ffffff; padding: 45px; font-family: 'Kantumruy Pro', sans-serif; color: #334155;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 30px;">
          <div>
            <h1 style="font-size: 26px; font-weight: 600; color: #1e3a8a; margin: 0; line-height: 1.4;">របាយការណ៍ចំណងដៃ</h1>
            <p style="font-size: 13px; color: #64748b; margin: 5px 0 0 0;">ប្រព័ន្ធគ្រប់គ្រងទិន្នន័យចំណាយ (Save-Wedding)</p>
          </div>
          <div style="text-align: right;">
            <p style="font-size: 12px; color: #64748b; margin: 0;">កាលបរិច្ឆេទ</p>
            <p style="font-size: 14px; font-weight: 600; color: #0f172a; margin: 3px 0 0 0;">{{ new Date().toLocaleDateString('en-GB') }}</p>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; background-color: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 30px; border: 1px solid #e2e8f0;">
          <div style="text-align: center; flex: 1; border-right: 1px solid #e2e8f0;">
            <p style="font-size: 11px; color: #64748b; margin: 0 0 5px 0;">ចំនួនភ្ញៀវសរុប</p>
            <p style="font-size: 20px; font-weight: 600; color: #0f172a; margin: 0;">{{ filteredData.length }} <span style="font-size: 14px; font-weight: normal;">នាក់</span></p>
          </div>
          <div style="text-align: center; flex: 1; border-right: 1px solid #e2e8f0;">
            <p style="font-size: 11px; color: #64748b; margin: 0 0 5px 0;">សរុបប្រាក់ដុល្លារ (USD)</p>
            <p style="font-size: 20px; font-weight: 600; color: #2563eb; margin: 0;">$ {{ formatCurrency(totalUSD, 'USD') }}</p>
          </div>
          <div style="text-align: center; flex: 1;">
            <p style="font-size: 11px; color: #64748b; margin: 0 0 5px 0;">សរុបប្រាក់រៀល (KHR)</p>
            <p style="font-size: 20px; font-weight: 600; color: #059669; margin: 0;">{{ formatCurrency(totalKHR, 'KHR') }} <span style="font-size: 14px; font-weight: normal;">៛</span></p>
          </div>
        </div>
        <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
          <thead>
            <tr style="background-color: #1e3a8a; color: #ffffff;">
              <th style="padding: 12px; text-align: center; font-weight: 500; border-top-left-radius: 6px; width: 50px;">ល.រ</th>
              <th style="padding: 12px; text-align: left; font-weight: 500;">ឈ្មោះអ្នកចូលរួម</th>
              <th style="padding: 12px; text-align: left; font-weight: 500;">កម្មវិធី / ទីតាំង</th>
              <th style="padding: 12px; text-align: center; font-weight: 500; width: 100px;">ថ្ងៃទី</th>
              <th style="padding: 12px; text-align: right; font-weight: 500; border-top-right-radius: 6px; width: 120px;">ទឹកប្រាក់</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in filteredData" :key="item.id" :style="index % 2 === 0 ? 'background-color: #ffffff;' : 'background-color: #f8fafc;'">
              <td style="padding: 12px; text-align: center; border-bottom: 1px solid #e2e8f0; color: #64748b;">{{ index + 1 }}</td>
              <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #0f172a;">{{ item.guest_name }}</td>
              <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">
                {{ item.event_name }}
                <div v-if="item.address" style="font-size: 10px; color: #94a3b8; margin-top: 2px;">{{ item.address }}</div>
              </td>
              <td style="padding: 12px; text-align: center; border-bottom: 1px solid #e2e8f0; color: #64748b;">{{ new Date(item.event_date).toLocaleDateString('en-GB') }}</td>
              <td style="padding: 12px; text-align: right; border-bottom: 1px solid #e2e8f0; font-weight: 600;" :style="item.currency === 'USD' ? 'color: #2563eb;' : 'color: #059669;'">
                {{ item.currency === 'USD' ? '$' : '' }} {{ formatCurrency(item.amount, item.currency) }} {{ item.currency === 'KHR' ? '៛' : '' }}
              </td>
            </tr>
          </tbody>
        </table>
        <div style="margin-top: 40px; text-align: center; font-size: 10px; color: #cbd5e1;">របាយការណ៍នេះត្រូវបានបង្កើតដោយស្វ័យប្រវត្តិដោយប្រព័ន្ធ។</div>
      </div>
    </div>

    <router-link to="/add" class="md:hidden fixed bottom-6 right-5 z-[80] w-[52px] h-[52px] bg-blue-600 text-white rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(37,99,235,0.4)] active:scale-95 transition-transform border-[2.5px] border-white">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path></svg>
    </router-link>

    <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center px-4">
        <div class="bg-white rounded-[2rem] p-6 w-full max-w-[320px] shadow-2xl animate-in zoom-in-95 duration-200">
          <div class="w-14 h-14 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-5 border-4 border-white shadow-sm">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </div>
          <h3 class="text-lg font-black text-slate-800 text-center mb-2">តើអ្នកចង់លុបមែនទេ?</h3>
          <p class="text-xs font-bold text-slate-500 text-center mb-6">ទិន្នន័យនេះនឹងត្រូវលុបជាអចិន្ត្រៃយ៍។</p>
          <div class="flex gap-2.5">
            <button @click="showDeleteModal = false" class="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl text-xs font-black hover:bg-slate-200 transition-colors">បោះបង់</button>
            <button @click="finalizeDelete" class="flex-1 py-3 bg-red-500 text-white rounded-xl text-xs font-black hover:bg-red-600 transition-colors shadow-md shadow-red-200">យល់ព្រមលុប</button>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import axios from 'axios';
import { useToast } from "vue-toastification";
import html2pdf from 'html2pdf.js';

const toast = useToast();
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const contributionData = ref([]);
const searchQuery = ref('');

// 🌟 Advanced Date Filter State
const filterType = ref('day'); 
const filterDate = ref('');
const filterMonth = ref('');
const filterYear = ref('');
const filterStartDate = ref('');
const filterEndDate = ref('');
const showFilter = ref(false);
const filterContainer = ref(null);

// 🌟 Event Type Filter State (វៃឆ្លាត)
const selectedEventType = ref('ទាំងអស់');
const mainEventTypes = ['រៀបការ', 'កាត់ចំណងដៃ', 'ភ្ជាប់ពាក្យ', 'ជប់លៀង', 'ឡើងផ្ទះ', 'ខួបកំណើត'];
const eventTypes = ['ទាំងអស់', ...mainEventTypes, 'ផ្សេងៗ'];

const showDeleteModal = ref(false);
const itemToDeleteId = ref(null);

const displayLimit = ref(14);
const observerTarget = ref(null);

// PDF State
const isExporting = ref(false);

// Watchers for filtering reset
watch([searchQuery, selectedEventType, filterDate, filterMonth, filterYear, filterStartDate, filterEndDate], () => {
  displayLimit.value = 14; // Reset infinite scroll on filter change
});

// Watchers for date dropdown close
watch([filterDate, filterMonth], ([newDate, newMonth]) => {
  if (newDate || newMonth) showFilter.value = false;
});
watch(filterYear, (newYear) => {
  if (newYear && String(newYear).length === 4) showFilter.value = false;
});
watch([filterStartDate, filterEndDate], ([start, end]) => {
  if (start && end) showFilter.value = false;
});

const clearDateFilter = () => {
  filterDate.value = '';
  filterMonth.value = '';
  filterYear.value = '';
  filterStartDate.value = '';
  filterEndDate.value = '';
  showFilter.value = false;
};

const handleClickOutside = (event) => {
  if (showFilter.value && filterContainer.value && !filterContainer.value.contains(event.target)) {
    showFilter.value = false;
  }
};

const isDateFilterActive = computed(() => {
  return filterDate.value || filterMonth.value || filterYear.value || (filterStartDate.value && filterEndDate.value);
});

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
  document.addEventListener('click', handleClickOutside);

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && displayLimit.value < filteredData.value.length) {
      setTimeout(() => {
        displayLimit.value += 14;
      }, 200); 
    }
  }, { threshold: 1.0 });

  if (observerTarget.value) {
    observer.observe(observerTarget.value);
  }
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

// 🌟 SMART FILTER LOGIC (Updated to include Event Type & Grid)
const filteredData = computed(() => {
  return contributionData.value.filter(item => {
    // 1. Search Query Filter (Name or Event Name)
    const matchesSearch = searchQuery.value 
      ? item.guest_name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
        item.event_name.toLowerCase().includes(searchQuery.value.toLowerCase())
      : true;
    
    if (!matchesSearch) return false;

    // 2. 🌟 Smart Event Type Filter
    if (selectedEventType.value !== 'ទាំងអស់') {
      const eventName = item.event_name.toLowerCase();
      
      if (selectedEventType.value === 'ផ្សេងៗ') {
        // ប្រសិនបើជ្រើសរើស "ផ្សេងៗ", ត្រូវរកមើលកម្មវិធីណាដែលមិនស្ថិតក្នុងបញ្ជីគោល
        const isMainEvent = mainEventTypes.some(mainType => eventName.includes(mainType.toLowerCase()));
        if (isMainEvent) return false;
      } else {
        // ស្វែងរកតាមឈ្មោះកម្មវិធីដែលបានរើស
        if (!eventName.includes(selectedEventType.value.toLowerCase())) return false;
      }
    }

    // 3. Date Filter
    const itemDateStr = new Date(item.event_date).toISOString().split('T')[0];
    const itemYear = itemDateStr.substring(0, 4);
    const itemMonth = itemDateStr.substring(0, 7);

    if (filterType.value === 'day' && filterDate.value) {
      return itemDateStr === filterDate.value;
    }
    if (filterType.value === 'month' && filterMonth.value) {
      return itemMonth === filterMonth.value;
    }
    if (filterType.value === 'year' && filterYear.value) {
      return itemYear === String(filterYear.value);
    }
    if (filterType.value === 'range' && filterStartDate.value && filterEndDate.value) {
      return itemDateStr >= filterStartDate.value && itemDateStr <= filterEndDate.value;
    }

    return true;
  });
});

const paginatedData = computed(() => {
  return filteredData.value.slice(0, displayLimit.value);
});

const totalUSD = computed(() => {
  return filteredData.value.filter(i => i.currency === 'USD').reduce((sum, i) => sum + parseFloat(i.amount), 0);
});
const totalKHR = computed(() => {
  return filteredData.value.filter(i => i.currency === 'KHR').reduce((sum, i) => sum + parseFloat(i.amount), 0);
});

const formatCurrency = (amount, currency) => {
  if (currency === 'USD') {
    return parseFloat(amount).toFixed(2);
  } else {
    return new Intl.NumberFormat('en-US').format(amount);
  }
};

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

// PDF Export function
const exportToPDF = async () => {
  if (filteredData.value.length === 0) {
    toast.warning("មិនមានទិន្នន័យសម្រាប់ Export ទេ!");
    return;
  }
  
  isExporting.value = true;
  toast.info("កំពុងរៀបចំឯកសារ PDF...", { timeout: 2000 });

  try {
    const element = document.getElementById('pdf-report-content');
    if (!element) throw new Error("មិនឃើញទម្រង់ Report!");

    const opt = {
      margin:       0.4,
      filename:     `Report_SaveWedding_${new Date().getTime()}.pdf`,
      image:        { type: 'jpeg', quality: 1 },
      html2canvas:  { scale: 2, useCORS: true, windowWidth: 800 },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    await html2pdf().set(opt).from(element).save();
    toast.success("ទាញយក PDF បានជោគជ័យ! 📄");
    
  } catch (error) {
    console.error("PDF Export Error: ", error);
    toast.error("មានបញ្ហាក្នុងការទាញយក! សូមព្យាយាមម្តងទៀត។");
  } finally {
    isExporting.value = false;
  }
};

const prepareDelete = (id) => {
  itemToDeleteId.value = id;
  showDeleteModal.value = true;
};

const finalizeDelete = async () => {
  if (!itemToDeleteId.value) return;
  try {
    await axios.delete(`${API_URL}/contributions/${itemToDeleteId.value}`);
    toast.success("បានលុបជោគជ័យ! 🗑️", { timeout: 2000 });
    fetchContributions();
  } catch (error) {
    toast.error("មានបញ្ហាក្នុងការលុប!");
  } finally {
    showDeleteModal.value = false;
    itemToDeleteId.value = null;
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&display=swap');

* {
  font-family: 'Kantumruy Pro', sans-serif;
}
.custom-date-input::-webkit-calendar-picker-indicator {
  cursor: pointer;
  opacity: 0.6;
  transition: 0.2s;
}
.custom-date-input::-webkit-calendar-picker-indicator:hover {
  opacity: 1;
}

/* 🌟 Hide scrollbar for chrome/safari/edge */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
/* 🌟 Hide scrollbar for firefox */
.hide-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>