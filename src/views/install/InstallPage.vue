<template>
  <Toast group="br" position="bottom-right" />
  <!-- password forgot page start  -->
  <div class="px-3 py-2 md:py-0 w-screen min-h-screen flex justify-center items-center">
    <div
      class="w-full md:w-1/3 lg:w-2/6 flex flex-col-reverse md:flex-row items-center justify-between rounded-[11px] p-4 shadow-2xl"
      :class="{ 'bg-slate-900 text-white': myTheme }">
      <div class="w-full px-3 md:px-7 py-20 relative">
        <div class="card">
          <div class="text-3xl mb-2 font-fold"></div>
          <TextInput v-model="host" placeholder="https://domain.com" label="Put your api server address" />
          <TextButton @click="completeInstallation" title="Install" />
        </div>
      </div>
    </div>
  </div>
  <!-- password forgot page end  -->
</template>

<script>
import TextButton from '@/components/global/TextButton.vue';
import TextInput from '@/components/global/TextInput.vue';
import { Toast } from 'primevue';
import { mapState } from 'pinia';
import { siteStore } from '@/stores/SiteStore';
import axios from 'axios';
import router from '@/router';
import install from '@/install';

export default {
  data() {
    return {
      step: 1,
      host: '',
    }
  },
  components: {
    Toast, TextButton, TextInput
  },
  methods: {
    nextStep() {
      this.step++
    },
    async completeInstallation() {
      try {
        await axios.post(`http://${window.location.hostname}:5000/install-setup`,{host:this.host});
        router.push('/')
      } catch (error) {
        console.log(error);
      }
    }
  },
  computed:{
    ...mapState(siteStore,['myTheme'])
  },
  created(){
    console.log(install.installed);
    if(install.installed){
      router.push('/');
    }
  }
}
</script>
