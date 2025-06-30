<template>
  <div class="hidden md:flex items-center justify-start">
    <Button @click="isOpen = !isOpen" class="!bg-transparent !p-1" v-if="!isOpen">
      <Icon icon="lucide:search" class="text-white" width="24" height="24" />
    </Button>
    <!-- Content search form start  -->
    <div v-if="isOpen" class="flex flex-col gap-1 relative" id="overlay_menu">
      <div class="flex items-center w-full justify-between">
        <TextInput v-model="search_key" @keydown="checkHandler" :placeholder="$t('titleOrKeywords')" />
        <Button @click="toggleSearch" class="!bg-transparent !p-1">
          <Icon icon="hugeicons:search-remove" class="text-white" width="24" height="24" />
        </Button>
      </div>
      <div class="suggestion flex items-start gap-3 flex-column bg-white-700 shadow-md absolute mt-[50px] w-full z-[5]">
        <div v-if="contents" class="flex items-start flex-col min-h-[100px] max-h-[30vh] overflow-y-auto gap-3 font-700 text-white-400 w-full p-2" :class="myTheme ? 'bg-slate-900' : 'bg-white'">
          <template v-for="item in contents" :key="item.id">
            <p v-if="item.status == 'active'" @click="searchItem(item.title)" class="cursor-pointer hover:text-slate-700">{{ item.title.slice(0, 30) }}</p>
          </template>
        </div>
      </div>
    </div>
    <!-- Content search form end  -->
  </div>
</template>


<script>
import { Icon } from '@iconify/vue';
import TextInput from '../global/TextInput.vue';
import { mapActions, mapState } from 'pinia';
import { contentStore } from '@/stores/contentStore';
import { siteStore } from '@/stores/SiteStore';
import router from '@/router';

export default {
  name: "SearchMenu",
  components: { Icon, TextInput },
  data() {
    return {
      search_key: "",
      isOpen: false,
      contents: null,
      apiCounter: 0,
      debounceTimer: null,
    }
  },
  methods: {
    ...mapActions(contentStore, { getTitle: 'titleSearch' }),
    ...mapActions(siteStore,{setHeader:'setActiveHeader'}),
    async checkHandler(event) {
      if (event.code == 'Enter' && this.search_key !== '') {
        this.searchItem(this.search_key);
      } else {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(async () => {
          if (this.search_key !== '') {
            const items = await this.getTitle(this.search_key);
            this.contents = items;
          }
        }, 500);
      }
    },
    toggleSearch() {
      this.isOpen = !this.isOpen;
      if (!this.isOpen) {
        this.search_key = '';
      }
    },
    searchItem(title){
      this.setHeader(true);
      router.push({name:'search',query:{q:title}});
      this.search_key = '';
      this.isOpen = false;
      this.contents = null;
    }
  },
  computed:{
    ...mapState(siteStore,['myTheme'])
  },
  watch: {
    search_key: {
      handler(value) {
        this.search_key = value;
      }
    }
  },
}
</script>
