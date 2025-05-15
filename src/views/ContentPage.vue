<template>
  <div>
    {{ this.type }}
    <genre-card :name="genre?.name" :image="genre?.image" />
    <!-- content section start  -->
    <section class="mt-[250px] md:mt-[300px] lg:mt-[360px] py-[40px] w-full md:w-[auto] min-h-screen" v-if="genre?.live_tv">
      <content-card contentType="regular" :styleClass="getStyle('regular')" playType="tv" :contents="genre?.live_tv" />
      <div class="flex items-center justify-center text-center" v-if="genre?.live_tv.length <= 0" >
        <h1 class="text-xl md:text-3xl text-slate-400 font-bold">{{$t('noContent')}}</h1>
      </div>
    </section>

    <section class="mt-[250px] md:mt-[300px] lg:mt-[360px] py-[40px] w-full md:w-[auto] min-h-screen" v-if="genre?.content">
      <content-card contentType="regular" :styleClass="getStyle('regular')" playType="content" :contents="genre?.content" />
      <div class="flex items-center justify-center text-center" v-if="genre?.content.length <= 0" >
        <h1 class="text-xl md:text-3xl text-slate-400 font-bold">{{$t('noContent')}}</h1>
      </div>
    </section>
    <!-- content section end  -->
  </div>
</template>

<script>
import GenreCard from '@/components/cards/GenreCard.vue';
import { categoryStore } from '@/stores/categoryStore';
import { mapActions, mapState } from 'pinia';
import ContentCard from '@/components/content/ContentCard.vue';
import { contentStore } from '@/stores/contentStore';



export default{
  name:"ContentPage",
  components:{GenreCard, ContentCard},
  data(){
    return {
      key: null,
      type: null,
    }
  },
  methods:{
    ...mapActions(categoryStore,{getGenre: 'genreByContents'}),
    ...mapActions(contentStore,{getStyle:'getStyle'}),
    async genreList(){
      await this.getGenre(this.$route.params.content,this.$route.params.type);
    }
  },
  computed:{
    ...mapState(categoryStore, ['genre'])
  },
  created(){
    this.getGenre(this.$route.params.content,this.$route.params.type);
  },
  watch:{
      "$route.query.q":{
        immediate: true,
        handler(key){
          if(this.key !== key){
            this.key = key;
            this.genreList();
          }
        }
      },
      "$route.params.type":{
        immediate: true,
        handler(type){
          if(this.type !== type){
            this.type = type;
          }
        }
      }
    }
}
</script>
