<template>
  <!-- video card section start  -->
  <div class="flex items-start justify-start gap-2 cursor-pointer my-1 rounded shadow-md"
  @click="openVideo" :class="myTheme ? 'bg-slate-900 hover:bg-slate-800 hover:text-white' : 'hover:bg-slate-200'">
    <img :src="image" :alt="title" class="min-w-[160px] max-w-[160px] h-[85px] rounded-md">
    <div class="w-full">
      <h3 class="line-clamp-2 p-0 m-0 text-sm md:text-base ">{{ title }}</h3>
      <div class="flex items-center gap-3">
        <p v-if="$props.types == 'content'" class="text-sm font-weight-500">{{ views }} {{ $t('views') }}</p>
        <p class="text-sm font-weight-500 p-1" :class="premium == '1' ? 'text-[var(--dark-primary-600)]' : 'text-green-600'">{{ premium == '1' ? $t('premium') : $t('free') }}</p>
        <p class="text-sm font-weight-500 p-1" v-if="$props.duration">{{ $props?.duration }}</p>
      </div>
    </div>
  </div>
  <!-- video card section end  -->
</template>

<script>
import router from '@/router';
import { commentStore } from '@/stores/commentStore';
import { contentStore } from '@/stores/contentStore';
import { favoriteStore } from '@/stores/favoriteStore';
import { siteStore } from '@/stores/SiteStore';
import { mapActions, mapState } from 'pinia';

export default{
  name: "VideoCard",
  props:{
    title: {
      String,
      required: true
    },
    id:{
      Number,
      required: true,
    },
    image: {
      String,
      required:true
    },
    views: {
      Number
    },
    premium:{
      String
    },
    slug:{
      String
    },
    types:{
      String,
      default:'content'
    },
    duration:{
      String
    }
  },
  data(){
    return {
      hoverIndex:0,
      contentType: null
    }
  },
  methods:{
    ...mapActions(contentStore,  {getContent: 'getContent', viewIncrement: 'contentViews', getRelatedContents: 'getRelatedContents'}),
    ...mapActions(favoriteStore,{getFavorite: 'getFavorites'}),
    ...mapActions(commentStore, {getComment:'getComments'}),
    openVideo(){
      router.push({name: 'watch', params: {id: this.$props.id, title: this.$props.slug,type:this.contentType},meta: {title: this.$props.title}});
    }
  },
  computed:{
    ...mapState(siteStore,['myTheme'])
  },
  watch:{
    '$props.types':{
      handler(type){
        if(type !== this.contentType){
          this.contentType = type;
        }
      }
    }
  }
}
</script>
