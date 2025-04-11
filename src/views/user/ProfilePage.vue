<template>
  <!-- user's analytics section start  -->
  <section class="w-full px-2 ">
    <h2 class="text-2xl">{{ $t('pageTitle.profile') }}</h2>
    <div class="w-full min-h-[440px] flex items-start justify-start flex-wrap mt-4" v-if="isLoader">
      <div class="w-2/4 md:w-1/4 !h-[140px] px-2 my-2" v-for="(item, index) in 3" :key="index">
        <Skeleton class="shadow-lg rounded-md" width="100%" height="100%"></Skeleton>
      </div>
    </div>
    <div class="mt-4 w-full flex flex-row justify-start flex-wrap" v-else>
      <div class="p-2 w-1/2 md:w-1/4 h-[140px]">
        <div class="rounded-md shadow-lg w-full h-full flex items-center justify-center flex-col"
          :class="{ 'bg-slate-900': myTheme }">
          <h2 class="text-xl text-bold">{{ $t('profile.subscriptions') }}</h2>
          <p class="text-xl">{{ $n(subscriptions?.length) }}</p>
        </div>
      </div>
      <div class="p-2 w-1/2 md:w-1/4 h-[140px]">
        <div class="rounded-md shadow-lg w-full h-full flex items-center justify-center flex-col"
          :class="{ 'bg-slate-900': myTheme }">
          <h2 class="text-xl text-bold">{{ $t('profile.payments') }}</h2>
          <p class="text-xl">{{ $n(payments?.length) }}</p>
        </div>
      </div>
      <div class="p-2 w-1/2 md:w-1/4 h-[140px]">
        <div class="rounded-md shadow-lg w-full h-full flex items-center justify-center flex-col"
          :class="{ 'bg-slate-900': myTheme }">
          <h2 class="text-xl text-bold">{{ $t('profile.favoriteList') }}</h2>
          <p class="text-xl">{{ $n(favorites?.length) }}</p>
        </div>
      </div>
    </div>
  </section>
  <!-- user's analytics section end  -->
</template>

<script>
import { authStore } from '@/stores/authStore';
import { favoriteStore } from '@/stores/favoriteStore';
import { paymentStore } from '@/stores/paymentStore';
import { siteStore } from '@/stores/SiteStore';
import { subscriptionStore } from '@/stores/subscriptionStore';
import { mapActions, mapState } from 'pinia';

export default {
  name: "ProfilePage",
  methods: {
    ...mapActions(authStore, { getAuth: 'authUser' }),
    ...mapActions(paymentStore, { getPaymentStore: 'paymentList' }),
    ...mapActions(favoriteStore, { getFavorites: 'getFavorites' }),
    ...mapActions(subscriptionStore, { getSubscription: 'getSubscription' }),
    show() {
      this.$toast.add({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 3000 });
    }
  },
  computed: {
    ...mapState(authStore, ['user']),
    ...mapState(paymentStore, ['payments']),
    ...mapState(subscriptionStore, ['subscriptions']),
    ...mapState(favoriteStore, ['favorites']),
    ...mapState(siteStore, ['isLoader', 'myTheme'])
  },
  created() {
    this.getPaymentStore();
    this.getFavorites();
    this.getSubscription();
  }
}
</script>
