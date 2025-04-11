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
        <p v-ripple class="flex items-center p-1 cursor-pointer" @click="$i18n.locale = item.action" :class="$i18n.locale === item.action ? 'text-teal-600' : ''">
            <span :class="item.icon" />
            <span>{{ item.label }}</span>
        </p>
    </template>
    </Menu>
    <!-- Language dropdown end  -->
  </div>
</template>


<script>
import { siteStore } from '@/stores/SiteStore';
import { Icon } from '@iconify/vue';
import { mapActions } from 'pinia';

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
      panelItem: [
        {
          label: 'English',
          action:"EN"
        },
        {
          label: 'Bengali',
          action:"BN"
        },
        {
          label: 'Arabic',
          action:"AR"
        },
        {
          label: 'Hindi',
          action:"HN"
        },
        {
          label: 'Italic',
          action:"IT"
        },
        {
          label: 'Russian',
          action:"RU"
        },
        {
          label: 'Urdu',
          action:"UR"
        },
        {
          label: 'French',
          action:"FR"
        },
        {
          label: 'Germany',
          action:"DA"
        },
        {
          label: 'Espanol',
          action:"ES"
        },
        {
          label: 'Indonesia',
          action:"ID"
        },
        {
          label: 'Thai',
          action:"TH"
        },
        {
          label: 'China',
          action:"CN"
        },
        {
          label: 'Japan',
          action:"JP"
        },
        {
          label: 'Dutch',
          action:"DE"
        },
        {
          label: 'Swedish',
          action:"SV"
        },
        {
          label: 'Hebrew',
          action: 'HE'
        }
      ]
    }
  },
  methods: {
    ...mapActions(siteStore,{setLang: 'setLang'}),
    toggle(event) {
      this.$refs.menu.toggle(event);
    }
  },
  watch: {
    '$i18n.locale'(newLocale) {
      document.documentElement.setAttribute('dir', ['AR', 'HE', 'FA', 'UR'].includes(newLocale) ? 'rtl' : 'ltr');
      let style = ('dir', ['AR', 'HE', 'FA', 'UR'].includes(newLocale) ? 'right;' : 'left;');
      document.documentElement.style.textAlign = style;
      this.setLang(newLocale);
    }
  }
}
</script>
