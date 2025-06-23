<template>
  <div>
    <div
      class="w-full h-[58px] flex items-center justify-between md:hidden fixed bottom-0 bg-slate-800 text-white z-[11]">
      <!-- bottom mobile menu start  -->
      <router-link class="flex items-center justify-center flex-col h-full px-3"
        :class="{ 'bg-slate-900': $route.name === 'home' }" :to="{ name: 'home' }">
        <Icon icon="hugeicons:home-04" width="24" height="24" />
        <small class="line-clamp-1">{{ $t('menu.home') }}</small>
      </router-link>
      <router-link class="flex items-center justify-center flex-col px-3 h-full" :to="{ name: 'history' }">
        <Icon icon="octicon:history-24" width="24" height="24" />
        <small class="line-clamp-1">{{ $t('menu.history') }}</small>
      </router-link>
      <div class="flex items-center justify-center flex-col h-full cursor-pointer" @click="search = !search">
        <Icon icon="clarity:search-line" width="30" height="30" />
        <small class="line-clamp-1">{{ $t('menu.search') }}</small>
      </div>
      <router-link class="flex items-center justify-center flex-col px-3 h-full"
        :class="{ 'bg-slate-900': $route.name === 'liveTv' }" :to="{ name: 'liveTv' }">
        <Icon icon="hugeicons:modern-tv" width="24" height="24" />
        <small class="line-clamp-1">{{ $t('menu.tv') }}</small>
      </router-link>
      <div class="flex items-center justify-center flex-col px-3 h-full cursor-pointer" @click="drawer = !drawer">
        <Icon icon="material-symbols-light:more-outline" width="34" height="34" />
        <small class="line-clamp-1">{{ $t('menu.more') }}</small>
      </div>
    </div>
    <!-- bottom mobile menu end  -->

    <div class="w-full" v-if="$props.textMenu">
      <footer-view />
      <!-- copyright section start  -->
      <div class="hidden md:flex w-full h-[48px] items-center justify-around bg-slate-800 text-white relative">
        <p class="font-300 text-center">{{ copyRight() }}</p>
        <p class="my-1 cursor-pointer hover:text-red-500 w-auto">Version 1.0.0</p>
      </div>
      <!-- copyright section end  -->
    </div>

    <bottom-drawer :isDrawer="drawer" v-on:changeDrawer="toggleDrawer" />
    <search-drawer :isDrawer="search" v-on:changeDrawer="toggleSearch" />
    <!-- back to top button start  -->

    <span class="fixed right-[10px] md:right-[30px] bottom-[58px] md:bottom-[19px] !z-[5] text-[var(--dark-primary-500)] cursor-pointer"
      v-if="backToTop">
      <Icon icon="cil:arrow-circle-top" @click="backToUP" class="w-[35px] h-[35px]" />
    </span>
    <!-- back to top button end  -->
  </div>
</template>

<script>
import { authStore } from '@/stores/authStore';
import { siteStore } from '@/stores/SiteStore';
import { Icon } from '@iconify/vue';
import { mapActions, mapState } from 'pinia';
import BottomDrawer from '../modal/BottomDrawer.vue';
import SearchDrawer from '../modal/SearchDrawer.vue';
import FooterView from '../footers/FooterView.vue';

export default {
  name: 'BottomMenu',
  components: { Icon, BottomDrawer, SearchDrawer, FooterView },
  props: {
    textMenu: {
      Boolean,
      default: true
    }
  },
  data() {
    return {
      drawer: false,
      search: false,
      isUp: true,
    }
  },
  methods: {
    ...mapActions(siteStore, { setBack: 'setBackToTop' }),
    toggleDrawer(event) {
      this.drawer = event;
    },
    toggleSearch(event) {
      this.search = event;
    },
    backToUP() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
    copyRight() {
      const date = new Date();
      return `${this.$t('copyright')}@${date.getFullYear()} ${document.location.hostname}`;
    }
  },
  computed: {
    ...mapState(authStore, ['isAuth']),
    ...mapState(siteStore, ['siteData', 'hideFooter', 'backToTop'])
  },
  created() {
    this.copyRight();
  }
}
</script>
