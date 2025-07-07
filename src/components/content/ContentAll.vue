<template>
    <!-- content card section start  -->
    <div class="w-full h-auto flex items-center justify-start flex-wrap mt-4 relative mb-[100px] md:mb-0" v-if="!isLoader">
      <div
        class="relative overflow-hidden cursor-pointer rounded-md overflow-hidden my-2"
        :class="styleClass" v-for="(item, index) in contents" :key="index">
        <div class="absolute w-full h-full rounded-md flex items-center justify-center px-2">
          <div class="w-full h-full rounded-md relative overflow-hidden group/item"
            @click="openVideo(item?.id, item?.slug_title ?? item.title, item?.type)">
            <img :src="item.avatar ?? (item.logo ?? item?.cover)" :alt="item.title"
              class="w-full h-full absolute hover:scale-110 ease-in duration-300 rounded-md p-0 m-0 radial-background" />
            <div class="absolute inset-0 radial-background z-2 flex items-center w-full h-[57px] justify-between rounded-md" :title="item?.title">
              <Tag :value="item.premium == '1' ? $t('premium') : $t('free')"
               :class="item.premium == '1' ? '!bg-[var(--dark-primary-700)] !opacity-1 z-[2]' : '!bg-green-700 !opacity-1 z-[3]'"
                class="absolute" style="left:5px; top: 5px" />
              <div class="absolute top-[5px] right-[5px] text-orange-600 flex items-center gap-1">
                <Icon icon="fluent-color:star-48" v-if="item.rating" width="18" height="18" /> {{ item.rating }}
              </div>
            </div>
            <div class="absolute bottom-0 left-0 w-full translate-y-full opacity-0 group-hover/item:translate-y-0 group-hover/item:opacity-100 transition-all duration-500 ease-in-out bg-red-700 text-white text-center py-2"
             :title="item?.title">
              <p class="text-white line-clamp-1 text-center">{{ item.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- content card section end  -->
</template>

<script>
import router from '@/router';
import { favoriteStore } from '@/stores/favoriteStore';
import { siteStore } from '@/stores/SiteStore';
import { mapActions, mapState } from 'pinia';
import { Icon } from '@iconify/vue';

export default {
  components: { Icon },
  name: "ContentAll",
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
    playType: {
      String,
      default: 'content'
    },
    setHeight:{
      String,
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
    ...mapState(siteStore, ['isLoader', 'myTheme'])
  }
}
</script>
