<template>
  <!-- web home page start  -->
  <div>
    <hero-slider />
    <div class="w-full pb-[50px]">
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
export default{
  components: { RenderContent, HeroSlider },
  name: "HoveView",
  methods:{
    ...mapActions(siteStore, {setHeader: 'setActiveHeader'})
  }
}
</script>
