<template>
  <!-- search content section start  -->
  <section class="mt-[60px] min-h-screen py-[20px]">
    <div class="w-full mt-5">
      <SkeletonTitle />
      <SkeletonCard :itemLength="6" />
    </div>
    <content-all :contents="posts" contentType="regular" :styleClass="getStyle('regular')"  />
    <div ref="loadMore" v-if="hasMore" class="loading">Loading...</div>
  </section>
  <!-- search content section end  -->
</template>

<script>
import { contentStore } from "@/stores/contentStore";
import { mapActions } from "pinia";
import ContentCard from '@/components/content/ContentCard.vue';
import SkeletonTitle from "@/components/skeleton/SkeletonTitle.vue";
import SkeletonCard from "@/components/skeleton/SkeletonCard.vue";
import ContentAll from '@/components/content/ContentAll.vue';

export default {
  components: { ContentCard, SkeletonCard, SkeletonTitle, ContentAll },
  data() {
  return {
      key: "",
      posts: [],
      hasMore: true,
      lastPage: null,
      currentPage: 1,
      isMounted: false,
    };
  },
  mounted() {
    this.isMounted = true;
    this.loadPosts();
    this.setupInfiniteScroll();
  },
  watch: {
    "$route.query.q": {
      immediate: true,
      handler(newQuery) {
        if (newQuery !== this.key) {
          this.key = newQuery;
          if (this.isMounted) {
            this.resetSearch();
          }
        }
      },
    },
  },
  methods: {
    ...mapActions(contentStore, { getSearch: "search", getStyle: "getStyle" }),
    async loadPosts() {
      if (!this.hasMore) return;
      try {
        const response = await this.getSearch(this.key, this.currentPage);
        this.posts = [...this.posts, ...response.data.contents.data];
        this.lastPage = response.data.contents.last_page;

        if (this.currentPage >= this.lastPage) {
          this.hasMore = false;
        } else {
          this.currentPage++;
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },
    resetSearch() {
      this.posts = [];
      this.currentPage = 1;
      this.lastPage = null;
      this.hasMore = true;
      this.loadPosts();
    },
    setupInfiniteScroll() {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (this.currentPage > 1) {
            this.loadPosts();
          }
        }
      });

      this.$nextTick(() => {
        if (this.$refs.loadMore) {
          observer.observe(this.$refs.loadMore);
        }
      });
    },
  },
};

</script>

<style>
.post {
  padding: 10px;
  margin: 80px 0;
  border-bottom: 1px solid #ddd;
}

.loading {
  text-align: center;
  font-size: 18px;
  margin: 20px 0;
}
</style>
