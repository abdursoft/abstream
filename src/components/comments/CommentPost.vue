<template>
  <!-- comment form start  -->
  <div class="my-3 flex items-center w-full p-1" v-if="isAuth">
    <InputGroup>
      <InputText v-model="commentForm.description" label="comment" :placeholder="$t('writeComment')" />
      <InputGroupAddon class="cursor-pointer" :class="commentForm.description == '' ? 'disabled':''" @click="postComment()">
      {{ $t('button.send') }}
      </InputGroupAddon>
    </InputGroup>
    <Message v-if="error" severity="error">{{ error }}</Message>
  </div>
  <!-- comment form end  -->
</template>

<script>
import { authStore } from '@/stores/authStore';
import { commentStore } from '@/stores/commentStore';
import { contentStore } from '@/stores/contentStore';
import { mapActions, mapState } from 'pinia';

export default{
  name: 'ComponentPost',
  data(){
    return {
      error:'',
      commentForm: {
        content_id: "",
        description:""
      }
    }
  },
  methods:{
    ...mapActions(commentStore, {newComment: 'addComment'}),
    async postComment(){
      this.commentForm.content_id =this.content?.id;
      const res = await this.newComment(this.commentForm);
      if(res.status === 201){
        this.commentForm.description = "";
      }
    }
  },
  computed:{
    ...mapState(authStore, ['isAuth']),
    ...mapState(contentStore, ['content']),
  }
}
</script>
