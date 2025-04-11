<template>
  <!-- user setting section start  -->
  <div class="px-2 w-full">
    <h3 class="text-2xl">{{ $t('pageTitle.settings') }}</h3>
    <div class="mt-3 relative w-full">
      <img :src="user?.image" :alt="user?.name"
        class="w-[140px] h-[140px] rounded-full border-2 border-slate-300 text-center flex items-center justify-center mt-2" />
      <span
        class="absolute mt-[-50px] left-[50px] border-2 border-slate-400 rounded-[8px] p-1 text-sm cursor-pointer bg-slate-400 text-white"
        @click="visible = true">{{ $t('select') }}</span>
    </div>
    <div class="mt-4 w-full">
      <h2 class="text-xl">{{ $t('updateInfo') }}</h2>
      <Divider class="!mt-[3px] w-full" />
      <div class="mt-2 w-full">
        <FloatLabel variant="on" class="my-2">
          <InputText id="u_name" v-model="userForm.name" :invalid="!userForm.name" class="w-full" />
          <label for="u_name">{{ $t('form.username') }}</label>
        </FloatLabel>
        <FloatLabel variant="on" class="my-2">
          <InputText id="u_email" v-model="userForm.email" :invalid="!userForm.email" class="w-full" />
          <label for="u_email">{{ $t('form.email') }}</label>
        </FloatLabel>
        <FloatLabel variant="on" class="my-2">
          <Textarea id="u_bio" v-model="userForm.bio" :invalid="!userForm.bio" class="w-full" cols="30" />
          <label for="u_bio">{{ $t('bio') }}</label>
        </FloatLabel>
        <Button :label="$t('button.saveChange')" severity="success" @click="setUserData" :loading="isLoader" />
      </div>
    </div>
  </div>
  <Dialog v-model:visible="visible" modal header="Pay with Secure" :style="{ width: '50vw' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div
      class="flex w-full flex-col md:flex-row items-center justify-start gap-3 border-2 border-slate-300 px-[40px] py-[20px]">
      <div class="w-full flex flex-col gap-2">
        <input type="file" name="image" accept="image/*" class="h-[35px] border-2 border-green-400 rounded px-2 py-1"
          @change="upload" />
        <Button label="Upload" @click="onUpload" severity="secondary" />
      </div>
      <img :src="previewImage" :alt="user.name" class="w-full md:w-[100px] h-[90px]">
    </div>
  </Dialog>
  <!-- user setting section end  -->
</template>

<script>
import { authStore } from '@/stores/authStore';
import { siteStore } from '@/stores/SiteStore';
import { mapActions, mapState } from 'pinia';

export default {
  name: "SettingPage",
  data() {
    return {
      visible: false,
      image: null,
      previewImage: '',
      userForm: {
        name: '',
        email: '',
        bio: '',
        dob: ''
      }
    }
  },
  methods: {
    ...mapActions(authStore, { profileImage: 'userProfile', updateData:'setUserData' }),
    upload(event) {
      this.image = event.target.files[0];
      this.previewImage = URL.createObjectURL(this.image);
    },
    userData() {
      for (const key in this.user) {
        if (this.userForm[key] !== undefined) {
          this.userForm[key] = this.user[key];
        }
      }
    },
    async setUserData(){
      const res = await this.updateData(this.userForm);
      if(res.status === 200){
        this.$toast.add({ severity: 'success', summary: 'Success', detail: res.data.message, life: 3000, group:'br' });
      }else{
        this.$toast.add({ severity: 'error', summary: 'Error', detail: res.error.data.message, life: 3000, group:'br' });
      }
    },
    async onUpload() {
      const res = await this.profileImage(this.image);
      if(res.status === 200){
        this.$toast.add({ severity: 'success', summary: 'Success', detail: res.data.message, life: 3000, group:'br' });
      }else{
        this.$toast.add({ severity: 'error', summary: 'Error', detail: res.error.data.message, life: 3000, group:'br' });
      }
    }
  },
  computed: {
    ...mapState(authStore, ['user']),
    ...mapState(siteStore, ['isLoader'])
  },
  created() {
    this.userData();
  }
}
</script>
