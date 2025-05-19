<template>
  <!-- content details section start  -->
  <div class="card">
    <Tabs v-model:value="value">
      <TabList>
        <Tab value="0">{{ $t('description') }}</Tab>
        <Tab value="1">{{ $t('cast') }}</Tab>
        <Tab v-if="$props.types == 'content'" value="2">{{ $t('reviews') }}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <!-- details section start  -->
          <div class="m-0" v-html="content?.description"></div>
          <!-- details section end  -->
        </TabPanel>
        <TabPanel value="1">
          <!-- cast section start  -->
          <div class="m-0 w-full">
            <h3 class="text-xl mt-3">{{ $t('actors') }}:</h3>
            <div class="flex items-start justify-start flex-wrap gap-4 mt-3">
              <div
                class="w-[130px] h-[100px] flex items-center flex-col gap-3 justify-center text-center text-md font-bold cursor-pointer"
                v-for="(item, index) in content?.content_actor" :key="index" @click="this.personInfo = item.actor.bio">
                <img :src="item?.actor.image" :alt="item?.actor.name" class="!w-[60px] !h-[60px] rounded-full">
                <span class="line-clamp-1">{{ item?.actor.name }}</span>
              </div>
            </div>
            <h3 class="text-xl mt-14">{{ $t('producers') }}:</h3>
            <div class="flex items-start justify-start flex-wrap gap-4 mt-3">
              <div
                class="w-[130px] h-[100px] flex items-center flex-col gap-3 justify-center text-center text-md font-bold cursor-pointer"
                v-for="(item, index) in content?.content_director" :key="index"
                @click="this.personInfo = item.director.bio">
                <img :src="item?.director.image" :alt="item?.director.name" class="!w-[60px] !h-[60px] rounded-full">
                <span class="line-clamp-1">{{ item?.director.name }}</span>
              </div>
            </div>
          </div>
          <!-- cast section end  -->
        </TabPanel>
        <TabPanel value="2">
          <div class="m-0" v-if="isAuth">
            <!-- review section start  -->
            <div class="flex items-start flex-col gap-3 w-full mb-[30px]">
              <Rating v-model="rateForm.rating" />
              <FloatLabel variant="on" class="w-full">
                <Textarea id="review" v-model="rateForm.review" rows="5" cols="30" class="w-full"
                  style="resize: none" />
                <label for="review">{{ $t('reviewWrite') }}</label>
              </FloatLabel>
              <Button :label="$t('button.send')" severity="success" @click="userRating()" class="!p-1" />
            </div>
            <div v-for="(item, index) in ratings" :key="index">
              <div class="flex items-center justify-between my-1">
                <div class="flex items-center gap-3">
                  <img :src="item.user.image" :alt="item.user.name" class="w-[30px] h-[30px] rounded-full">
                  <p>{{ item.user.name }}</p>
                </div>
                <div class="flex items-center gap-1">
                  <Icon icon="fluent-color:star-48" v-if="item.rating" width="18" height="18" /> {{ item.rating }}
                </div>
              </div>
              <div class="text-justify">{{ item?.review }}</div>
            </div>
            <!-- review section end  -->
          </div>
          <div class="min-h-[250px] flex items-center justify-center" v-else>
            <Button as="router-link" severity="primary" to="/signin" class="!py-1 !text-white">{{
              $t('button.signIn')}}</Button>
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
    <div class="card mt-3 round-md" v-if="personInfo && value == '1'" v-html="personInfo"></div>
  </div>
  <!-- content details section end  -->
</template>

<script>
import { authStore } from '@/stores/authStore';
import { contentStore } from '@/stores/contentStore';
import { Icon } from '@iconify/vue';
import { mapActions, mapState } from 'pinia';
import { Button } from 'primevue';

export default {
  name: "ContentDetails",
  components: { Icon, Button },
  props: {
    types: {
      String,
      default: 'content'
    }
  },
  data() {
    return {
      value: '0',
      rateForm: {
        rating: '0',
        review: '',
        user_id: '',
        content_id: ''
      },
      personInfo: null
    }
  },
  methods: {
    ...mapActions(contentStore, { newRating: 'rates', getRating: 'getRatings' }),
    async userRating() {
      this.rateForm.user_id = this?.user.id;
      this.rateForm.content_id = this?.content.id;
      const res = await this.newRating(this.rateForm);
      if (res.status === 201) {
        this.$toast.add({ severity: 'success', summary: 'rating inserted', detail: res.data.message, life: 3000, group: 'br' });
        this.rateForm.rating = '0';
        this.rateForm.review = '';
      } else {
        this.$toast.add({ severity: 'danger', summary: 'internal error', detail: res.data.message, life: 3000, group: 'br' });
      }
    },
  },
  computed: {
    ...mapState(contentStore, ['content', 'ratings']),
    ...mapState(authStore, ['user', 'isAuth']),
  },
  watch: {
    "$route.params.id": {
      handler(id) {
        if (id !== this.content?.id) {
          this.personInfo = null;
        }
      }
    },
  }
}
</script>
