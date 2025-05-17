<template>
  <div>
    <genre-card name="Live TV" />
    <!-- live tv section start  -->
    <section class="mt-[250px] md:mt-[300px] lg:mt-[360px] py-[40px] w-full md:w-[auto] min-h-screen">
      <div class="w-full mt-5 h-full">
        <SkeletonTitle />
        <SkeletonCard :itemLength="6" />
      </div>
      <render-tv />
      <div class="flex items-center justify-center text-center" v-if="tvGenres?.length <= 0">
        <h1 class="text-xl md:text-3xl text-slate-400 font-bold" v-if="!isLoader">{{ $t('noContent') }}</h1>
      </div>
    </section>
    <!-- live tv section end  -->
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import GenreCard from '@/components/cards/GenreCard.vue';
import RenderTv from '@/components/partials/RenderTv.vue';
import { tvStore } from '@/stores/tvStore';
import { siteStore } from '@/stores/SiteStore';
import SkeletonTitle from '@/components/skeleton/SkeletonTitle.vue';
import SkeletonCard from '@/components/skeleton/SkeletonCard.vue';

export default {
  name: "LiveTv",
  components: { GenreCard, RenderTv, SkeletonCard, SkeletonTitle },
  methods: {
    ...mapActions(tvStore, { getGenre: 'genreTvs' })
  },
  computed: {
    ...mapState(tvStore, ['tvGenres']),
    ...mapState(siteStore, ['isLoader'])
  },
  created() {
    this.getGenre();
  }
}
</script>
