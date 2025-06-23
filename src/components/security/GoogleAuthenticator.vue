<template>
  <!-- google 2fa authentication start -->
  <div class="flex items-center w-full py-[20px]">
    <div class="w-full">
      <div class="flex items-center gap-2 md:pt-[50px]">
        <p>Enable 2FA authentication</p>
        <ToggleSwitch v-model="checked" />
      </div>
      <div class="w-full p-3 mt-[40px] flex justify-center flex-col md:flex-row gap-5" v-if="checked">
        <div class="text-center flex items-center justify-center flex-col gap-2" v-if="google2Fa">
          <span v-html="google2Fa.qr_code"></span>
          <small>Scan the QR Code with an authenticator APP</small>
        </div>
        <div class="w-full flex-col items-center justify-center pt-5">
          <TextInput label="Enter the OTP" type="text" v-model="otpForm.otp"
            placeholder="6 digit otp from authenticator app" />
          <div class="flex items-center justify-between gap-3 flex-col md:flex-row mt-3">
            <TextButton @click="formSubmit()" title="Verify" class="bg-cyan-600 hover:bg-teal-700 duration-[500ms]" />
            <TextButton v-if="user.google2fa_secret" @click="disabled2Fa()" title="Disabled"
              class="bg-red-500 text-white hover:bg-cyan-600 duration-[500ms]" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- google 2fa authentication end  -->
</template>

<script>
import { mapActions, mapState } from 'pinia';
import TextButton from '../global/TextButton.vue';
import TextInput from '../global/TextInput.vue';
import { authStore } from '@/stores/authStore';

export default {
  name: 'Google2Fa',
  components: { TextInput, TextButton },
  props:{
    checkEnable:{
      Boolean,
      default: false,
      required:true,
    }
  },
  data() {
    return {
      checked: false,
      otpForm: {
        otp: null,
        secret: null,
      }
    }
  },
  methods: {
    ...mapActions(authStore, { getFa: 'get2faSecret', verifyFa: 'verify2faSecret', removeFa: 'remove2faAuth' }),
    async setData() {
      const res = await this.getFa();
      if (res.status === 200) {
        this.otpForm.secret = this.google2Fa.secret;
      }
    },
    async formSubmit() {
      const response = await this.verifyFa(this.otpForm);
      if (response.status === 200) {
        this.$toast.add({ severity: 'success', summary: 'Success', detail: response.data.message, life: 3000, group: 'br' });
      } else {
        this.$toast.add({ severity: 'error', summary: 'Failed', detail: response.response.data.message, life: 3000, group: 'br' });
      }
    },
    async disabled2Fa() {
      const response = await this.removeFa();
      if (response.status === 200) {
        this.$toast.add({ severity: 'success', summary: 'Success', detail: response.data.message, life: 3000, group: 'br' });
        this.setData();
      } else {
        this.$toast.add({ severity: 'error', summary: 'Failed', detail: response.response.data.message, life: 3000, group: 'br' });
      }
    }
  },
  computed: {
    ...mapState(authStore, ['google2Fa', 'user'])
  },
  watch: {
    checkEnable: {
      handler(value) {
        console.log(value);
        this.checked = value;
      }
    }
  },
  created() {
    this.setData();
    this.checked = this.$props.checkEnable ?? false;
  }
}
</script>
