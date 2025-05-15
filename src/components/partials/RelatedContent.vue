<template>
  <!-- related video content start  -->
  <div class="w-full flex flex-col">
    <div class="h-[56px]">
      <div class="w-full flex items-center justify-between">
        <h3 class="font-bold">{{ $t('relatedContent') }}</h3>
        <span class="hidden flex items-center gap-2">Autoplay <ToggleSwitch v-model="checked" /></span>
      </div>
      <Divider />
    </div>
    <div class="w-full flex flex-col" v-if="sanitizeRelatedContents.length > 0">
      <video-card v-for="(content, index) in sanitizeRelatedContents" :key="index" :image="content.avatar ?? content.cover" :title="content.title" :id="content.id" :views="content.views" :slug="content.slug_title" :premium="content.premium" :types="contentType"></video-card>
    </div>
    <div class="flex items-center justify-center min-h-[400px]" v-else><h3 class="tex-2xl font-bold">{{ $t('noContent') }}</h3></div>
  </div>
  <!-- related video content end  -->
</template>

<script>
import { contentStore } from '@/stores/contentStore';
import { mapActions, mapState } from 'pinia';
import VideoCard from '../cards/VideoCard.vue';
import { siteStore } from '@/stores/SiteStore';

export default{
  name: 'RelatedContent',
  components: {VideoCard},
  props:{
    types:{
      String,
      default:'content'
    }
  },
  data(){
    return{
      checked:false,
      contentType:null
    }
  },
  methods:{
    ...mapActions(siteStore,{setAutoplay:'setAutoplay',setNextContent:'setNextContent'}),
    setPlay(){
      this.checked = this.autoPlayNext;
    },
    sayHello(){
      console.log(this.relatedContents[0])
    }
  },
  computed:{
    ...mapState(contentStore, ['relatedContents','content']),
    ...mapState(siteStore,['autoPlayNext','nextContent']),
    sanitizeRelatedContents(){
      let contentList = [];
      this.relatedContents.map((item) => {
        item.id !== this.content?.id ? contentList.push(item) : true;
      })
      return contentList;
    }
  },
  watch:{
    checked:{
      handler(value){
        this.setAutoplay(value);
        this.setNextContent(this.sayHello);
      }
    },
    '$props.types':{
      handler(type){
        if(type !== this.contentType){
          this.contentType = type;
        }
      }
    }
  },
  created(){
    this.setPlay();
  }
}
</script>
