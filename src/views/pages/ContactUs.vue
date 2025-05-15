<template>
  <GenreCard :name="$t('page.contact.tag')" />
  <!-- Contact section start  -->
  <section class="mt-[250px] md:mt-[380px] py-[40px] flex items-center justify-center">
    <div class="w-full px-4 flex items-start justify-between gap-4 flex-col md:flex-row">
      <!-- contact form start  -->
      <div class="w-full flex-col">
        <div class="w-full flex flex-col items-start justify-start p-3">
          <h1 class="text-3xl font-700 mb-5">{{ $t('page.contact.title') }}</h1>
          <div class="w-full md:w-4/5 shadow-lg rounded-md p-4" :class="{ 'bg-slate-700': myTheme }">
            <div class="mt-3">
              <div class="flex items-center flex-col gap-3">
                <FloatLabel variant="on" class="w-full my-2">
                  <InputText id="on_label" v-model="emailForm.name" class="w-full" />
                  <label for="on_label">{{ $t('form.fullName') }}</label>
                </FloatLabel>
                <FloatLabel variant="on" class="w-full my-2">
                  <InputText id="on_label" v-model="emailForm.email" class="w-full" />
                  <label for="on_label">{{ $t('form.email') }}</label>
                </FloatLabel>
                <FloatLabel variant="on" class="w-full my-2">
                  <InputText id="on_label" v-model="emailForm.subject" class="w-full" />
                  <label for="on_label">{{ $t('form.subject') }}</label>
                </FloatLabel>
              </div>
              <div class="flex items-center flex-col md:flex-row gap-3">
                <FloatLabel variant="on" class="w-full my-2">
                  <Textarea id="on_label" v-model="emailForm.message" class="w-full" />
                  <label for="on_label">{{ $t('form.message') }}</label>
                </FloatLabel>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <SmallLoader />
                </div>
                <Button :label="$t('button.send')" severity="success" @click="sendMail" raised class="mt-3" />
              </div>
            </div>
          </div>
          <!-- social connections start -->
          <div class="flex mt-5 items-center justify-end gap-4">
            <p>Connect with Social: </p>
            <Icon icon="circum:facebook" @click="openSocial('facebook_url')" class="hover:text-red-500 cursor-pointer"
              :class="!myTheme ? 'text-black-600' : 'text-white'" width="34" v-if="siteData?.facebook_url"
              height="34" />
            <Icon icon="et:linkedin" @click="openSocial('linkedin_url')" class="hover:text-red-500 cursor-pointer"
              :class="!myTheme ? 'text-black-600' : 'text-white'" width="28" height="28"
              v-if="siteData?.linkedin_url" />
            <Icon icon="hugeicons:new-twitter-ellipse" @click="openSocial('x_url')"
              class="hover:text-red-500 cursor-pointer" :class="!myTheme ? 'text-black-600' : 'text-white'" width="30"
              height="30" v-if="siteData?.x_url" />
          </div>
          <!-- social connections end -->
        </div>
      </div>
      <div class="w-full">
        <div class="w-full md:w-4/5" v-html="siteData?.map"></div>
      </div>
      <!-- contact form end  -->
    </div>
  </section>
  <!-- Contact section end  -->
</template>

<script>
import GenreCard from '@/components/cards/GenreCard.vue';
import SmallLoader from '@/components/loaders/SmallLoader.vue';
import { siteStore } from '@/stores/SiteStore';
import { subscriptionStore } from '@/stores/subscriptionStore';
import { Icon } from '@iconify/vue';
import { mapActions, mapState } from 'pinia';

export default {
  name: "ContactUs",
  components: { GenreCard, SmallLoader, Icon },
  data() {
    return {
      emailForm: {
        name: "",
        email: "",
        subject: "",
        message: ""
      }
    }
  },
  methods: {
    ...mapActions(subscriptionStore, { newContact: 'postContactForm' }),
    openSocial(key) {
      window.open(this.siteData[key], '_blank');
    },
    async sendMail() {
      const res = await this.newContact(this.emailForm);
      if (res.status === 201) {
        Object.keys(this.emailForm).forEach(key => this.emailForm[key] = "");
        this.$toast.add({ severity: 'success', detail: res.data.message, summery: 'success', life: 3000, group: 'br' });
      } else {
        this.$toast.add({ severity: 'error', detail: res.response.data.message, summery: 'error', life: 3000, group: 'br' });
      }
    }
  },
  computed: {
    ...mapState(siteStore, ['isLoader', 'siteData', 'myTheme'])
  },
  created() { }
}
</script>
