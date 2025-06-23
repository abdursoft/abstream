<template>
  <div>
    <!-- content card section start  -->
    <swiper class="w-full mt-4 relative overflow-x-hidden py-20 h-[100px] md:h-[120px] lg:h-[180px] xl:h-[200px]" v-if="!isLoader" :slidesPerView="1"
      :spaceBetween="10" :navigation="true" :breakpoints="breakpoints" :modules="modules">
      <swiper-slide
        class="relative overflow-hidden cursor-pointer rounded-md overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-110"
        :class="styleClass" v-for="(item, index) in contents" :key="index">
        <div class="w-full h-full rounded-md flex items-center justify-center">
          <div class="w-full h-full rounded-md relative overflow-hidden"
            @click="openVideo(item?.id, item?.slug_title ?? item.title, item?.type)">
            <img :src="item.avatar ?? (item.logo ?? item?.cover)" :alt="item.title"
              class="w-full h-full absolute hover:scale-110 ease-in duration-300 rounded-md p-0 m-0 radial-background" />
            <div class="absolute inset-0 bg-black/30 z-10 flex items-center w-full h-full justify-between rounded-md" :title="item?.title">
              <Tag :value="item.premium == '1' ? $t('premium') : $t('free')" :severity="getSeverity(item.premium)"
                class="absolute" style="left:5px; top: 5px" />
              <div class="absolute top-[5px] right-[5px] text-orange-600 flex items-center gap-1">
                <Icon icon="fluent-color:star-48" v-if="item.rating" width="18" height="18" /> {{ item.rating }}
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <!-- content card section end  -->
  </div>
</template>

<script>
import router from '@/router';
import { favoriteStore } from '@/stores/favoriteStore';
import { siteStore } from '@/stores/SiteStore';
import { mapActions, mapState } from 'pinia';
import { Icon } from '@iconify/vue';

import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default {
  components: { Icon, Swiper, SwiperSlide },
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
    playType: {
      String,
      default: 'content'
    }
  },
  data() {
    return {
      modules: [Autoplay, Pagination, Navigation],
      breakpoints: {
        '@0.00': {
          slidesPerView: 2,
          spaceBetween: 8,
        },
        '@0.75': {
          slidesPerView: 3,
          spaceBetween: 8,
        },
        '@1.00': {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        '@1.50': {
          slidesPerView: 5,
          spaceBetween: 10,
        },
      }
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
