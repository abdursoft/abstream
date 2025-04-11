<template>
  <div>
    <BreadCum />
    <!-- subscription plan section start  -->
    <section class="mt-[250px] py-[40px] min-h-screen">
      <div class="flex items-center justify-center">
        <div class="container">
          <div class="flex justify-start gap-2">
            <div class="flex flex-col md:flex-row w-full flex-wrap" v-if="!isLoader">
              <!-- single plan start -->
              <div class="md:w-1/2 lg:w-1/4 p-2" v-for="(plan, index) in plans" :key="index">
                <div class="rounded-2xl shadow-lg p-6 text-center w-full relative" :class="{ 'bg-slate-900': myTheme }">
                  <span
                    class="absolute top-[10px] left-[10px] p-1 rounded-md shadow-lg text-sm bg-indigo-500 text-white font-300">{{
                      plan.type }}</span>
                  <h3 class="text-lg font-700 mt-[30px]">{{ plan.title }}</h3>
                  <p class="text-3xl font-bold text-orange-500">${{ plan.price }} <small class="text-sm">{{
                    plan.currency
                      }}</small></p>
                  <div class="flex px-3 items-center justify-start gap-2 my-2" v-for="(item, index) in plan.attributes"
                    :key="index">
                    <span>{{ item.name.symbol }}</span>
                    <p class="font-300">{{ item.value }}</p>
                  </div>
                  <button v-if="isAuth" class="mt-4 bg-orange-500 text-white py-2 px-4 rounded-lg"
                    @click="openPaymentTab(plan.id)">{{ $t('menu.subscribe') }}</button>
                  <Button as="router-link" class="mt-4 bg-teal-500 text-white py-2 px-4 rounded-lg !text-white" v-else
                    :to="{ name: 'signin' }">{{ $t('button.signIn') }}</Button>
                  <div class="mt-3 text-sm font-300" v-html="plan.description">
                  </div>
                </div>
              </div>
              <!-- single plan end  -->
            </div>
            <SkeletonCard :itemLength="6" />
          </div>
        </div>
      </div>
    </section>
    <!-- subscription plan section end  -->
    <!-- payment method section start  -->
    <Dialog v-model:visible="visible" modal header="Pay with Secure" :style="{ width: '50vw' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <div class="flex w-full flex-col md:flex-row justify-start gap-2">
        <div
          class="w-full md:w-1/5 h-[80px] flex items-center justify-center flex-col gap-1 cursor-pointer hover:rounded-md hover:shadow-md hover:bg-white-400"
          v-for="(payment, index) in methods" :key="index" @click="newPayment(payment.name)">
          <img :src="payment.image" :alt="payment.name" class="w-2/3 h-[60px]">
          <h3 class="text-sm">Pay with {{ payment.name }}</h3>
        </div>
      </div>
    </Dialog>
    <!-- payment method section end  -->
  </div>
</template>

<script>
import BreadCum from '@/components/cards/BreadCum.vue';
import { planStore } from '@/stores/planStore';
import { mapActions, mapState } from 'pinia';
import { subscriptionStore } from '@/stores/subscriptionStore';
import { paymentStore } from '@/stores/paymentStore';
import { authStore } from '@/stores/authStore';
import SkeletonCard from '@/components/skeleton/SkeletonCard.vue';
import { siteStore } from '@/stores/SiteStore';

export default {
  name: "UserSubscription",
  components: { BreadCum, SkeletonCard },
  data() {
    return {
      visible: false,
      paymentPlan: {
        plan_id: "",
        pay_method: ""
      }
    }
  },
  methods: {
    ...mapActions(planStore, { getPlans: "getPlanList" }),
    ...mapActions(subscriptionStore, { subscribe: 'subscribe' }),
    ...mapActions(paymentStore, { getPayment: 'getPaymentMethod' }),
    async openPaymentTab(id) {
      this.paymentPlan.plan_id = id;
      this.visible = true;
    },
    async newPayment(id) {
      this.paymentPlan.pay_method = id;
      const res = await this.subscribe(this.paymentPlan);
      if (res.status === 200) {
        window.location.href = res.data.url;
      }
    }
  },
  computed: {
    ...mapState(planStore, ['plans']),
    ...mapState(subscriptionStore, ['paymentInfo']),
    ...mapState(paymentStore, ['methods']),
    ...mapState(authStore, ['isAuth']),
    ...mapState(siteStore, ['isLoader', 'myTheme'])
  },
  created() {
    this.getPlans();
    this.getPayment();
  }
}
</script>
