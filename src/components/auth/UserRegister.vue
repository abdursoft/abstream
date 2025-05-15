<template>
  <Toast group="br" position="bottom-right" />
  <!-- registration form start  -->
  <div
    class="w-screen relative overflow-hidden back-animation min-h-screen bg-overlay-back flex items-center justify-center p-2"
    :style="siteData?.auth_image !== '' ? `background:url('${siteData?.auth_image}')` : 'background:rgba(0,0,0,.8)'">
    <div
      class="w-full md:w-2/6 lg:w-2/8 flex flex-col-reverse md:flex-row items-center justify-between rounded-[11px] p-4 shadow-2xl bg-slate-900 text-white">
      <div class="w-full px-7 py-20 relative">
       <div class="w-1/4 flex items-center gap-1 mb-3">
        <router-link class="flex items-center" to="/">
          <Icon icon="proicons:arrow-left" class="min-w-[30px] min-h-[40px]" /> {{ $t('button.back') }}
        </router-link>
       </div>
        <template v-if="!isSignup">
          <template v-if="!registerNext">
            <TextInput :label="$t('form.username')" v-model="registerForm.name" :placeholder="$t('form.username')" />
            <TextInput :label="$t('form.email')" v-model="registerForm.email" :placeholder="$t('form.email')" />
            <div class="my-2 px-1">
              <vue-tel-input @input="onInput"></vue-tel-input>
              <small v-if="!isPhoneValid" class="text-red-500">{{ $t('invalidPhone') }}</small>
            </div>
          </template>
          <template v-if="registerNext">
            <TextInput :label="$t('form.birthday')" type="date" v-model="registerForm.birthday"
              :placeholder="$t('form.birthday')" />
            <TextInput :label="$t('form.referCode')" v-model="registerForm.refer" :placeholder="$t('form.referCode')" />
            <TextInput :label="$t('form.password')" type="password" v-model="registerForm.password"
              :placeholder="$t('form.password')" />
          </template>

          <div class="flex flex-col md:flex-row items-center justify-between gap-3">
            <TextButton :class="registerNext ? 'w-full md:max-w-[120px] bg-color-secondary' : ''"
              :background="btnBackground" @click="nextChange(registerNext)"
              :title="registerNext ? $t('button.previous') : $t('button.next')" />
            <TextButton v-if="registerNext" :loading="isLoader" @click="formSubmit()" :title="$t('button.signUp')" />
          </div>
          <p class="mt-[20px] text-center text-md">{{ $t('form.alreadyHaveAnAccount') }} <router-link
              class="font-fold text-cyan-800" to="/signin">{{ $t('button.signIn') }}</router-link></p>
        </template>
        <template v-if="isSignup">
          <div class="p-[30px] flex items-center justify-center flex-col gap-[20px]">
            <h3 class="text-xl mb-2">{{ $t('verifyOtp') }}</h3>
            <InputOtp v-model="otp" />
            <TextButton :loading="isLoader" @click="otpVerify()" :title="$t('button.verify')" />
          </div>
        </template>
      </div>
    </div>
  </div>
  <!-- registration form end  -->
</template>

<script>
import TextInput from '@/components/global/TextInput.vue';
import TextButton from '@/components/global/TextButton.vue';
import router from '@/router';
import { authStore } from '@/stores/authStore';
import { siteStore } from '@/stores/SiteStore';
import { Icon } from '@iconify/vue';
import { mapActions, mapState } from 'pinia';
import { InputOtp } from 'primevue';

export default {
  name: 'UserRegister',
  components: { TextInput, TextButton, Icon, InputOtp },
  data() {
    return {
      registerForm: {
        email: null,
        phone: null,
        birthday: null,
        refer: null,
        name: null,
        password: null
      },
      isSignup: false,
      otp: "",
      isPhoneValid: false,
      registerNext: false,
      btnBackground: "bg-cyan-600 hover:bg-red-400 duration-[500ms]"
    }
  },
  methods: {
    ...mapActions(siteStore, { getSiteData: 'getSiteInfo' }),
    ...mapActions(authStore, { register: 'registerUser', signupOTPVerify: 'signupOTPVerify' }),
    async formSubmit() {
      const res = await this.register(this.registerForm);
      if (res.status === 201) {
        localStorage.setItem('otpToken', res.data.otpToken);
        this.isSignup = true;
        this.$toast.add({severity:'success', summary:'Success',detail:res.data?.message, life:3000, group:'br'});
      } else {
        this.$toast.add({severity:'error', summary:'Input error',detail:res.response.data?.message, life:3000, group:'br'});
      }
    },
    nextChange(status) {
      if (status === false) {
        this.btnBackground = "bg-red-500 text-white hover:bg-cyan-600 duration-[500ms]";
        this.registerNext = true;
      } else {
        this.btnBackground = "bg-cyan-600 hover:bg-red-400 duration-[500ms]";
        this.registerNext = false;
      }
    },
    onInput(number, phoneObject) {
      if (phoneObject?.valid === true) {
        this.isPhoneValid = true;
        this.registerForm.phone = phoneObject.number
      } else {
        this.isPhoneValid = false;
      }
    },
    async otpVerify() {
      const res = await this.signupOTPVerify({ otp: this.otp });
      if (res.status === 200) {
        localStorage.removeItem('otpToken');
        this.$toast.add({severity:'success',detail:res.data?.code, life:3000, group:'br'});
        router.push({ name: "signin" })
      } else {
        this.$toast.add({severity:'error',detail:res.response.data?.message, life:3000, group:'br'});
      }
    }
  },
  computed: {
    ...mapState(authStore, ['isAuth']),
    ...mapState(siteStore, ['isLoader', 'myTheme', 'siteData'])
  },
  created() {
    this.getSiteData();
    if (this.isAuth) {
      router.push({ name: 'home' })
    }
  }
}
</script>
