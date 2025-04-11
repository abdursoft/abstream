import { addComment, getComment, removeComment } from "@/server/api/apiRoutes";
import axiosClient from "@/service/axios";
import { defineStore } from "pinia";

export const commentStore = defineStore('commentStore',{
    state: ()=>{
        return {
            comments:[],
        }
    },
    actions: {
      async getComments(id=''){
          try {
              this.comments = null;
              const response = await axiosClient.get(getComment+`/${id}`);
              this.comments = response.data.comments;
              return response;
          } catch (error) {
              return error;
          }
      },
      async addComment(data){
        try {
          this.comments = null;
          const response = await axiosClient.post(addComment,data);
          this.getComments(data.content_id);
          return response;
        } catch (error) {
            return error;
        }
      },
      async removeComment(contentID,id){
        try {
            const response = await axiosClient.delete(removeComment+`/${id}`);
            this.getComments(contentID);
            return response;
        } catch (error) {
            return error;
        }
      },
    }
})

