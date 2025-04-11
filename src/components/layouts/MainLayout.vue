<template>
  <div>
    <Toast position="bottom-right" group="br" />
    <main-menu></main-menu>
    <div class="pb-[50px]">
      <RouterView></RouterView>
    </div>
    <bottom-menu/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import MainMenu from '../menus/MainMenu.vue';
import { contentStore } from '@/stores/contentStore';
import { authStore } from '@/stores/authStore';
import { siteStore } from '@/stores/SiteStore';
import BottomMenu from '../menus/BottomMenu.vue';
export default{
  components: { MainMenu, BottomMenu },
  name: "MainLayout",
  data(){
      return {
          eventController : false,
      }
  },
  methods:{
    ...mapActions(siteStore,{getData:'getSiteInfo'}),
    ...mapActions(contentStore, {getContent:'getContent'}),
    ...mapActions(authStore, {getAuth: 'authUser'}),
      sideBarController(event){
          this.eventController = event;
      }
  },
  created(){
    this.getData();
    this.getAuth();
  },
  mounted(){
    this.getContent();
  }
}
</script>
