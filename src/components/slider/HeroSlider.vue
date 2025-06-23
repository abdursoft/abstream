<template>
  <!-- here slider sections start  -->
  <swiper :spaceBetween="30" :centeredSlides="true" dir="ltr" :autoplay="{
    delay: 3000,
    disableOnInteraction: false,
  }" :pagination="{
    clickable: true,
  }" :navigation="true" :modules="modules"
    class="mySwiper h-[340px] md:h-[660px] max-h-[660px] sm:mt-[50px] md:mt-[-70px] justify-between opacity[0.5]">
    <swiper-slide v-for="(slide, index) in sliders" :key="index">
      <img :src="slide.cover ?? slide.avatar" :alt="slide.title" @click="openContent(slide)"
        class="h-[340px] md:h-[660px] w-screen">
    </swiper-slide>
  </swiper>
  <!-- hero slider section end  -->
</template>
<style lang="scss">
/* swiper carousel start  */
.swiper {

  .swiper-button-prev,
  .swiper-button-next {
    display: none !important;
  }
  margin: 0 auto;

  &:hover {

    .swiper-button-prev,
    .swiper-button-next {
      color: #fff;
      display: block !important;
    }
  }
}

/* swiper carousel end */
</style>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { mapActions, mapState } from 'pinia';
import { contentStore } from '@/stores/contentStore';
import router from '@/router';

export default {
  name: "HeroSlider",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      modules: [Autoplay, Pagination, Navigation],
    }
  },
  methods: {
    ...mapActions(contentStore, { getSlider: 'sliderImage' }),
    openContent(data) {
      if (data.type == 'episode') {
        router.push({ name: 'episodeList', params: { id: data.id } });
      } else if (data.type == 'single') {
        router.push({ name: 'watch', params: { id: data.id, title: data.slug_title, type: 'content' } });
      } else {
        router.push({ name: 'tv', params: { id: data.id, title: data.slug_title } });
      }
    }
  },
  computed: {
    ...mapState(contentStore, ['sliders'])
  },
  created() {
    this.getSlider();
  }
};
</script>
