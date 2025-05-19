<template>
  <!-- web home page start  -->
  <div>
    <hero-slider />

    <div class="w-full pb-[50px] min-h-[350px] pt-[20]">
      <explore-genre />
      <div class="w-full mt-5 h-full">
        <SkeletonTitle />
        <SkeletonCard :itemLength="6" />
      </div>
      <render-content></render-content>
    </div>
  </div>
  <!-- web home page end  -->
</template>

<script>
import RenderContent from '@/components/partials/RenderContent.vue'
import { siteStore } from '@/stores/SiteStore';
import { mapActions } from 'pinia';
import HeroSlider from '@/components/slider/HeroSlider.vue';
import SkeletonTitle from '@/components/skeleton/SkeletonTitle.vue';
import SkeletonCard from '@/components/skeleton/SkeletonCard.vue';
import ExploreGenre from '@/components/partials/ExploreGenre.vue';
export default{
  components: { RenderContent, HeroSlider, SkeletonCard, SkeletonTitle, ExploreGenre },
  name: "HoveView",
  methods:{
    ...mapActions(siteStore, {setHeader: 'setActiveHeader'})
  }
}
</script>
