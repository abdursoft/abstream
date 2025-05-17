<template>
  <div class="w-full px-2" v-if="isLoader">
    <div class="w-full flex items-start justify-start flex-wrap h-[220px] md:h-[280px] lg:h-[3200px] xl:h-[360px] mt-2">
      <div class="w-2/4 md:w-1/4 lg:w-1/6 h-[220px] md:h-[280px] lg:h-[3200px] xl:h-[360px] px-2 my-2" v-for="(item,index) in itemLength" :key="index" >
        <Skeleton class="shadow-lg rounded-md" width="100%" height="100%"></Skeleton>
      </div>
    </div>
  </div>
</template>

<script>
import { siteStore } from '@/stores/SiteStore';
import { mapState } from 'pinia';
import { Skeleton } from 'primevue';

export default{
  name:"SkeletonCard",
  components: {Skeleton},
  props:{
    itemLength:{
      Number,
      required:true
    }
  },
  computed:{
    ...mapState(siteStore,['isLoader'])
  },
}
</script>
