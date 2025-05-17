<template>
  <!-- comment render section start  -->
  <div class="hidden md:flex flex-col p-1" v-if="comments?.length > 0">
    <div class="card">
      <Accordion value="0">
        <AccordionPanel value="0">
          <AccordionHeader>
            <div class="w-full flex items-center justify-start gap-4 mb-4">
              <h4 class="text-2xl font-bold">{{ comments?.length }}</h4>
              <h4 class="text-2xl font-bold">{{ $t('comments') }}</h4>
            </div>
          </AccordionHeader>
          <AccordionContent>
            <div class="flex items-start justify-start flex-col mb-4 group" v-for="(item, index) in comments"
              :key="index">
              <div class="flex items-center gap-3">
                <img :src="item.user?.image" :alt="item.user.name[0]"
                  class="rounded-full w-[30px] h-[30px] bg-zinc-400 flex items-center justify-center text-center text-2xl m-0 p-0">
                <p class="font-fold text-xl">@{{ item.user.name }}</p>

                <Icon icon="tabler:trash-x-filled" v-if="item.user.id == user.id" width="24"
                  class="hidden group-hover:block hover:text-red-500 cursor-pointer m-0 p-0" height="24"
                  v-tooltip="'Delete'" placeholder="right" @click="removeComment(content?.id, item.id)" />
              </div>
              <div class="text-normal my-1">
                {{ item.description }}
              </div>
              <div class="hidden flex items-center justify-start gap-4">
                <div class="flex items-center gap-2">
                  <Badge value="9" severity="warn"></Badge>
                  <i class="pi pi-thumbs-up-fill"></i>
                </div>
                <div class="flex items-center gap-2">
                  <Badge value="9" severity="danger"></Badge>
                  <i class="pi pi-thumbs-down-fill"></i>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>
  </div>
  <!-- comment render section end  -->
</template>

<script>
import { authStore } from '@/stores/authStore';
import { commentStore } from '@/stores/commentStore';
import { contentStore } from '@/stores/contentStore';
import { Icon } from '@iconify/vue';
import { mapActions, mapState } from 'pinia';
import { Accordion, AccordionContent, AccordionHeader, AccordionPanel } from 'primevue';

export default {
  name: 'CommentView',
  components: { Icon, Accordion, AccordionContent, AccordionHeader, AccordionPanel },
  methods: {
    ...mapActions(commentStore, { removeComment: 'removeComment' })
  },
  computed: {
    ...mapState(authStore, ['isAuth', 'user']),
    ...mapState(commentStore, ['comments']),
    ...mapState(contentStore, ['content'])
  },
}
</script>
