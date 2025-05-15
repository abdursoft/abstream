<template>
  <div>
    <!-- video content by genre start  -->
    <div v-for="(genre, index) in posts" :key="index"
      v-animateonscroll="{ enterClass: 'animate-fadein', leaveClass: 'animate-fadeout' }"
      class="my-4 group animate-duration-1000">
      <div class="flex items-center justify-between md:justify-start gap-4 mx-5" v-if="!isLoader">
        <h1 class="text-xl md:text-2xl font-bold font-700">{{ genre.name }}</h1>
        <router-link class="flex items-center justify-start gap-3 group-hover:text-red-600"
          :to="{ name: 'contents', params: { content: genre.slug, type: types } }">
          <p
            class="md:hidden ease-in duration-300 group-hover:w-auto group-hover:inline-block animate-duration-1000 font-300 text-sm md:text-base">
            {{ $t('button.seeAll') }}</p>
          <Icon icon="oui:arrow-right" width="16" height="16" />
        </router-link>
      </div>
      <SkeletonTitle />
      <template v-if="genre?.content">
        <content-card :styleClass="getStyle(genre.size_type)" :contentType="genre.size_type"
          :contents="genre.content" />
      </template>
    </div>
    <div ref="loadMore" v-if="hasMore" class="loading w-full p-5 flex items-center justify-center">
      <content-loader />
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
import ContentLoader from '../loaders/ContentLoader.vue';

export default {
  components: { Icon, ContentCard, SkeletonTitle, ContentLoader },
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
    ...mapActions(contentStore, { getStyle: 'getStyle' }),
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
