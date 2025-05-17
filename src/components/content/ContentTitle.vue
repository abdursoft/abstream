<template>
  <!-- content title section start  -->
<div class="flex items-center justify-between my-2 p-1">
  <div class="w-full md:w-3/4">
    <h2 class="text-xl md:text-3xl font-bold line-clamp-1">{{ content?.title }}</h2>
  </div>
  <div class="w-full md:w-1/4 flex items-center justify-end gap-3 group" v-if="isAuth" @click="toggleFavList(content?.id)">
    <div class="flex items-center justify-end gap-4">
      <Button v-if="$props.types == 'content'" class="flex items-center gap-2 !text-white" :severity="favorite ? 'danger' : 'error'">
        {{ favorite ? $t('button.removeFromList') : $t('button.addToList') }}
        <Icon v-if="favorite" icon="mage:shiled-minus" class="cursor-pointer" width="34" height="34" />
        <Icon v-else icon="solar:shield-plus-outline" class="cursor-pointer" width="34" height="34" />
      </Button>
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
import { Button } from 'primevue';

export default{
  name: 'ContentTitle',
  components:{Icon, Button},
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
    },
    toggleFavList(id){
      if(this.favorite){
        this.removeFromList(id);
      }else{
        this.addToList(id);
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
