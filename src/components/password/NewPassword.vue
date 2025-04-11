<template>
  <!-- password updated form start -->
  <div class="w-full p-3" v-if="verifyToken">
    <div class="flex w-full items-center justify-between mb-[20px]" to="/">
      <div class="w-1/4 flex items-center gap-1"><router-link class="flex items-center" to="/">
          <Icon icon="proicons:arrow-left" class="min-w-[50px] min-h-[40px]" /> {{ $t('button.back') }}
        </router-link></div>
    </div>
    <TextInput :label="$t('form.password')" type="password" v-model="passwordForm.new_password"
      :placeholder="$t('form.password')" />
    <TextInput :label="$t('form.password')" type="password" v-model="passwordForm.confirm_password"
      :placeholder="$t('form.password')" />
    <TextButton @click="changePassword()" :title="$t('button.save')" />
    <p class="mt-[20px] text-center text-md">{{ $t('form.alreadyHaveAnAccount') }} <router-link
        class="font-fold text-cyan-800" to="/signin">{{ $t('button.signIn') }}</router-link></p>
  </div>
  <!-- password updated form end -->
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
  name: 'NewPassword',
  components: { TextInput, TextButton, Icon },
  data() {
    return {
      passwordForm: {
        new_password: null,
        confirm_password: null
      }
    }
  },
  methods: {
    ...mapActions(authStore, { newPassword:'setNewPassword' }),
    ...mapActions(siteStore, { getSiteInfo: 'getSiteInfo' }),
    async changePassword() {
      const response = await this.newPassword(this.passwordForm);
      if (response.status === 200) {
        router.push({ name: 'signin' });
        this.$toast.add({ severity: 'success', summary: 'Success', detail: response.data.message, life: 3000, group: 'br' });
      } else {
        this.$toast.add({ severity: 'error', summary: 'Failed', detail: response.response.data.message, life: 3000, group: 'br' });
      }
    },
  },
  computed: {
    ...mapState(authStore, ['isAuth', 'verifyToken']),
    ...mapState(siteStore, ['siteData', 'myTheme'])
  },
  created() {
    this.getSiteInfo();
  }
}
</script>
