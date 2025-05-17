<template>
  <div class="w-full px-5 flex items-center justify-between md:justify-start gap-5" v-if="isLoader">
    <Skeleton class="shadow-lg rounded-md" width="250px" height="50px"></Skeleton>
    <Skeleton class="shadow-lg rounded-md" width="100px" height="50px"></Skeleton>
  </div>
</template>

<script>
import { siteStore } from '@/stores/SiteStore';
import { mapState } from 'pinia';
import { Skeleton } from 'primevue';

export default{
  name:"SkeletonTitle",
  components:{Skeleton},
  computed:{
    ...mapState(siteStore,['isLoader'])
  },
}
</script>
