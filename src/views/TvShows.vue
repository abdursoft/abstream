<template>
  <!-- tv-shows page start  -->
  <div>
    <genre-card name="TV Shows" />
    <!-- live tv section start  -->
    <section class="mt-[250px] md:mt-[300px] lg:mt-[360px] py-[40px] w-full md:w-[auto] min-h-screen">
      <render-content types="tv-show"></render-content>
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
export default{
  components: { RenderContent, HeroSlider },
  name: "HoveView",
  methods:{
    ...mapActions(siteStore, {setHeader: 'setActiveHeader'}),
  },
}
</script>
