<template>
  <div>
    <genre-card :name="genre?.name" :image="genre?.image" />
    <!-- content section start  -->
    <section class="mt-[250px] md:mt-[300px] lg:mt-[360px] py-[40px] w-full md:w-[auto] min-h-screen">

      <div class="my-4 w-full flex flex-col min-h-[540px]" v-if="isLoader">
        <SkeletonTitle />
        <SkeletonCard :itemLength="6" />
      </div>
      <div v-if="genre?.live_tv">
        <content-all contentType="regular"
        :styleClass="getStyle('regular')"
          v-if="genre?.size_type != 'promo'"
          :setHeight="setHeight(genre?.size_type)"
          :contents="genre?.live_tv" />
        <div class="flex items-center justify-center text-center" v-if="genre?.live_tv.length <= 0">
          <h1 class="text-xl md:text-3xl text-slate-400 font-bold" v-if="!isLoader">{{ $t('noContent') }}</h1>
        </div>
      </div>

      <div v-if="genre?.content">
          <content-all :styleClass="getStyle('regular')"
          v-if="genre?.size_type != 'promo'"
          :setHeight="setHeight(genre?.size_type)"
          :contents="genre?.content" />
        <div class="flex items-center justify-center text-center" v-if="genre?.content.length <= 0">
          <h1 class="text-xl md:text-3xl text-slate-400 font-bold" v-if="!isLoader">{{ $t('noContent') }}</h1>
        </div>
      </div>
    </section>
    <!-- content section end  -->
  </div>
</template>

<script>
import GenreCard from '@/components/cards/GenreCard.vue';
import { categoryStore } from '@/stores/categoryStore';
import { mapActions, mapState } from 'pinia';
import ContentCard from '@/components/content/ContentCard.vue';
import { contentStore } from '@/stores/contentStore';
import SkeletonCard from '@/components/skeleton/SkeletonCard.vue';
import SkeletonTitle from '@/components/skeleton/SkeletonTitle.vue';
import { siteStore } from '@/stores/SiteStore';
import ContentAll from '@/components/content/ContentAll.vue';



export default {
  name: "ContentPage",
  components: { GenreCard, ContentCard, SkeletonCard, SkeletonTitle, ContentAll },
  data() {
    return {
      key: null,
      type: null,
    }
  },
  methods: {
    ...mapActions(categoryStore, { getGenre: 'genreByContents' }),
    ...mapActions(contentStore, { getStyle: 'getStyle', setHeight:'getHeight' }),
    async genreList() {
      await this.getGenre(this.$route.params.content, this.$route.params.type);
    }
  },
  computed: {
    ...mapState(categoryStore, ['genre']),
    ...mapState(siteStore, ['isLoader'])
  },
  created() {
    this.getGenre(this.$route.params.content, this.$route.params.type);
  },
  watch: {
    "$route.query.q": {
      immediate: true,
      handler(key) {
        if (this.key !== key) {
          this.key = key;
          this.genreList();
        }
      }
    },
    "$route.params.type": {
      immediate: true,
      handler(type) {
        if (this.type !== type) {
          this.type = type;
        }
      }
    }
  }
}
</script>
