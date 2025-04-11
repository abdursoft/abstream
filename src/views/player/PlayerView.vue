<template>
  <!-- single video player page start -->
<div class="flex w-full items-start justify-start gap-4 flex-col md:flex-row px-0 mt-[65px] md:px-[30px] min-h-screen">
  <div class="w-full md:w-4/6 flex flex-col gap-2 h-full md:pb-[20px]">
    <video-player :content="content" :types="contentType"></video-player>
  </div>
  <div class="w-full md:w-2/6 p-2">
    <related-content :types="contentType" />
  </div>
</div>
<!-- single video player page end -->
</template>

<script>
import VideoPlayer from '@/components/players/VideoPlayer.vue'
import { contentStore } from '@/stores/contentStore';
import { siteStore } from '@/stores/SiteStore';
import { mapActions, mapState } from 'pinia';
import RelatedContent from '@/components/partials/RelatedContent.vue';
import { commentStore } from '@/stores/commentStore';
import { favoriteStore } from '@/stores/favoriteStore';

export default {
    name: 'PlayerView',
    components:{VideoPlayer, RelatedContent},
    data(){
      return {
        videoId:null,
        contentType:null
      }
    },
    methods:{
      ...mapActions(siteStore,{setHeader: 'setActiveHeader',setFooter:'setFooter'}),
      ...mapActions(contentStore, {getContent: 'getContent', getRelatedContents: 'getRelatedContents',getRatings:'getRatings'}),
      ...mapActions(commentStore,{getComment:'getComments'}),
      ...mapActions(favoriteStore, {getFavorite: 'getFavorites'}),
      async getVideData(){
        if(this.contentType == 'content'){
          this.getComment(this.videoId);
          this.getRatings(this.videoId);
          this.getFavorite(this.videoId);
        }
        this.getContent(this.videoId,this.contentType);
        this.getRelatedContents(this.videoId,this.contentType);
      }
    },
    computed:{
      ...mapState(contentStore, ['content']),
    },
    beforeRouteLeave(){
      this.setHeader(false);
    },
    watch:{
      "$route.params.type":{
        handler(type){
          console.log(type);
          if(type !== this.contentType){
            this.contentType = type;
          }
        }
      },
      "$route.params.id":{
        handler(id){
          if(id !== this.videoId){
            this.videoId = id;
            this.getVideData();
          }
        }
      },
    },
    created() {
      this.contentType = this.$route.params.type;
      this.videoId = this.$route.params.id;
      this.setHeader(true);
      this.setFooter(true);
      this.getVideData();
    }
  }
</script>
