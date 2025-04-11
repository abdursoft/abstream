<template>
  <div class="flex items-center justify-center" v-if="isLoader">
      <Icon icon="svg-spinners:ring-resize" class="text-primary-700" width="34" height="34" />
  </div>
</template>

<script>
import { siteStore } from '@/stores/SiteStore';
import { Icon } from '@iconify/vue';
import { mapState } from 'pinia';

export default {
  name: "SmallLoader",
  components:{Icon},
  computed:{
      ...mapState(siteStore, ['isLoader'])
  }
}
</script>
