<template>
  <div class="py-2">
    <h1 class="text-xl md:text-2xl px-5 mb-2 mt-3 font-bold font-700" v-if="!isLoader">Explore by genre</h1>
    <skeleton-genre :items="1"></skeleton-genre>
    <skeleton-genre></skeleton-genre>
    <div class="w-full overflow-hidden px-5">
      <div class="overflow-x-auto whitespace-nowrap scrollbar-hide w-full min-h-[60px]" v-if="!isLoader">
        <p class="inline-block w-auto p-4 cursor-pointer h-[50px] rounded-md shadow-md self-center bg-slate-800 mr-3 items-center justify-center line-clamp-3 max-w-[300px]"
          :class="{ 'bg-slate-200': !myTheme }" v-for="(item, index) in categories" :key="index"
          @click="openGenre(item.slug)">{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { categoryStore } from '@/stores/categoryStore';
import { siteStore } from '@/stores/SiteStore';
import { mapActions, mapState } from 'pinia';
import SkeletonGenre from '../skeleton/SkeletonGenre.vue';
import router from '@/router';

export default {
  components: { SkeletonGenre },
  name: 'ExploreGenre',
  methods: {
    ...mapActions(categoryStore, { getCategories: 'getCategoryList' }),
    openGenre(slug) {
      router.push({ name: 'contents', params: { content: slug, type: 'content' } })
    }
  },
  computed: {
    ...mapState(categoryStore, ['categories']),
    ...mapState(siteStore, ['isLoader', 'myTheme'])
  },
  created() {
    this.getCategories();
  }
}
</script>
