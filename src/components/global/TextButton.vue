<template>
  <button class="btn btn-block text-center rounded-[20px] min-h-[55px] px-10 text-white mt-3 py-2 w-full flex items-center justify-center gap-5" :class="background" :type="type" @click="action">{{ title }} <Icon v-show="icon" :icon="icon" width="38" height="38"></Icon> <Icon icon="svg-spinners:eclipse-half" v-show="isLoader" class="text-white" width="38" height="38" /></button>
</template>

<script>
import { siteStore } from '@/stores/SiteStore';
import { Icon } from '@iconify/vue';
import { mapState } from 'pinia';
export default{
  props:{
    title: {
      type:String,
      required:true
    },
    type:{
      type:String,
      default:"button"
    },
    background:{
      type:String,
      default:"bg-cyan-600 hover:bg-red-400 duration-[500ms]"
    },
    loading:{
      Boolean,
      default: false
    },
    icon:{
      String
    }
  },
  components:{Icon},
  methods:{
  },
  computed:{
    ...mapState(siteStore,['isLoader'])
  }
}
</script>
