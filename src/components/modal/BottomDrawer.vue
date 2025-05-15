<template>
  <!-- small device pages start  -->
  <Drawer v-bind:visible="isDrawer" :showCloseIcon="false" position="bottom" style="height: auto">
    <div class="flex items-center justify-end w-full h-[50px]">
      <span class="w-[40px] h-[40px] rounded-full shadow-md flex items-center justify-center cursor-pointer" @click="controlDrawer"><Icon icon="iconoir:cancel" width="24" height="24" /></span>
    </div>
    <div class="my-3">
      <p>{{ $t('pages') }}</p>
      <div class="flex items-center gap-3">
        <router-link class="p-1 rounded-md border-2" :to="{name:'subscribe'}">{{ $t('menu.subscribe') }}</router-link>
        <router-link class="p-1 rounded-md border-2" :to="{name:'contactUs'}">{{ $t('menu.contact') }}</router-link>
      </div>
    </div>
  </Drawer>
  <!-- small device pages end  -->
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
  name: "BottomDrawer",
  components:{Icon},
  props:{
    isDrawer:{
      Boolean,
      default:false
    },
    changeDrawer:{
      Function
    }
  },
  data(){
    return {
      moreDrawer:true
    }
  },
  emits:['changeDrawer'],
  methods: {
    controlDrawer(){
      this.$emit('changeDrawer',!this.$props.isDrawer);
    }
  },
}
</script>
