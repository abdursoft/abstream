<template>
  <div class="flex items-center">
    <Button @click="toggle" class="!bg-transparent !p-1">
      <Icon icon="prime:language" width="24" height="24" :class="color" />
    </Button>
    <!-- Language dropdown start  -->
    <Menu :popup="true" ref="menu" id="overlay_menu" :model="panelItem">
      <template #start>
        <span class="flex items-start gap-1 px-2 py-2 flex-col">
          <span class="text-md font-semibold">Languages</span>
          <Divider class="!m-0" />
        </span>
      </template>
      <template #item="{ item }">
        <p v-ripple class="flex items-center p-1 cursor-pointer" @click="$i18n.locale = item.code" :class="$i18n.locale === item.code ? 'text-teal-600' : ''">
            <span :class="item.icon" />
            <span>{{ item.name }}</span>
        </p>
    </template>
    </Menu>
    <!-- Language dropdown end  -->
  </div>
</template>


<script>
import { langStore } from '@/stores/langStore';
import { siteStore } from '@/stores/SiteStore';
import { Icon } from '@iconify/vue';
import { mapActions, mapState } from 'pinia';

export default {
  name: "Language",
  components:{Icon},
  props:{
    color:{
      String,
      required:true
    }
  },
  data() {
    return {
      panelItem: []
    }
  },
  methods: {
    ...mapActions(siteStore,{setLang: 'setLang'}),
    ...mapActions(langStore,{getLang:'getLanguage'}),
    toggle(event) {
      this.$refs.menu.toggle(event);
    },
    async setLanguage(){
      const res = await this.getLang();
      if(res.status === 200){
        this.panelItem = this.language.langs;
      }
    }
  },
  computed:{
    ...mapState(langStore,['language'])
  },
  watch: {
    '$i18n.locale'(newLocale) {
      document.documentElement.setAttribute('dir', ['AR', 'HE', 'FA', 'UR'].includes(newLocale) ? 'rtl' : 'ltr');
      let style = ('dir', ['AR', 'HE', 'FA', 'UR'].includes(newLocale) ? 'right;' : 'left;');
      document.documentElement.style.textAlign = style;
      this.setLang(newLocale);
    }
  },
  mounted(){
    this.setLanguage();
  }
}
</script>
