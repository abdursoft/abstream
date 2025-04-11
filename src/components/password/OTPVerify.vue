<template>
  <!-- otp verify form start  -->
  <div class="w-full p-3" v-if="passwordToken">
    <div class="flex w-full flex-col mb-[20px]">
      <div class="w-1/4 flex items-center gap-1"><router-link class="flex items-center" to="/">
          <Icon icon="proicons:arrow-left" class="min-w-[50px] min-h-[40px]" /> {{ $t('button.back') }}
        </router-link>
      </div>
      <div class="p-[30px] flex items-center justify-center flex-col gap-[20px]">
        <h3 class="text-xl mb-2">{{ $t('verifyOtp') }}</h3>
        <InputOtp v-model="otpForm.otp" />
        <TextButton :loading="isLoader" @click="otpVerify()" :title="$t('button.next')" :class="{'disabled': otpForm.otp.length < 4}" />
      </div>
    </div>
  </div>
  <!-- otp verify form end  -->
</template>

<script>
import { authStore } from '@/stores/authStore';
import { siteStore } from '@/stores/SiteStore';
import { Icon } from '@iconify/vue';
import { mapActions, mapState } from 'pinia';

export default {
  name: 'OTPVerify',
  components:{Icon},
  data() {
    return {
      otpForm: {
        otp: '',
      }
    }
  },
  methods: {
    ...mapActions(authStore, { verifyOTP: 'verifyPasswordOTP' }),
    async otpVerify() {
      const res = await this.verifyOTP(this.otpForm);
      if (res.status === 200) {
        this.$toast.add({ severity: 'success', summary: 'Success', detail: res.data.message, life: 3000, group: 'br' });
      } else {
        this.$toast.add({ severity: 'error', summary: 'Failed', detail: res.response.data.message, life: 3000, group: 'br' });
      }
    }
  },
  computed: {
    ...mapState(siteStore, ['isLoader']),
    ...mapState(authStore, ['passwordToken'])
  },
  created() {

  }
}
</script>
