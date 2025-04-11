<template>
  <Toast group="br" position="bottom-right" />
  <!-- password forgot page start  -->
  <div class="px-3 py-2 md:py-0 w-screen min-h-screen flex justify-center items-center">
    <div
      class="w-full md:w-2/5 flex flex-col-reverse md:flex-row items-center justify-between rounded-[11px] p-4 shadow-2xl"
      :class="{ 'bg-slate-900': myTheme }">
      <div class="w-full px-3 md:px-7 py-20 relative" v-if="!verifyToken && !passwordToken">
        <div class="card">
          <div class="text-3xl mb-2 font-fold"></div>
          <TextInput :label="$t('form.email')" v-model="passwordForm.email" :placeholder="$t('form.email')" />
          <TextButton @click="sendCode" :title="$t('button.next')" />
          <p class="mt-[20px] text-center text-md">{{ $t('form.alreadyHaveAnAccount') }} <router-link
              class="font-fold text-cyan-800" to="/signin">{{ $t('button.signIn') }}</router-link></p>
        </div>
      </div>
      <OTPVerify />
      <new-password />
    </div>
  </div>
  <!-- password forgot page end  -->
</template>

<script>
import TextInput from '@/components/global/TextInput.vue';
import TextButton from '@/components/global/TextButton.vue';
import { mapActions, mapState } from 'pinia';
import { Icon } from '@iconify/vue';
import { authStore } from '@/stores/authStore';
import { siteStore } from '@/stores/SiteStore';
import OTPVerify from '@/components/password/OTPVerify.vue';
import NewPassword from '@/components/password/NewPassword.vue';

export default {
  name: 'PasswordForgot',
  components: { TextInput, TextButton, Icon, OTPVerify, NewPassword },
  data() {
    return {
      passwordForm: {
        email: ""
      }
    }
  },
  methods: {
    ...mapActions(authStore, { sendOTP: 'sendPasswordOTP' }),
    async sendCode() {
      const res = await this.sendOTP(this.passwordForm);
      if (res.status === 200) {
        this.$toast.add({ severity: 'success', summary: 'Success', detail: res.data.message, life: 3000, group: 'br' });
      } else {
        this.$toast.add({ severity: 'error', summary: 'Failed', detail: res.response.data.message, life: 3000, group: 'br' });
      }
    }
  },
  computed: {
    ...mapState(siteStore, ['myTheme']),
    ...mapState(authStore, ['passwordToken', 'verifyToken'])
  },
  created() {

  }
}
</script>
