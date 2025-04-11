<template>
  <!-- here slider sections start  -->
  <swiper :spaceBetween="30" :centeredSlides="true" :autoplay="{
    delay: 3000,
    disableOnInteraction: false,
  }" :pagination="{
    clickable: true,
  }" :navigation="true" :modules="modules"
    class="mySwiper h-[340px] md:h-[660px] max-h-[660px] sm:mt-[50px] md:mt-[-70px] justify-between opacity[0.5]">
    <swiper-slide v-for="(slide, index) in contents" :key="index">
      <img :src="slide.cover" :alt="slide.title" class="h-[340px] md:h-[660px] w-screen">
    </swiper-slide>
  </swiper>
  <!-- hero slider section end  -->
</template>
<style lang="scss">
/* swiper carousel start  */
.swiper{

  .swiper-button-prev,
  .swiper-button-next {
    display: none !important;
  }

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
import { mapState } from 'pinia';
import { contentStore } from '@/stores/contentStore';

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
  computed: {
    ...mapState(contentStore, ['contents'])
  }
};
</script>
