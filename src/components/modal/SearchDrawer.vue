<template>
  <!-- content search section start  -->
  <Drawer v-bind:visible="isDrawer" :showCloseIcon="false" position="top" style="height: auto">
    <div class="flex items-center justify-end w-full h-[50px]">
      <span class="w-[40px] h-[40px] rounded-full shadow-md flex items-center justify-center cursor-pointer"
        @click="controlDrawer">
        <Icon icon="iconoir:cancel" width="24" height="24" />
      </span>
    </div>
    <div class="my-3">
      <p class="my-3">{{ $t('search') }}</p>
      <!-- search form start  -->
      <div class="flex items-center justify-between gap-3">
        <InputGroup>
          <InputText v-model="search_key" placeholder="Keyword, title" />
          <InputGroupAddon>
            <Button icon="pi pi-search" severity="secondary" variant="text" @click="makeSearch" />
          </InputGroupAddon>
        </InputGroup>
      </div>
      <!-- search form end  -->
      <p class="my-3 hidden">{{ $t('tag') }}</p>
      <div class="flex items-center gap-3 hidden">
        <router-link class="p-1 rounded-md border-2" :to="{ name: 'subscribe' }">Subscribe</router-link>
        <router-link class="p-1 rounded-md border-2" :to="{ name: 'home' }">Contact</router-link>
      </div>
    </div>
  </Drawer>
  <!-- content search section end  -->
</template>

<script>
import router from '@/router';
import { siteStore } from '@/stores/SiteStore';
import { Icon } from '@iconify/vue';
import { mapActions } from 'pinia';

export default {
  name: "SearchDrawer",
  components: { Icon },
  props: {
    isDrawer: {
      Boolean,
      default: false
    },
    changeDrawer: {
      Function
    }
  },
  data() {
    return {
      moreDrawer: true,
      search_key:''
    }
  },
  emits: ['changeDrawer'],
  methods: {
    ...mapActions(siteStore,{setHeader:'setActiveHeader'}),
    controlDrawer() {
      this.$emit('changeDrawer', !this.$props.isDrawer);
    },
    async makeSearch(){
      this.setHeader(true);
      this.controlDrawer();
      router.push({name:'search',query:{q:this.search_key}});
      this.search_key = '';
    }
  }
}
</script>
