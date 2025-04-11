<template>
  <!-- content title section start  -->
<div class="flex items-center justify-between my-2 p-1">
  <div class="w-full md:w-3/4">
    <h2 class="text-xl md:text-3xl font-bold line-clamp-1">{{ content?.title }}</h2>
  </div>
  <div class="w-full md:w-1/4" v-if="isAuth">
    <div class="flex items-center justify-end gap-4">
      <div v-if="$props.types == 'content'" class="flex items-center gap-2">
        <Icon v-if="favorite" icon="mage:shiled-minus" @click="removeFromList(content?.id)" class="cursor-pointer hover:text-red-500" width="34" height="34" />
        <Icon v-else icon="solar:shield-plus-outline" @click="addToList(content?.id)" class="cursor-pointer hover:text-red-500" width="34" height="34" />
      </div>
    </div>
  </div>
</div>
<!-- content title section end  -->
</template>


<script>
import { authStore } from '@/stores/authStore';
import { contentStore } from '@/stores/contentStore';
import { favoriteStore } from '@/stores/favoriteStore';
import { Icon } from '@iconify/vue';
import { mapActions, mapState } from 'pinia';

export default{
  name: 'ContentTitle',
  components:{Icon},
  props:{
    types:{
      String,
      default:'content'
    }
  },
  methods:{
    ...mapActions(favoriteStore,{addFavorite: 'addFavorite', getFavorite: 'getFavorites', removeFavorite: 'removeFavorite'}),
    async addToList(id){
      const res = await this.addFavorite({content_id: id});
      if(res.status === 201){
        this.$toast.add({severity:'success', detail:res.data?.message, life:3000, group:'br'});
      }else{
        this.$toast.add({severity:'danger', detail:res.data?.message, life:3000, group:'br'});
      }
    },
    async removeFromList(id){
      const res = await this.removeFavorite(id,true);
      if(res.status === 200){
        this.$toast.add({severity:'success', detail:res.data?.message, life:3000, group:'br'});
      }else{
        this.$toast.add({severity:'danger', detail:res.data?.message, life:3000, group:'br'});
      }
    }
  },
  computed:{
    ...mapState(authStore, ['isAuth']),
    ...mapState(contentStore, ['content']),
    ...mapState(favoriteStore, ['favorite'])
  }
}
</script>
