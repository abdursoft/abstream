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
    siteData.setLang(siteInfo.default_language);
    useHead({
      link: [
        {
          rel: 'icon',
          href: siteInfo.favicon,
        },
      ],
      meta:[
        // Standard SEO
        { name: 'description', content: siteInfo.site_description },
        { name: 'keywords', content: siteInfo?.site_keywords },
        { name: 'robots', content: 'index, follow' },
        { name: 'language', content: 'en' },
        { name: 'author', content: 'AbdurSoft' },

        // Open Graph / Facebook
        { property: 'og:title', content: siteInfo.site_name },
        { property: 'og:description', content: siteInfo.site_description },
        { property: 'og:type', content: 'video.movie' },
        { property: 'og:url', content: '/' },
        { property: 'og:image', content: siteInfo.primary_logo },

        // Twitter Cards
        { name: 'twitter:card', content: siteInfo.primary_logo },
        { name: 'twitter:title', content: siteInfo.site_name },
        { name: 'twitter:description', content: siteInfo.site_description },
        { name: 'twitter:image', content: siteInfo.primary_logo },

        // Schema (JSON-LD via script)
        {
          name: 'structured-data',
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Movie",
            "name": siteInfo.site_title,
            "description": siteInfo.site_description,
            "image": siteInfo.primary_logo,
            "url": window.location.href
          })
        }
      ]
    });
  }
})

</script>

<template>
  <RouterView></RouterView>
</template>
