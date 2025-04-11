import { personAdd, personDelete, personFilter, personGet, personUpdate } from "@/server/api/apiRoutes";
import axiosClient from "@/service/axios";
import { defineStore } from "pinia";

export const personStore = defineStore('personStore',{
    state: ()=>{
        return {
            persons: []
        }
    },
    actions:{
      async getPersonList(id=''){
          try {
              const response = await axiosClient.get(personGet+`/${id}`);
              id === '' ? this.persons = response.data.persons : true;
              return response;
          } catch (error) {
              return error;
          }
      },
    }
});
