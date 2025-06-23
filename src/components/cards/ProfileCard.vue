<template>
  <!-- profile card section start  -->
  <div class="w-full md:max-w-[420px] rounded-md shadow-md flex flex-col max-h-[520px]" v-if="user" :class="{'bg-slate-900':myTheme}">
    <div class="w-full bg-[var(--dark-primary-600)] flex items-center justify-center p-3 h-[180px] relative">
      <img :src="user?.image" :alt="user?.name" class="w-[100px] h-[100px] rounded-full mb-[-50px] text-center flex items-center justify-center text-2xl" />
    </div>
    <div class="py-4 px-2">
      <div class="flex justify-between">
        <h2 class="text-2xl line-clamp-1">{{ user?.name }}</h2>
        <p class="text-xl">{{ user?.phone }}</p>
      </div>
      <router-link class="flex justify-between mt-4" :class="{'text-[var(--dark-primary-500)]': this.$route?.name ==='profile'}" :to="{name: 'profile'}">
        <p>{{ $t('menu.profile') }}</p>
        <Icon icon="oui:arrow-right" width="16" height="16" />
      </router-link>
      <router-link class="flex justify-between mt-4" :class="{'text-[var(--dark-primary-500)]': this.$route?.name ==='favorite'}" :to="{name: 'favorite'}">
        <p>{{ $t('menu.myList') }}</p>
        <Icon icon="oui:arrow-right" width="16" height="16" />
      </router-link>
      <router-link class="flex justify-between mt-4" :class="{'text-[var(--dark-primary-500)]': this.$route?.name ==='history'}" :to="{name: 'history'}">
        <p>{{ $t('menu.history') }}</p>
        <Icon icon="oui:arrow-right" width="16" height="16" />
      </router-link>
      <router-link class="hidden justify-between mt-4" :class="{'text-[var(--dark-primary-500)]': this.$route?.name ==='update'}" :to="{name: 'update'}">
        <p>{{ $t('menu.updates') }}</p>
        <Icon icon="oui:arrow-right" width="16" height="16" />
      </router-link>
      <router-link class="flex justify-between mt-4" :class="{'text-[var(--dark-primary-500)]': this.$route?.name ==='setting'}" :to="{name: 'setting'}">
        <p>{{ $t('menu.settings') }}</p>
        <Icon icon="oui:arrow-right" width="16" height="16" />
      </router-link>
      <router-link class="flex justify-between mt-4" :class="{'text-[var(--dark-primary-500)]': this.$route?.name ==='billing'}" :to="{name: 'billing'}">
        <p>{{ $t('menu.billings') }}</p>
        <Icon icon="oui:arrow-right" width="16" height="16" />
      </router-link>
      <router-link class="flex justify-between mt-4" :class="{'text-[var(--dark-primary-500)]': this.$route?.name ==='subscription'}" :to="{name: 'subscription'}">
        <p>{{ $t('menu.subscriptions') }}</p>
        <Icon icon="oui:arrow-right" width="16" height="16" />
      </router-link>
    </div>
  </div>
  <!-- profile card section end  -->
</template>

<script>
import { authStore } from '@/stores/authStore';
import { siteStore } from '@/stores/SiteStore';
import { Icon } from '@iconify/vue';
import { mapState } from 'pinia';

export default{
  name: "ProfileCard",
  components:{Icon},
  computed:{
    ...mapState(authStore, ['user']),
    ...mapState(siteStore,['myTheme'])
  },
}
</script>
