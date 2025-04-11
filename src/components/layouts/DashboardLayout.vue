<template>
  <div>
    <Toast position="bottom-right" group="br" />
    <div class="w-full h-full flex flex-col items-center justify-center md:py-[100px]">
      <div class="flex w-full flex-col gap-5 container">
        <profile-header></profile-header>
        <div class="w-full flex flex-col md:flex-row gap-5">
          <profile-card class="w-1/3"></profile-card>
          <RouterView></RouterView>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import { authStore } from '@/stores/authStore';
import ProfileCard from '../cards/ProfileCard.vue';
import ProfileHeader from '../menus/user/ProfileHeader.vue';
export default{
  components: {ProfileCard, ProfileHeader },
  name: "DashboardLayout",
  data(){
      return {
          eventController : false,
      }
  },
  methods:{
    ...mapActions(authStore, {getAuth: 'authUser'}),
      sideBarController(event){
          this.eventController = event;
      }
  },
  created(){
    this.getAuth();
  }
}
</script>
