import { createRouter, createWebHistory } from 'vue-router'

// ទីតាំង Folder ថ្មីដែលបានរៀបចំ
import LoginView from '../views/auth/LoginView.vue'
import DashboardView from '../views/user/DashboardView.vue'
import AddContributionView from '../views/user/AddContributionView.vue'
import EditContributionView from '../views/user/EditContributionView.vue' // 🌟 បានបន្ថែមការទាញយក File ទំព័រកែប្រែ
import ManageUsersView from '../views/owner/ManageUsersView.vue'
import ProfileView from '../views/user/ProfileView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', name: 'login', component: LoginView },
    
    // ផ្លូវសម្រាប់ User
    { path: '/', name: 'home', component: DashboardView, meta: { requiresAuth: true, role: 'user' } },
    { path: '/add', name: 'add', component: AddContributionView, meta: { requiresAuth: true, role: 'user' } },
    { path: '/edit/:id', name: 'edit', component: EditContributionView, meta: { requiresAuth: true, role: 'user' } },
    {path: '/profile',name: 'profile',component: ProfileView} ,
    // ផ្លូវសម្រាប់ Owner
    { path: '/users', name: 'users', component: ManageUsersView, meta: { requiresAuth: true, role: 'owner' } }
  ]
})

// Navigation Guard (អ្នកយាមទ្វារ)
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = localStorage.getItem('userRole');

  if (to.meta.requiresAuth && !isAuthenticated) {
    // មិនទាន់ Login បោះទៅ /login
    next('/login');
  } else if (to.name === 'login' && isAuthenticated) {
    // Login រួចហើយ តែចង់ទៅទំព័រ /login ទៀត
    if (userRole === 'owner') next('/users');
    else next('/');
  } else if (to.meta.role && to.meta.role !== userRole) {
    // បើចូលខុសសិទ្ធិ (ឧទាហរណ៍ Owner ទៅចូលទំព័រ User ឬ User ទៅចូលទំព័រ Owner)
    if (userRole === 'owner') next('/users'); // Owner បោះទៅទំព័រគ្រប់គ្រង
    else next('/'); // User បោះទៅទំព័រដើម
  } else {
    // អនុញ្ញាតឱ្យចូល
    next();
  }
})

export default router