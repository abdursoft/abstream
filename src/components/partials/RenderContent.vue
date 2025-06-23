<template>
  <div class="w-full overflow-x-hidden">
    <!-- video content by genre start  -->
    <div v-for="(genre, index) in posts" :key="index"
      class="my-4 group">
      <div class="flex items-center justify-between md:justify-start gap-4 mx-5 overflow-hidden mb-1" v-if="!isLoader">
        <h1 class="text-xl md:text-2xl font-bold font-700">{{ genre.name }}</h1>
        <router-link class="flex items-center justify-start gap-3 group-hover:text-[--dark-primary-500]"
          :to="{ name: 'contents', params: { content: genre.slug, type: types } }">
          <p
            class="md:hidden ml-0 group-hover:w-auto group-hover:ml-[20px] group-hover:inline-block transition-transform duration-300 ease-in-out font-300 text-sm md:text-base">
            {{ $t('button.seeAll') }}</p>
          <Icon icon="oui:arrow-right" width="16" height="16" />
        </router-link>
      </div>
      <template v-if="genre?.content">
        <content-card :styleClass="getStyle(genre.size_type)"
          v-if="genre.size_type != 'promo'"
          :setHeight="setHeight(genre.size_type)"
          :visibleNumber="getNumber(genre.size_type)"
          :contents="genre.content" />
          <promo-content v-else :contents="genre.content" :styleClass="getStyle(genre.size_type)" />
      </template>
    </div>

    <div ref="loadMore" v-if="hasMore" class="loading w-full p-5 flex items-center justify-center">
      <small-loader />
    </div>
    <!-- video content by genre end  -->
  </div>
</template>

<script>
import { categoryStore } from '@/stores/categoryStore';
import { mapActions, mapState } from 'pinia';
import { Icon } from '@iconify/vue';
import ContentCard from '../content/ContentCard.vue';
import { contentStore } from '@/stores/contentStore';
import { siteStore } from '@/stores/SiteStore';
import SkeletonTitle from '../skeleton/SkeletonTitle.vue';
import PromoContent from '../content/PromoContent.vue';
import SmallLoader from '../loaders/SmallLoader.vue';

export default {
  components: { Icon, ContentCard, SkeletonTitle, PromoContent, SmallLoader },
  name: 'RenderContent',
  props:{
    types:{
      String,
      default:"content"
    }
  },
  data() {
    return {
      posts: [],
      prevPage: 0,
      currentPage: 1,
      lastPage: null,
      hasMore: true,
      isLoading: false,
    }
  },
  methods: {
    ...mapActions(categoryStore, { getGenreContents: 'genreContents' }),
    ...mapActions(contentStore, { getStyle: 'getStyle', setHeight:'getHeight', getNumber:'getVisibleItem' }),
    async loadPosts() {
      if (!this.hasMore || this.isLoading) return;
      this.isLoading = true;
      try {
        const response = await this.getGenreContents(this.currentPage,this.$props.types);
        this.posts = [...this.posts, ...response.data.genre.data];
        this.lastPage = response.data.genre.last_page;
        if (this.currentPage >= this.lastPage) {
          this.hasMore = false;
        } else {
          this.currentPage++;
        }
        this.isLoading = false;
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },
    setupInfiniteScroll() {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (!this.loading) {
            this.loadPosts();
          }
          if (!this.hasMore) {
            this.observer.disconnect();
          }
        }
      });

      this.$nextTick(() => {
        if (this.$refs.loadMore) {
          observer.observe(this.$refs.loadMore);
        }
      });
    }
  },
  computed: {
    ...mapState(categoryStore, ['genres']),
    ...mapState(siteStore, ['isLoader'])
  },
  mounted() {
    this.setupInfiniteScroll();
  }
}
</script>
