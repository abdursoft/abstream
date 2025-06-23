<template>
  <!-- tv-shows page start  -->
  <div>
    <genre-card name="TV Shows" />
    <!-- live tv section start  -->
    <section class="mt-[250px] md:mt-[300px] lg:mt-[360px] py-[40px] w-full md:w-[auto] min-h-screen">
      <div class="w-full mt-5 h-full">
        <SkeletonTitle />
        <SkeletonCard :itemLength="6" />
      </div>
      <render-content types="tv-show"></render-content>
      <div class="flex items-center justify-center text-center h-full w-full" v-if="!isLoader && genres?.length == 0">
        <h1 class="text-xl md:text-3xl text-slate-400 font-bold" >{{ $t('noContent') }}</h1>
      </div>
    </section>
    <!-- live tv section end  -->
  </div>
  <!-- tv-shows page end  -->
</template>

<script>
import RenderContent from '@/components/partials/RenderContent.vue'
import { siteStore } from '@/stores/SiteStore';
import { mapActions, mapState } from 'pinia';
import HeroSlider from '@/components/slider/HeroSlider.vue';
import SkeletonTitle from '@/components/skeleton/SkeletonTitle.vue';
import SkeletonCard from '@/components/skeleton/SkeletonCard.vue';
import { categoryStore } from '@/stores/categoryStore';
export default {
  components: { RenderContent, HeroSlider, SkeletonCard, SkeletonTitle },
  name: "HoveView",
  methods: {
    ...mapActions(siteStore, { setHeader: 'setActiveHeader' }),
  },
  computed:{
    ...mapState(siteStore,['isLoader']),
    ...mapState(categoryStore,['genres'])
  }
}
</script>
