<template>
  <div class="flex items-center justify-center" v-if="isLoader">
      <Icon icon="svg-spinners:blocks-scale" :class="myTheme ? 'text-white' : 'text-slate-800'" width="24" height="24" />
  </div>
</template>

<script>
import { siteStore } from '@/stores/SiteStore';
import { Icon } from '@iconify/vue';
import { mapState } from 'pinia';

export default {
  name: "ContentLoader",
  components:{Icon},
  computed:{
      ...mapState(siteStore, ['isLoader','myTheme'])
  }
}
</script>
