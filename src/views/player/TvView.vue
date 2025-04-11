<template>
  <!-- live tv player page start -->
  <div class="w-full px-0 mt-[65px] md:px-[30px]">
    <div class="w-full flex flex-col">
      <tv-player :tvContent="tv" />
    </div>
  </div>
  <!-- live tv player page end -->
</template>

<script>
import { siteStore } from '@/stores/SiteStore';
import { mapActions, mapState } from 'pinia';
import TvPlayer from '@/components/players/TvPlayer.vue';
import { tvStore } from '@/stores/tvStore';

export default {
  name: 'TvView',
  components: { TvPlayer },
  data(){
    return {
      tvID:null
    }
  },
  methods: {
    ...mapActions(siteStore, { setHeader: 'setActiveHeader', setFooter:'setFooter' }),
    ...mapActions(tvStore, { getTv: 'getTv', relatedTv: 'getRelatedTv',otherTv:'getOthersTv' }),
    loadTv(){
      this.getTv(this.tvID);
      this.otherTv(this.tvID);
      this.relatedTv(this.tvID);
    }
  },
  computed: {
    ...mapState(tvStore, ['tv']),
  },
  beforeRouteLeave() {
    this.setHeader(false);
  },
  created() {
    this.setHeader(true);
    this.setFooter(true);
    this.tvID = this.$route.params.id;
    this.loadTv();
  },
  watch:{
    '$route.params.id':{
      handler(id){
        if(id !== this.tvID){
          this.tvID = id;
          this.loadTv();
        }
      }
    }
  }
}
</script>
