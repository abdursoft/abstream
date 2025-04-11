
import axiosClient from "@/service/axios";
import { defineStore } from "pinia";
import { siteStore } from "./SiteStore";
import { planGet } from "@/server/api/apiRoutes";

export const planStore = defineStore('planStore',{
    state: ()=>{
        return {
            plan: null,
            plans: [],
            site: siteStore()
        }
    },
    actions:{
        async getPlanList(id=''){
            this.site.setLoader(true);
            try {
                const response = await axiosClient.get(planGet+`/${id}`);
                id === '' ? this.plans = response.data.plans : this.plan  = response.data.plan;
                this.site.setLoader(false);
                return response;
            } catch (error) {
                this.site.setLoader(false);
                return error;
            }
        }
    }
});
