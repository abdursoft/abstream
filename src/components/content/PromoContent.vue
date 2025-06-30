<template>
  <div>
    <!-- content card section start  -->
    <div class="w-full flex items-start justify-start flex-wrap mt-4 p-2" v-if="!isLoader">
      <div
        class="relative overflow-hidden rounded-md my-1 overflow-hidden px-2 w-full"
        v-for="(item, index) in contents" :key="index">
        <div class="w-full h-full md:h-[470px] overflow-hidden relative rounded-md flex items-center justify-center">
          <div class="w-full h-full flex items-center justify-between flex-col md:flex-row">
            <!-- <img :src="item.avatar ?? item.cover" :alt="item.title"
              class="w-full min-h-[220px] md:w-1/2 h-full md:rounded-md p-0 m-0" /> -->
              <div class="w-full h-full md:w-1/2 flex items-center justify-center">
                <global-player :content="item" ></global-player>
              </div>
            <div class="w-full h-full md:w-1/2 p-3 md:pl-10 flex items-center justify-center"
                  :style="genre?.size_type == 'promo' ? 'background-image:radial-gradient(circle at center,rgb(0 0 0 / .8),rgb(0 0 0 / .9)),url('+genre?.image+');background-size:cover;background-position:center;' : ''"
                  >
              <div class="w-full text-white">
                <div class="mb-[25px]">
                <h1 class="text-xl md:text-3xl font-700 line-clamp-1">{{ item.title }}</h1>
                <p class="py-2">{{ $t('exploreContent') }}</p>
              </div>
              <div class="text-sm md:text-base line-clamp-4" v-html="item.description"></div>
              <div class="w-full flex items-center gap-10 mt-5">
                <Button :class="siteData?.site_color ? 'bg-'+siteData.site_color+'900' : 'bg-danger'" :label="$t('button.watchNow')"
                @click="openVideo(item?.id, item?.slug_title ?? item.title, item?.type)" class="mt-3 !text-white" />
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- content card section end  -->
  </div>
</template>

<script>
import router from '@/router';
import { favoriteStore } from '@/stores/favoriteStore';
import { siteStore } from '@/stores/SiteStore';
import { mapActions, mapState } from 'pinia';
import { Icon } from '@iconify/vue';
import GlobalPlayer from '../players/GlobalPlayer.vue';

export default {
  components: { Icon, GlobalPlayer },
  name: "PromoContent",
  props: {
    contents: {
      Object,
      required: true
    },
    styleClass: {
      String
    },
    playType: {
      String,
      default: 'content'
    },
    genre:{
      Object
    }
  },
  data() {
    return {
    }
  },
  methods: {
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
    openVideo(id, slug, type) {
      if (type == 'episode') {
        router.push({ name: 'episodeList', params: { id: id } });
      } else if (type == 'single') {
        router.push({ name: 'watch', params: { id: id, title: slug, type: 'content' } });
      } else {
        router.push({ name: 'tv', params: { id: id, title: slug } });
      }
    },
  },
  computed: {
    ...mapState(siteStore, ['isLoader', 'myTheme','siteData'])
  }
}
</script>
