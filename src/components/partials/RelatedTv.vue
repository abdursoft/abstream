<template>
  <!-- related tv section start  -->
  <div class="w-full flex flex-col" v-if="sanitizeRelatedTv?.length > 0">
    <div class="h-[56px] my-4 mx-5">
      <h3 class="text-2xl mt-[40px] font-700">{{ $t('relatedContent') }}</h3>
      <Divider />
    </div>
    <tv-card :contents="sanitizeRelatedTv" />
  </div>
  <!-- related tv section end  -->
</template>

<script>
import { mapState } from 'pinia';
import VideoCard from '../cards/VideoCard.vue';
import { tvStore } from '@/stores/tvStore';
import TvCard from '../cards/TvCard.vue';

export default{
  name: 'RelatedContent',
  components: {VideoCard, TvCard},
  methods:{},
  computed:{
    ...mapState(tvStore, ['relatedTv','tv','tvGenres']),
    sanitizeRelatedTv(){
      let contentList = [];
      this.relatedTv.map((item) => {
        item.id !== this.tv?.id ? contentList.push(item) : true;
      })
      return contentList;
    }
  }
}
</script>
