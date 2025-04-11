<template>
  <div class="hidden md:flex items-center justify-start">
    <Button @click="isOpen = !isOpen" class="!bg-transparent !p-1" v-if="!isOpen">
      <Icon icon="lucide:search" class="text-white" width="24" height="24" />
    </Button>
    <!-- Content search form start  -->
     <div v-if="isOpen" class="flex flex-col gap-1 relative" id="overlay_menu">
      <div class="flex items-center w-full justify-between">
        <TextInput v-model="search_key" :placeholder="$t('titleOrKeywords')" />
        <Button @click="isOpen = !isOpen" class="!bg-transparent !p-1">
          <Icon icon="hugeicons:search-remove" class="text-white" width="24" height="24" />
        </Button>
      </div>
      <div class="suggestion flex items-start gap-3 flex-column bg-white-700 shadow-md absolute mt-[50px] w-full">
        <div v-if="!contents" class="flex items-center justify-center text-center min-h-[100px] font-700 text-white-400 w-full">{{ $t('table.title') }}</div>
      </div>
     </div>
    <!-- Content search form end  -->
  </div>
</template>


<script>
import { Icon } from '@iconify/vue';
import TextInput from '../global/TextInput.vue';

export default {
  name: "SearchMenu",
  components:{Icon, TextInput},
  data() {
    return {
      search_key:"",
      isOpen:false,
      contents:null
    }
  },
  methods: {
    async makeSearch(){

    }
  },
  watch:{
    search_key: {
      handler(value){
        console.log(value);
      }
    }
  },
  mounted(){
    console.log(this.$refs.menu);
  }
}
</script>
