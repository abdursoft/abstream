<template>
  <div>
    <!-- tv card section start  -->
    <div class="w-full min-h-[310px] flex items-start justify-start flex-wrap mt-4 p-2" v-if="!isLoader">
      <div
        class="relative h-[220px] md:h-[280px] lg:h-[3200px] xl:h-[360px] w-1/2 md:w-1/4 lg:w-1/6 overflow-hidden cursor-pointer rounded-md my-2 px-2"
        v-for="(item, index) in contents" :key="index" @click="openVideo(item?.id,item?.title)">
        <div class="w-full h-full overflow-hidden relative rounded-md" :class="{'bg-slate-900':myTheme}">
          <img :src="item.logo" :alt="item.title"
            class="w-full h-full absolute hover:scale-110 ease-in duration-300 rounded-md" />
            <div class="absolute inset-0 radial-background z-2 flex items-center w-full h-[57px] justify-between rounded-md" :title="item?.title">
              <Tag :value="item.premium == '1' ? $t('premium') : $t('free')"
               :class="item.premium == '1' ? '!bg-[var(--dark-primary-700)] !opacity-1 z-[2]' : '!bg-green-700 !opacity-1 z-[3]'"
                class="absolute" style="left:5px; top: 5px" />
            </div>
        </div>
      </div>
    </div>
    <!-- tv card section end  -->
  </div>
</template>

<script>
import router from '@/router';
import { siteStore } from '@/stores/SiteStore';
import { mapActions, mapState } from 'pinia';
import { tvStore } from '@/stores/tvStore';

export default {
  name: "TvCard",
  props: {
    contents: {
      Object,
      required: true
    },
  },
  methods: {
    ...mapActions(tvStore, { getTv: 'getTv', relatedTv: 'getRelatedTv', otherTv:'getOthersTv' }),
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
    openVideo(id,slug) {
      this.getTv(id);
      this.relatedTv(id);
      this.otherTv(id);
      router.push({ name: 'tv', params: { id: id, title: slug }});
    },
  },
  computed: {
    ...mapState(siteStore, ['isLoader','myTheme'])
  }
}
</script>
