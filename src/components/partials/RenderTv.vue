<template>
  <div>
    <!-- live-tv by genre start  -->
    <div v-for="(genre,index) in tvGenres" :key="index"  class="my-4 group">
      <div class="flex items-center justify-between md:justify-start gap-4 mx-5" v-if="!isLoader">
        <h1 class="text-xl md:text-2xl font-700">{{ genre.name }}</h1>
        <router-link class="flex items-center justify-start gap-3 group-hover:text-red-600" :to="{name: 'contents', params: {content: genre.slug,type:'tv'}}">
          <p class="md:hidden ease-in duration-300 group-hover:w-auto group-hover:inline-block animate-duration-1000 font-300 text-sm md:text-base">{{ $t('button.seeAll') }}</p>
          <Icon icon="oui:arrow-right" width="16" height="16" />
        </router-link>
      </div>
      <tv-card :contents="genre.live_tv" />
    </div>
    <!-- live-tv by genre end  -->
  </div>
</template>

<script>
import { mapState } from 'pinia';
import { Icon } from '@iconify/vue';
import TvCard from '../cards/TvCard.vue';
import { tvStore } from '@/stores/tvStore';
import { siteStore } from '@/stores/SiteStore';
import SkeletonTitle from '../skeleton/SkeletonTitle.vue';

export default {
  components: { Icon,TvCard, SkeletonTitle },
  name: 'RenderTv',
  computed:{
    ...mapState(tvStore, ['tvGenres']),
    ...mapState(siteStore,['isLoader'])
  }
}
</script>
