<template>
  <GenreCard :name="page?.title" />
  <!-- About section start  -->
  <section class="mt-[250px] md:mt-[380px] py-[40px] min-h-screen">
    <div class="w-full px-4" v-if="!isLoader">
      <!-- Body section start -->
      <div v-html="page?.content"></div>
      <!-- Body section end  -->
    </div>
    <SmallLoader />
  </section>
  <!-- About section end  -->
</template>

<script>
import GenreCard from '@/components/cards/GenreCard.vue';
import SmallLoader from '@/components/loaders/SmallLoader.vue';
import { siteStore } from '@/stores/SiteStore';
import { mapState } from 'pinia';

export default {
  name: "AboutUs",
  components: { GenreCard, SmallLoader },
  methods: {},
  computed: {
    ...mapState(siteStore, ['page', 'isLoader'])
  },
  created() { }
}
</script>
