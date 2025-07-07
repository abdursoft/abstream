<template>
  <!-- user history section start  -->
  <section class="w-full px-2">
    <h3 class="text-2xl">{{ $t('pageTitle.history') }}</h3>
    <SkeletonCard :itemLength="4" />
    <div class="w-full min-h-[440px] flex items-start justify-start flex-wrap mt-4" v-if="!isLoader">
      <div class="w-2/4 md:w-1/4 !h-[240px] px-2 my-2 rounded-md overflow-hidden" v-for="(item) in posts" :key="item?.content.id" >
        <div class="w-full h-full relative overflow-hidden group rounded-md overflow-hidden">
        <router-link class="w-full h-full relative overflow-hidden group" :to="{name:'watch',params:{id:item?.content.id, title:item?.content.slug_title,type:item?.content.type == 'single' ? 'content' : item.content.type}}">
          <div class="shadow-lg rounded-md w-full h-full relative overflow-hidden">
            <img :src="item?.content.cover ?? item?.content.avatar" :alt="item?.content.title" class="h-full w-full">
          </div>
        </router-link>
        <div class="absolute bottom-0 left-0 w-full translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-in-out bg-red-700 text-white text-center py-2"
            :title="item?.content.title">
            <p class="text-white line-clamp-1 text-center">{{ item.content.title }}</p>
          </div>
        </div>
      </div>
    </div>
    <div ref="loadMore" v-if="hasMore" class="loading w-full p-5 flex items-center justify-center">
      <Icon icon="svg-spinners:blocks-scale" width="24" height="24" class="text-white" />
    </div>
  </section>
  <!-- user history section end  -->
</template>

<script>
import SkeletonCard from '@/components/skeleton/SkeletonCard.vue';
import { contentStore } from '@/stores/contentStore';
import { siteStore } from '@/stores/SiteStore';
import { Icon } from '@iconify/vue';
import { mapActions, mapState } from 'pinia';

export default{
  name:"HistoryPage",
  components:{SkeletonCard, Icon},
  data(){
    return {
      posts: [],
      prevPage: 0,
      currentPage: 1,
      lastPage: null,
      hasMore: true,
      isLoading: false,
    }
  },
  methods:{
    ...mapActions(contentStore,{getHistory: 'userView'}),
    async loadPosts() {
      if (!this.hasMore || this.isLoading) return;
      this.isLoading = true;
      try {
        const scrollTop = window.scrollY;
        const oldHeight = document.body.scrollHeight;

        const response = await this.getHistory(this.currentPage);
        this.posts = [...this.posts, ...response.data.contents.data];
        this.lastPage = response.data.contents.last_page;
        if (this.currentPage >= this.lastPage) {
          this.hasMore = false;
        } else {
          this.currentPage++;
        }

        this.$nextTick(() => {
          const newHeight = document.body.scrollHeight;
          const heightDiff = newHeight - oldHeight;
          this.currentPage > 2 ? window.scrollTo(0, (scrollTop + heightDiff) - 100) : true;
        });
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
  computed:{
    ...mapState(siteStore,['isLoader'])
  },
  mounted(){
    this.setupInfiniteScroll();
  }
}
</script>
