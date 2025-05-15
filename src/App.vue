<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useHead } from '@vueuse/head';
import { onMounted } from 'vue';
import { siteStore } from './stores/SiteStore';
const siteData = siteStore();

onMounted( async () => {
  await siteData.getPlayer();
  const siteInfo = await siteData.getSiteInfo();
  if(typeof siteInfo == 'object'){
    useHead({
      link: [
        {
          rel: 'icon',
          href: siteInfo.favicon,
        },
      ],
    });
  }
})

</script>

<template>
  <RouterView></RouterView>
</template>
