<template>
  <div class="flex items-center">
    <Button @click="toggle" class="!bg-transparent !p-1">
      <Icon icon="hugeicons:user-sharing" class="text-white" width="24" height="24" />
    </Button>
    <!-- user profile dropdown menu start  -->
    <Menu :popup="true" ref="menu" id="overlay_menu" :model="panelItem">
      <template #start>
        <span class="flex items-start gap-1 px-2 py-2 flex-col">
          <span class="text-md font-semibold">{{ $t('myAccount') }}</span>
          <Divider class="!m-0" />
        </span>
      </template>
      <template #item="{ item }">
        <router-link v-ripple class="flex items-center p-1" :to="item.action">
          <span :class="item.icon" />
          <span>{{ $t(item.label) }}</span>
        </router-link>
      </template>
    </Menu>
    <!-- user profile dropdown menu end  -->
  </div>
</template>


<script>
import { Icon } from '@iconify/vue';

export default {
  name: "ProfileMenu",
  components: { Icon },
  data() {
    return {
      panelItem: [
        {
          label: 'menu.profile',
          action: "/user/profile"
        },
        {
          label: 'menu.history',
          action: "/user/history"
        },
        {
          label: 'menu.updates',
          action: "/user/update"
        },
        {
          label: 'menu.settings',
          action: "/user/setting"
        },
        {
          label: 'menu.billings',
          action: "/user/billing"
        },
        {
          label: 'menu.subscriptions',
          action: "/user/subscription"
        },
      ]
    }
  },
  methods: {
    toggle(event) {
      this.$refs.menu.toggle(event);
    }
  }
}
</script>
