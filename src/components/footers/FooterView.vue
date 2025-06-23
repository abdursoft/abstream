<template>
  <!-- footer section start  -->
  <div class="hidden md:flex w-full flex items-center justify-center py-[60px] bg-overlay-black bg-image" :style="siteData?.footer_image !== '' ? `background:url('${siteData?.footer_image}')no-repeat center; background-size:cover` : 'background:rgba(0,0,0,.8)'">
    <div class="container relative !z-2  p-0 md:p-4">
      <div class="flex items-center justify-between flex-col md:flex-row px-2">
        <div class="w-auto">
          <img :src="siteData?.secondary_logo" :alt="siteData?.site_name" class="w-[100px] h-[60px]">
        </div>
        <div class="flex items-center justify-end gap-4">
          <Icon icon="circum:facebook" @click="openSocial('facebook_url')" class="hover:text-[var(--dark-primary-500)] cursor-pointer text-white" width="34" v-if="siteData?.facebook_url" height="34" />
          <Icon icon="et:linkedin" @click="openSocial('linkedin_url')" class="hover:text-[var(--dark-primary-500)] cursor-pointer text-white" width="28" height="28" v-if="siteData?.linkedin_url" />
          <Icon icon="hugeicons:new-twitter-ellipse" @click="openSocial('x_url')" class="hover:text-[var(--dark-primary-500)] cursor-pointer text-white" width="30" height="30" v-if="siteData?.x_url" />
           <Icon icon="iconoir:instagram" @click="openSocial('instagram_url')" class="hover:text-[var(--dark-primary-500)] cursor-pointer text-white" width="32" height="32" v-if="siteData?.instagram_url" />
           <Icon icon="hugeicons:tiktok" @click="openSocial('tiktok_url')" class="hover:text-[var(--dark-primary-500)] cursor-pointer text-white" width="30" height="30" v-if="siteData?.tiktok_url" />
        </div>
      </div>
      <Divider class="opacity-[0.7]" />
      <div class="w-full flex flex-col md:flex-row justify-around lg:justify-between py-[20px] text-white">
        <!-- footer logo section start  -->
        <div class="p-2 w-full md:w-1/4 lg:w-2/4">
          <p class="text-white text-space-1 text-sm line-clamp-7 md:pr-4">{{ siteData?.footer_description }}</p>
        </div>
        <!-- footer logo section end  -->

        <!-- footer quick section start  -->
        <div class="w-full md:w-1/4 lg:w-1/6">
          <h1 class="text-xl font-700 mb-4">{{ $t('shortLinks') }}</h1>
          <div class="flex flex-col">
            <template v-for="(item, index) in pages" :key="index">
              <p @click="openPage(item?.id)" class="my-1 cursor-pointer hover:text-[var(--dark-primary-500)] w-auto">{{ item?.title
              }}</p>
            </template>
            <router-link :to="{name:'contactUs'}" class="my-1 cursor-pointer hover:text-[var(--dark-primary-500)] w-auto">{{ $t('contactUs') }}</router-link>
          </div>
        </div>
        <!-- footer quick section end  -->

        <!-- footer category section start  -->
        <div class="w-full md:w-1/4 lg:w-1/6">
          <h1 class="text-xl font-700 mb-4">{{ $t('category') }}</h1>
          <div class="w-full flex flex-col">
            <template v-for="(item, index) in genres.data" :key="index">
              <p @click="openRoute('contents',item?.slug)" class="my-1 cursor-pointer hover:text-[var(--dark-primary-500)] w-auto">{{ item?.name
              }}</p>
            </template>
          </div>
        </div>
        <!-- footer category section end  -->

        <!-- footer subscription section start  -->
        <div class="w-full md:w-1/4 lg:w-2/6">
          <h1 class="text-xl font-700 mb-4">{{ $t('newsLatter') }}</h1>
          <p class="my-2">{{ $t('getUpdate') }}</p>
          <div class="w-full flex flex-col">
            <InputGroup>
              <InputText v-model="email" class="h-[50px]" :placeholder="$t('form.email')" />
              <Button class="!text-white" :label="$t('button.send')" @click="subscribe" />
            </InputGroup>
          </div>
          <div class="flex items-center justify-around mt-4 gap-2">
            <img src="../../assets/images/appstore.png" v-if="siteData?.apple_store" class="h-[55px] w-full cursor-pointer" @click="openStore('apple')" alt="App Store">
            <img src="../../assets/images/googleplay.png" v-if="siteData?.google_store" class="h-[55px] w-full cursor-pointer" @click="openStore('google')" alt="Play store">
          </div>
        </div>
        <!-- footer subscription section end  -->
      </div>
    </div>
  </div>
  <!-- footer section end  -->
</template>

<script>
import router from '@/router';
import { categoryStore } from '@/stores/categoryStore';
import { siteStore } from '@/stores/SiteStore';
import { subscriptionStore } from '@/stores/subscriptionStore';
import { Icon } from '@iconify/vue';
import { mapActions, mapState } from 'pinia';

export default {
  name: 'FooterView',
  components:{Icon},
  data(){
    return {
      email:''
    }
  },
  methods: {
    ...mapActions(categoryStore,{getGenres: 'genreContents',genre:'genreByContents'}),
    ...mapActions(subscriptionStore, {newsLatter: 'newsSubscription'}),
    ...mapActions(siteStore,{getPage:'getPage'}),
    openStore(key){
      key === 'google' ? router.push(this.siteData?.google_store) : router.push(this.siteData?.apple_store);
    },
    openSocial(key){
      window.open(this.siteData[key],'_blank');
    },
    openRoute(name,content){
      this.genre(content);
      router.push({name:name,params:{content: content}});
    },
    openPage(id){
      this.getPage(id);
      router.push({name:'page'});
    },
    async subscribe(){
      const res = await this.newsLatter({email:this.email});
      if(res.status === 201){
        this.$toast.add({severity:'success', detail:res.data.message, summary:'success', life:3000, group:'br'});
      }else{
        this.$toast.add({severity:'error', detail:res.response.data.errors.email[0], summary:'error', life:3000, group:'br'});
      }
    }
  },
  computed: {
    ...mapState(siteStore, ['siteData', 'hideFooter','pages']),
    ...mapState(categoryStore, ['genres'])
  },
  created(){
    this.getGenres();
    this.getPage();
  }
}
</script>
