<template>
  <!-- single video player page start -->
  <div>
    <div
      class="flex w-full items-start justify-start gap-4 flex-col md:flex-row px-0 mt-[65px] md:px-[30px] md:min-h-screen">
      <div class="w-full md:w-4/6 flex flex-col gap-2 h-full md:pb-[20px]">
        <video-player :content="content" :types="contentType"></video-player>
      </div>
      <div class="w-full md:w-2/6 p-2">
        <related-content :types="contentType" />
      </div>
    </div>
    <div class="mt-4 mx-2 md:mx-5" v-if="recommendedItems.length > 0">
      <h4>{{ $t('recommended') }}</h4>
      <Divider />
      <episode-card v-if="contentType == 'episode'" :contents="recommendedItems" :styleClass="getStyle('regular')"
        contentType="regular" />
      <ContentCard v-if="contentType == 'content'" :contents="recommendedItems" :styleClass="getStyle('regular')"
        contentType="regular" :playType="contentType" />
    </div>
  </div>
  <!-- single video player page end -->
</template>

<script>
import VideoPlayer from '@/components/players/VideoPlayer.vue'
import { contentStore } from '@/stores/contentStore';
import { siteStore } from '@/stores/SiteStore';
import { mapActions, mapState } from 'pinia';
import RelatedContent from '@/components/partials/RelatedContent.vue';
import { commentStore } from '@/stores/commentStore';
import { favoriteStore } from '@/stores/favoriteStore';
import ContentCard from '@/components/content/ContentCard.vue';
import EpisodeCard from '@/components/content/EpisodeCard.vue';
import { authStore } from '@/stores/authStore';
import { useHead } from '@vueuse/head';
import { computed } from 'vue';
import { watch } from 'vue';

export default {
  name: 'PlayerView',
  components: { VideoPlayer, RelatedContent, ContentCard, EpisodeCard },
  data() {
    return {
      videoId: null,
      contentType: null,
    }
  },
  methods: {
    ...mapActions(siteStore, { setHeader: 'setActiveHeader', setFooter: 'setFooter' }),
    ...mapActions(contentStore, { getContent: 'getContent', getRelatedContents: 'getRelatedContents', getRatings: 'getRatings', recommendedContents: 'getRecommendedContents', getStyle: 'getStyle', contentCounter: 'contentViews' }),
    ...mapActions(commentStore, { getComment: 'getComments' }),
    ...mapActions(favoriteStore, { getFavorite: 'getFavorites' }),
    async getVideData() {
      if (this.contentType == 'content') {
        this.getComment(this.videoId);
        this.getRatings(this.videoId);
        this.getFavorite(this.videoId);
        this.contentCounter(this.videoId);
      }
      this.getContent(this.videoId, this.contentType);
      this.getRelatedContents(this.videoId, this.contentType);
      this.recommendedContents(this.videoId, this.contentType);

    }
  },
  computed: {
    ...mapState(contentStore, ['content', 'recommendedItems']),
    ...mapState(authStore, ['authToken'])
  },
  beforeRouteLeave() {
    this.setHeader(false);
  },
  watch: {
    "$route.params.type": {
      handler(type) {
        if (type !== this.contentType) {
          this.contentType = type;
        }
      }
    },
    "$route.params.id": {
      handler(id) {
        if (id !== this.videoId) {
          this.videoId = id;
          this.getVideData();
        }
      }
    },
  },
  created() {
    this.contentType = this.$route.params.type;
    this.videoId = this.$route.params.id;
    this.setHeader(true);
    this.setFooter(true);
    this.getVideData();
  },
    setup() {
    const store = contentStore();
    watch(
      () => store.content,
      (content) => {
        if (!content?.title) return;
        useHead({
          title: `Watch ${content.title} | AbdurSoft`,
          meta: [
            { name: 'description', content: content.description },
            { name: 'robots', content: 'index, follow' },
            { name: 'language', content: 'en' },
            { name: 'author', content: 'AbdurSoft' },

            { property: 'og:title', content: content.title },
            { property: 'og:description', content: content.description },
            { property: 'og:type', content: 'video.movie' },
            { property: 'og:url', content: content.url || window.location.href },
            { property: 'og:image', content: content.cover },

            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: content.title },
            { name: 'twitter:description', content: content.description },
            { name: 'twitter:image', content: content.cover }
          ],
          link: [
            { rel: 'canonical', href: content.url || window.location.href }
          ]
        })
      },
      { immediate: true, deep: true }
    )
  }
}
</script>
