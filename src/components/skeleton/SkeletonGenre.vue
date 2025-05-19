<template>
  <div class="w-full px-5 flex items-center justify-between md:justify-start gap-2 my-1" v-if="isLoader">
    <Skeleton v-for="item in items" :key="item" class="shadow-lg rounded-md" width="250px" height="50px"></Skeleton>
  </div>
</template>

<script>
import { siteStore } from '@/stores/SiteStore';
import { mapState } from 'pinia';
import { Skeleton } from 'primevue';

export default{
  name:"SkeletonGenre",
  props:{
    items:{
      Number,
      default:9
    }
  },
  components:{Skeleton},
  computed:{
    ...mapState(siteStore,['isLoader'])
  },
}
</script>
