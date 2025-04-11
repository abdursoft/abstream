<template>
  <!-- content slider section start  -->
  <Carousel :value="contents" :numVisible="5" :numScroll="1" :responsiveOptions="responsiveOptions" :showIndicators="false">
    <template #item="slotProps">
      <div class="border border-surface-200 dark:border-surface-700 rounded m-1 cursor-pointer p-0 overflow-hidden" @click="openVideo(slotProps.data.id,slotProps.data.slug_title)">
        <div class="mb-0">
          <div class="relative mx-auto h-[250px] md:h-[360px] lg:h-[450px] xl:h-[540px]" :class="'sl_'+ slotProps.data.id">
            <img :src="slotProps.data.avatar" :alt="slotProps.data.title" class="w-full rounded h-full absolute hover:scale-110 ease-in duration-300" />
            <Tag :value="slotProps.data.premium == '1' ? 'Premium' : 'Free'" :severity="getSeverity(slotProps.data.premium)" class="absolute" style="left:5px; top: 5px"/>
          </div>
        </div>
      </div>
    </template>
  </Carousel>
  <!-- content slider section end  -->
</template>

<script>
import router from '@/router';

export default{
  name: "HeroSection",
  props:{
    contents: {
      Object,
      required: true
    }
  },
  data(){
    return {
      responsiveOptions: [
        {
            breakpoint: '1400px',
            numVisible: 4,
            numScroll: 1
        },
        {
            breakpoint: '1200px',
            numVisible: 4,
            numScroll: 1
        },
        {
            breakpoint: '992px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 2,
            numScroll: 1
        },
      ]
    }
  },
  methods:{
    openVideo(URI){
      alert(URI);
    },
    getSeverity(status) {
      switch (status) {
          case 0:
              return 'success';
          case 1:
              return 'warn';
          default:
              return null;
      }
    },
    openVideo(id,slug){
      router.push({name: 'watch', params:{id:id,title:slug}})
    }
  }
}
</script>
