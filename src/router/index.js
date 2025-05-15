import { authStore } from '@/stores/authStore';
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../components/layouts/MainLayout.vue'),
    redirect: 'home',
    children:[
      {
        path: '/home',
        name: 'home',
        meta: {title: "Welcome to Home"},
        component: () => import('../views/HomeView.vue'),
      },
      {
        path: '/contents/:content/:type?',
        name: 'contents',
        meta: {title: "Watching ABStream video"},
        component: () => import('../views/ContentPage.vue'),
      },
      {
        path: '/search',
        name: 'search',
        meta: {title: "Searching"},
        component: () => import('../views/SearchContent.vue'),
      },
      {
        path: '/live-tv',
        name: 'liveTv',
        meta: {title: "Watch live tv"},
        component: () => import('../views/LiveTv.vue'),
      },
      {
        path: '/tv/:id/:title?',
        name: 'tv',
        meta: {title: "Watching Live Tv"},
        component: () => import('../views/player/TvView.vue'),
      },
      {
        path: '/watch/:type/:id/:title?/',
        name: 'watch',
        meta: {title: "Watching ABStream video"},
        component: () => import('../views/player/PlayerView.vue'),
      },
      {
        path: '/tv-shows',
        name: 'tvShows',
        meta: {title: "Online TV Shows"},
        component: () => import('../views/TvShows.vue'),
      },
      {
        path: '/episodes/:id',
        name: 'episodeList',
        meta: {title: "List of episodes"},
        component: () => import('../views/EpisodeList.vue'),
      },
      {
        path: '/subscribe',
        name: 'subscribe',
        meta: {title: "Choose a subscription"},
        component: () => import('../views/UserSubscription.vue'),
      },
      {
        path: '/page',
        name: 'page',
        meta: {title: "Dynamic Page"},
        component: () => import('../views/pages/PageView.vue'),
      },
      {
        path: '/contact-us',
        name: 'contactUs',
        meta: {title: "Contact US"},
        component: () => import('../views/pages/ContactUs.vue'),
      }
    ],
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../components/layouts/DashboardLayout.vue'),
    redirect: 'profile',
    children:[
      {
        path: '/user/profile',
        name: 'profile',
        meta: {title: "User Dashboard", isAuth:true},
        component: () => import('../views/user/ProfilePage.vue'),
      },
      {
        path: '/user/history',
        name: 'history',
        meta: {title: "User History", isAuth:true},
        component: () => import('../views/user/HistoryPage.vue'),
      },
      {
        path: '/user/favorite',
        name: 'favorite',
        meta: {title: "User Favorite List", isAuth:true},
        component: () => import('../views/user/FavoritePage.vue'),
      },
      {
        path: '/user/update',
        name: 'update',
        meta: {title: "User Updates", isAuth:true},
        component: () => import('../views/user/UpdatePage.vue'),
      },
      {
        path: '/user/setting',
        name: 'setting',
        meta: {title: "User Settings", isAuth:true},
        component: () => import('../views/user/SettingPage.vue'),
      },
      {
        path: '/user/billing',
        name: 'billing',
        meta: {title: "User Billing", isAuth:true},
        component: () => import('../views/user/BillingPage.vue'),
      },
      {
        path: '/user/subscription',
        name: 'subscription',
        meta: {title: "User Subscription", isAuth:true},
        component: () => import('../views/user/SubscriptionPage.vue'),
      },
    ],
  },
  {
    path: '/signin',
    name: 'signin',
    meta: {title: "Get signin for better experience"},
    component: () => import('../components/auth/UserLogin.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    meta: {title: "Get signup for better experience"},
    component: () => import('../components/auth/UserRegister.vue'),
  },
  {
    path: '/forgot-password',
    name: 'forgot',
    meta: {title: "Forgot your password"},
    component: () => import('../views/password/PasswordForgot.vue'),
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  const authCheck = authStore();

  if ((to.path !== '/signin' && authCheck['isAuth'] === false) && to.meta.isAuth) {
    next({ path: '/signin' })
  } else if (to.path === '/signin' && authCheck.isAuth === 'true') {
    next({ name: 'home' })
  } else {
    next()
  }
});

export default router
