<template>
  <!-- user billing section start  -->
  <div class="px-2 w-full">
    <h3 class="text-2xl">{{ $t('pageTitle.billings') }}</h3>
    <Divider />
    <DataTable :value="payments" paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]"
      tableStyle="min-width: 50rem">
      <Column field="payment_intent" :header="$t('table.id')"></Column>
      <Column field="amount" :header="$t('table.amount')"></Column>
      <Column :header="$t('table.currency')">
        <template #body="slot">
          {{ slot.data.plan.currency.code }}
        </template>
      </Column>
      <Column :header="$t('table.status')">
        <template #body="slot">
          <span class="px-2 py-1 border-2 rounded-[25px]"
            :class="slot.data.status === 'success' ? 'border-green-300 text-green-400' : 'border-red-300 text-red-400'">{{
              slot.data.status }}</span>
        </template>
      </Column>
    </DataTable>
  </div>
  <!-- user billing section end  -->
</template>

<script>
import { paymentStore } from '@/stores/paymentStore';
import { Icon } from '@iconify/vue';
import { mapActions, mapState } from 'pinia';

export default {
  name: "BillingPage",
  components: { Icon },
  methods: {
    ...mapActions(paymentStore, { getPayments: 'paymentList', removePayment: 'removePayment' }),
    openDetails(){},
  },
  computed: {
    ...mapState(paymentStore, ['payments', 'payment'])
  },
  created() {
    this.getPayments();
  }
}
</script>
