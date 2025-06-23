<template>
  <!-- user favorite section start  -->
  <section class="w-full">
    <h3 class="text-xl">{{ $t('pageTitle.favorite') }}</h3>
    <Divider />
    <div class="w-full card">
        <DataTable :value="favorites" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
            <Column field="content.slug_id" :header="$t('table.id')" ></Column>
            <Column header="Image" >
              <template #body="slotProps">
                <img :src="slotProps.data.content.avatar" :alt="slotProps.data.content.title" class="w-24 rounded" />
              </template>
            </Column>
            <Column field="content.title" header="Title" ></Column>
            <Column field="content.category.name" header="Genre" ></Column>
            <Column  :header="$t('table.actions')">
              <template #body="slotProps">
                <div class="flex items-center justify-center gap-3">
                  <Icon icon="iconamoon:eye-thin" width="24" height="24" class="cursor-pointer hover:text-green-400" @click="openVideo(slotProps.data.content.id,slotProps.data.content.slug_title,slotProps.data.type)" />
                  <Icon icon="weui:delete-on-outlined" width="24" height="24" class="cursor-pointer hover:text-red-400" @click="removeFavorite(slotProps.data.content.id)" />
                </div>
              </template>
            </Column>
        </DataTable>
    </div>
  </section>
  <!-- user favorite section end  -->
</template>

<script>
import router from '@/router';
import { contentStore } from '@/stores/contentStore';
import { favoriteStore } from '@/stores/favoriteStore';
import { Icon } from '@iconify/vue';
import { mapActions, mapState } from 'pinia';

export default{
  name: "FavoritePage",
  components:{Icon},
  methods:{
    ...mapActions(contentStore,  {getContent: 'getContent', viewIncrement: 'contentViews', getRelatedContents: 'getRelatedContents'}),
    ...mapActions(favoriteStore,{getFavorite:'getFavorites',removeFavorite: 'removeFavorite'}),
    openVideo(id,slug,type){
      router.push({name: 'watch', params: {id: id, title: slug, type:type}});
    }
  },
  computed:{
    ...mapState(favoriteStore,['favorites'])
  },
  created(){
    this.getFavorite();
  }
}
</script>
