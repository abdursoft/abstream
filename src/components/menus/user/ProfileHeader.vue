<template>
  <!-- user profile menu start  -->
  <div class="flex items-center justify-between h-[48px] w-full p-3 md:p-5 bg-surface-800 shadow-md" :class="{'bg-slate-900':myTheme}">
    <div class="flex items-center justify-start gap-5 w-1/3">
      <img :src="siteData?.secondary_logo" :alt="siteData?.site_title" class="w-[110px] h-[31px]">
      <div class="flex items-center justify-end gap-3 uppercase">
        <router-link class="text-black-600" to="/home">{{ $t('menu.home') }}</router-link>
        <router-link class="text-black-600 line-clamp-1" to="/live-tv">{{ $t('menu.tv') }}</router-link>
      </div>
    </div>
    <div class="w-full flex items-center justify-end gap-2 px-2">
      <div class="flex items-center justify-end gap-3 text-white uppercase">
        <Button v-if="isAuth" severity="danger" @click="logout()" class="!py-1 !text-white">{{ $t('button.signOut') }}</Button>
      </div>
      <div class="flex items-center gap-2">
        <Button v-if="theme" @click="toggleDarkMode()" class="!bg-transparent !p-1">
            <Icon icon="line-md:moon-to-sunny-outline-transition" class="text-white" width="24" height="24" />
        </Button>
        <Button v-else @click="toggleDarkMode()" class="!bg-transparent !p-1">
            <Icon icon="line-md:moon-rising-alt-loop" width="24" class="text-black-400" height="24" />
        </Button>
      </div>
      <language-menu color="text-teal-600" />
    </div>
  </div>
  <!-- user profile menu end  -->
</template>

<script>
import { authStore } from '@/stores/authStore';
import { siteStore } from '@/stores/SiteStore';
import { Icon } from '@iconify/vue';
import { mapActions, mapState } from 'pinia';
import LanguageMenu from '../LanguageMenu.vue';

export default{
  name: "ProfileHeader",
  data(){
    return {
      theme: false,
    }
  },
  components:{Icon,LanguageMenu},
  methods:{
    ...mapActions(siteStore, {setHeader: 'activeHeader',setTheme: 'setTheme'}),
    ...mapActions(authStore, {logout:'logout'}),
    toggleDarkMode(){
        this.theme = !this.theme;
        this.setTheme(this.theme);
        document.documentElement.classList.toggle('myApp');
    },
    newTheme(){
      this.theme = this.myTheme;
    }
  },
  computed:{
    ...mapState(siteStore, ['activeHeader','myTheme','siteData']),
    ...mapState(authStore, ['isAuth'])
  },
  created(){
    this.newTheme();
  }
}
</script>
