<template>
  <!-- user subscription list start  -->
  <section class="px-2 w-full">
    <h3 class="text-2xl">{{ $t('pageTitle.subscriptions') }}</h3>
    <Divider />
    <DataTable :value="subscriptions" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
      tableStyle="min-width: 50rem">
      <Column field="id" :header="$t('table.id')"></Column>
      <Column field="plan.title" :header="$t('table.plan')"></Column>
      <Column field="price" :header="$t('table.amount')"></Column>
      <Column field="plan.currency" :header="$t('table.currency')"></Column>
      <Column :header="$t('table.expire')">
        <template #body="slot">
          {{ formattedDate(slot.data.end_date) }}
        </template>
      </Column>
      <Column :header="$t('table.status')">
        <template #body="slot">
          <span class="px-2 py-1 border-2 rounded-[25px]"
            :class="statusClass(slot.data.status)">{{
              slot.data.status }}</span>
        </template>
      </Column>
    </DataTable>
  </section>
  <!-- user subscription list end  -->
</template>

<script>
import { subscriptionStore } from '@/stores/subscriptionStore';
import { Icon } from '@iconify/vue';
import { mapActions, mapState } from 'pinia';
import dateFormat from 'dateformat';

export default{
  name: 'SubscriptionPage',
  components:{Icon},
  methods:{
    ...mapActions(subscriptionStore, {getSubscription: 'getSubscription', removeSubscription: 'removeSubscription'}),
    openDetails(){},
    formattedDate(date){
      return dateFormat(date,'longDate')
    },
    statusClass(status){
      if(status == 'active'){
        return "border-green-300 text-green-400";
      }else if(status == 'completed'){
        return "border-yellow-300 text-yellow-400";
      }else{
        return "border-red-300 text-red-400";
      }
    }
  },
  computed:{
    ...mapState(subscriptionStore, ['subscriptions'])
  },
  created(){
    this.getSubscription();
  }
}
</script>
