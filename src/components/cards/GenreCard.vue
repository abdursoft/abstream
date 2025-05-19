<template>
  <!-- genre card start  -->
  <div class="w-full absolute top-0 left-0 h-[250px] md:h-[300px] lg:h-[360px] px-3 overflow-hidden mb-[60px]"  :style="image !== '' ? `background:linear-gradient(to bottom right,rgb(255 0 0 / .5),rgb(0 0 255 / .5)),url(${image})center no-repeat;background-size:cover;` : `bg-slate-800`">
    <div class="w-50 md:w-auto border-dot-2 flex items-center justify-center  absolute bottom-[20px] left-[10px]">
        <SkeletonGenre :items="1"></SkeletonGenre>
        <h3 class="text-xl md:text-2xl text-white text-center font-700 py-[10px] md:py-[14px] px-4 rounded-md shadow-lg bg-slate-800" v-if="!site.isLoader">{{ name }}</h3>
      </div>
  </div>
  <!-- genre card end  -->
</template>

<script>
import { categoryStore } from '@/stores/categoryStore';
import { mapState } from 'pinia';
import SkeletonGenre from '../skeleton/SkeletonGenre.vue';

export default{
  name: "GenreCard",
  props:{
    name:{
      String,
      required:true,
      default:null
    },
    image:{
      String
    }
  },
  computed:{
    ...mapState(categoryStore,['genre','site'])
  }
}
</script>
