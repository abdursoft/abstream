<template>
  <!-- main menu start  -->
  <div class="flex items-center justify-between md:justify-start gap-2 md:gap-5 fixed z-[11] top-0 h-[58px] w-full p-3 md:p-5"
    :style="(headerClass | activeHeader) ? 'background:'+siteData?.header_color+';' : ''"
    :class="'radial-background' ?? (headerClass | activeHeader)">
    <div class="flex items-center justify-between md:justify-start gap-2 md:gap-5 w-[40] md:w-3/4">
      <!-- Logo section start  -->
       <div class="w-full max-w-[150px]" v-if="!siteData">
        <skeleton-genre items="1"></skeleton-genre>
       </div>
      <div v-else>
        <img :src="siteData?.primary_logo" :alt="siteData?.site_title" class="hidden md:block w-[110px] h-[31px] cursor-pointer" @click="$router.push({name:'home'})">
        <img :src="siteData?.mobile_logo" :alt="siteData?.site_title" class="w-[50px] h-[31px] md:hidden cursor-pointer" @click="$router.push({name:'home'})">
      </div>
      <!-- Logo section end  -->

      <!-- menu nav links start  -->
      <div class="hidden md:flex items-center justify-end gap-3 text-white uppercase">
        <router-link :class="{ 'text-[var(--dark-primary-500)]': $route.name === 'home' }" to="/home">{{ $t('menu.home') }}</router-link>
        <router-link :class="{ 'text-[var(--dark-primary-500)]': $route.name === 'liveTv' }" to="/live-tv">{{ $t('menu.tv') }}</router-link>
        <router-link :class="{ 'text-[var(--dark-primary-500)]': $route.name === 'subscribe' }" :to="{ name: 'subscribe' }">{{
          $t('menu.subscribe') }}</router-link>
        <router-link :class="{ 'text-[var(--dark-primary-500)]': $route.name === 'tvShows' }" to="/tv-shows">{{ $t('menu.tvShow') }}</router-link>
      </div>
      <!-- menu nav links end  -->
    </div>
    <div class="grow flex items-center justify-end gap-2 px-2">
      <!-- user auth section start  -->
      <div class="flex items-center justify-end gap-3 text-white uppercase">
        <Button v-if="isAuth" @click="logout()" class="!py-2 !text-white !line-clamp-1 !bg-[--dark-primary-700]">{{ $t('button.signOut')
          }}</Button>
        <Button as="router-link" v-else to="/signin" class="!py-2 !text-white !bg-[--dark-primary-700]">{{ $t('button.signIn')
          }}</Button>
      </div>
      <!-- user auth section end  -->
      <!-- theme control start  -->
      <div class="flex items-center gap-2">
        <Button v-if="myTheme" @click="toggleDarkMode()" class="!bg-transparent !p-1">
          <Icon icon="line-md:moon-to-sunny-outline-transition" class="text-white" width="24" height="24" />
        </Button>
        <Button v-else @click="toggleDarkMode()" class="!bg-transparent !p-1">
          <Icon icon="line-md:moon-rising-alt-loop" width="24" class="text-white" height="24" />
        </Button>
      </div>
      <!-- theme control end  -->
      <profile-menu v-if="isAuth" />
      <language-menu color="text-white" />
      <!-- large device search action start  -->
      <SearchMenu />
      <!-- large device search action end  -->
    </div>
  </div>
  <!-- main menu end  -->
</template>

<script>
import { authStore } from '@/stores/authStore';
import { siteStore } from '@/stores/SiteStore';
import { Icon } from '@iconify/vue';
import { mapActions, mapState } from 'pinia';
import ProfileMenu from './ProfileMenu.vue';
import LanguageMenu from './LanguageMenu.vue';
import SearchMenu from './searchMenu.vue';
import { siteData } from '@/server/api/apiRoutes';

export default {
  name: "MainMenu",
  data() {
    return {
      theme: false,
      headerClass: false,
      bottomMenu: false,
      fixedClass:'',
    }
  },
  components: { Icon, ProfileMenu, LanguageMenu, SearchMenu },
  methods: {
    ...mapActions(siteStore, { setHeader: 'activeHeader', setTheme: 'setTheme', setBack: 'setBackToTop' }),
    ...mapActions(authStore, { logout: 'logout' }),
    handleScroll() {
      if (window.pageYOffset > 50) {
        this.setBack(true);
        this.headerClass = true;
      } else {
        this.setBack(false);
        this.headerClass = false;
      }
    },
    fixedHeader(){
      if (window.pageYOffset > 100) {
        this.fixedClass = 'fixed z-[11] top-0';
      } else {
        this.fixedClass = '';
      }
    },
    toggleDarkMode() {
      this.theme = !this.theme;
      this.setTheme(this.theme);
      document.documentElement.classList.toggle('myApp');
    },
    newTheme() {
      this.theme = this.myTheme;
    }
  },
  computed: {
    ...mapState(siteStore, ['activeHeader', 'myTheme', 'siteData','isLoader']),
    ...mapState(authStore, ['isAuth'])
  },
  created() {
    this.newTheme();
    const themeLoader = setInterval(() => {
      if (this.siteData?.site_theme) {
        clearInterval(themeLoader);
        this.theme = true;
        this.setTheme(this.theme);
        document.documentElement.classList.add('myApp');
      }
    }, 1000);
  },
  mounted() {
    window.addEventListener('scroll', (e) => {
      this.handleScroll();
    });
  },
}
</script>
