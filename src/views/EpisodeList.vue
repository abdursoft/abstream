<template>
  <!-- episode-list page start  -->
  <div>
    <genre-card :name="content?.title" :image="content?.cover" />
    <!-- live tv section start  -->
    <section class="mt-[250px] md:mt-[300px] lg:mt-[360px] py-[40px] w-full md:w-[auto] min-h-screen">
      <!-- <render-content types="tv-show"></render-content> -->
       <div class="mb-[40px]" v-for="(item,index) in data" :key="index">
        <h3 class="pl-[20px] text-xl">Season {{ parseInt(index) }}</h3>
        <episode-card :contents="item" contentType="regular" :styleClass="getStyle('regular')" />
       </div>
    </section>
    <!-- live tv section end  -->
  </div>
  <!-- episode-list page end  -->
</template>

<script>
import RenderContent from '@/components/partials/RenderContent.vue'
import { siteStore } from '@/stores/SiteStore';
import { mapActions, mapState } from 'pinia';
import HeroSlider from '@/components/slider/HeroSlider.vue';
import { contentStore } from '@/stores/contentStore';
import GenreCard from '../components/cards/GenreCard.vue';
import EpisodeCard from '../components/content/EpisodeCard.vue';
export default{
  components: { RenderContent, HeroSlider, GenreCard, EpisodeCard },
  name: "EpisodeList",
  data(){
    return {
      id:'',
      data:[],
      content:null
    }
  },
  methods:{
    ...mapActions(siteStore, {setHeader: 'setActiveHeader'}),
    ...mapActions(contentStore, {getEpisodes:'contentEpisodes',getStyle:'getStyle'}),
    async episodeList(){
      let response = await this.getEpisodes(this.id);
      if(response.status === 200){
        this.content = response.data.contents;
        this.data = response.data.seasons;
      }
      console.log(this.content);
    }
  },
  watch:{
    '$route.params.id':{
      immediate:true,
      handler(key){
        if(key !== this.id){
          this.id = key;
          this.episodeList();
        }
      }
    }
  }
}
</script>
