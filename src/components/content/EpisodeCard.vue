<template>
  <div>
    <skeleton-card :itemLength="contents.length ?? 4" />
    <!-- content card section start  -->
    <div class="w-full flex items-start justify-start flex-wrap mt-4 p-2" v-if="!isLoader">
      <div class="relative overflow-hidden cursor-pointer rounded-md my-1 overflow-hidden px-2" :class="styleClass"
        v-for="(item, index) in contents" :key="index" >
        <div class="w-full h-full overflow-hidden relative rounded-md flex items-center justify-center">
          <template v-if="contentType !== 'promo'">
            <div class="w-full h-full rounded-md relative" @click="openVideo(item?.id, item?.slug_title,item?.type)">
              <img :src="item.avatar ?? (item.logo ?? item?.cover)" :alt="item.title"
              class="w-full h-full absolute hover:scale-110 ease-in duration-300 rounded-md p-0 m-0" />
              <div class="absolute inset-0 radial-background z-2 flex items-center w-full h-[57px] justify-between rounded-md" :title="item?.title">
              <Tag :value="item.premium == '1' ? $t('premium') : $t('free')"
               :class="item.premium == '1' ? '!bg-[var(--dark-primary-700)] !opacity-1 z-[2]' : '!bg-green-700 !opacity-1 z-[3]'"
                class="absolute" style="left:5px; top: 5px" />
              <Icon icon="fluent-color:star-48" v-if="item.rating" width="18" height="18" /> {{ item.rating }}</div>
            </div>
          </template>
          <template v-else>
            <div class="w-ull flex items-center justify-between flex-col md:flex-row">
              <img :src="item.avatar ?? item.cover" :alt="item.title"
                class="w-full min-h-[220px] md:w-1/2 h-full rounded-md p-0 m-0" />
              <div class="w-full md:w-1/2 p-3">
                <div class="mb-[25px]">
                  <h1 class="text-xl md:text-3xl font-700 line-clamp-1">{{ item.title }}</h1>
                  <p class="py-2">{{ $t('exploreContent') }}</p>
                </div>
                <div class="text-sm md:text-base line-clamp-4" v-html="item.description"></div>
                <Button severity="success" :label="$t('button.watchNow')" @click="openVideo(item?.id, item?.title)" class="mt-3 !text-white" />
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <!-- content card section end  -->
  </div>
</template>

<script>
import router from '@/router';
import { contentStore } from '@/stores/contentStore';
import { favoriteStore } from '@/stores/favoriteStore';
import { siteStore } from '@/stores/SiteStore';
import { mapActions, mapState } from 'pinia';
import SkeletonCard from '../skeleton/SkeletonCard.vue';
import { Icon } from '@iconify/vue';

export default {
  components: { SkeletonCard, Icon },
  name: "ContentCard",
  props: {
    contents: {
      Object,
      required: true
    },
    styleClass: {
      String
    },
    contentType: {
      String
    },
    season:{
      Number,
      default: 1
    }
  },
  data() {
    return {
      id: null
    }
  },
  methods: {
    ...mapActions(contentStore, { getContent: 'getContent', viewIncrement: 'contentViews', getRelatedContents: 'getRelatedContents' }),
    ...mapActions(favoriteStore, { getFavorite: 'getFavorites' }),
    getSeverity(status) {
      switch (status) {
        case '0':
          return 'success';
        case '1':
          return 'warn';
        default:
          return null;
      }
    },
    openVideo(id, slug) {
      router.push({ name: 'watch', params: { id: id, title: slug,type:'episode' } });
    },
  },
  watch:{
    '$route.params.id':{
      handler(id){
        if(id !== this.id){
          this.id = id;
        }
      }
    }
  },
  computed: {
    ...mapState(siteStore, ['isLoader', 'myTheme'])
  }
}
</script>
