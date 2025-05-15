<template>
  <Toast group="br" position="bottom-right" />
  <!-- login form start  -->
  <div
    class="w-screen relative overflow-hidden back-animation min-h-screen bg-overlay-back flex items-center justify-center p-2"
    :style="siteData?.auth_image !== '' ? `background:url('${siteData?.auth_image}')` : 'background:rgba(0,0,0,.8)'">
    <div
      class="w-full md:w-2/6 lg:w-2/8 flex flex-col-reverse md:flex-row items-center justify-between rounded-[11px] p-4 shadow-2xl bg-slate-900 text-white">
      <div class="w-full px-3 md:px-7 py-20 relative">
        <div class="card">
          <div class="flex w-full items-center justify-between mb-[20px]" to="/">
            <div class="w-1/4 flex items-center gap-1"><router-link class="flex items-center" to="/">
                <Icon icon="proicons:arrow-left" class="min-w-[30px] min-h-[40px]" />{{ $t('button.back') }}
              </router-link></div>
            <p
              class="hidden md:flex w-full items-center justify-center text-sm border border-black-300 p-1 rounded-[19px] max-w-[200px] text-center">
              {{ siteData?.site_title }}</p>
          </div>
          <!-- <h1 class="text-xl md:text-2xl font-bold text-center font-700">{{ $t('welcomeBack') }} {{ siteData?.site_name
            }}</h1> -->
          <div class="text-3xl mb-2 font-fold"></div>
          <TextInput :label="$t('form.phone')" v-model="loginForm.phone" :placeholder="$t('form.phone')" />
          <TextInput :label="$t('form.password')" type="password" v-model="loginForm.password"
            :placeholder="$t('form.password')" />
          <div class="flex items-center justify-end px-1">
            <router-link class="my-1" :to="{ name: 'forgot' }">{{ $t('form.forgotPassword') }}</router-link>
          </div>
          <TextButton @click="formSubmit()" :title="$t('button.signIn')" />
          <p class="mt-[20px] text-center text-md">{{ $t('form.alreadyHaveAnAccount') }} <router-link
            class="font-fold text-cyan-800" to="/signup">{{ $t('button.signUp') }}</router-link></p>
        </div>
      </div>
    </div>
  </div>
  <!-- login form end  -->
</template>

<script>
import TextInput from '@/components/global/TextInput.vue';
import TextButton from '@/components/global/TextButton.vue';
import { mapActions, mapState } from 'pinia';
import { Icon } from '@iconify/vue';
import router from '@/router';
import { authStore } from '@/stores/authStore';
import { siteStore } from '@/stores/SiteStore';


export default {
  name: 'UserLogin',
  components: { TextInput, TextButton, Icon },
  data() {
    return {
      loginForm: {
        phone: null,
        password: null
      }
    }
  },
  methods: {
    ...mapActions(authStore, { login: 'loginUser', authCheck: 'authUser' }),
    ...mapActions(siteStore, { getSiteInfo: 'getSiteInfo' }),
    async formSubmit() {
      const response = await this.login(this.loginForm);
      if (response.status === 200) {
        localStorage.setItem('authToken', response.data.token);
        router.push({ name: 'home' });
        this.$toast.add({ severity: 'success', summary: 'Success', detail: this.$t(`response.${response.data.code}`), life: 3000, group: 'br' });
      } else {
        this.$toast.add({ severity: 'error', summary: 'Failed', detail: this.$t(`response.${response.response.data.code}`), life: 3000, group: 'br' });
      }
    },
    async isLogin() {
      const auth = await this.authCheck();
      if(auth.status === 200){
        if (this.isAuth) {
          router.push({name:'home'});
        }
      }
    }
  },
  computed: {
    ...mapState(authStore, ['isAuth']),
    ...mapState(siteStore, ['siteData', 'myTheme'])
  },
  created() {
    this.getSiteInfo();
    this.isLogin();
  }
}
</script>
