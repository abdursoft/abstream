import { getPage, siteData } from "@/server/api/apiRoutes";
import axiosClient from "@/service/axios";
import { defineStore } from "pinia";

export const siteStore = defineStore('siteStore',{
    state : ()=>{
        return {
          isLoader:false,
          formLoader:false,
          bonus:null,
          lang:"BN",
          siteData:null,
          activeHeader:false,
          myTheme:true,
          backToTop:false,
          hideFooter:false,
          autoPlayNext:false,
          nextContent:null,
          player:null,
          pages:[],
          page:null
        }
      },
      actions:{
        setLoader( load=true){
          this.isLoader = load;
        },
        setLang(key){
          this.lang = key;
          if(this.player){
            this.player.lang(key);
          }
        },
        setPlayer(data){
          this.player = data;
        },
        setFormLoader(load){
          this.formLoader = load;
        },
        setTheme(key){
            this.myTheme = key;
        },
        setActiveHeader(value){
          this.activeHeader = value;
        },
        setFooter(status){
          this.hideFooter = status;
        },
        setAutoplay(value){
          this.autoPlayNext = value;
        },
        setNextContent(content){
          this.player.next(content);
        },
        setBackToTop(key){
          this.backToTop = key;
        },
        async getSiteInfo(){
          this.isLoader = true;
          try {
            const response = await axiosClient.get(siteData);
            this.isLoader = false;
            this.siteData = response.data.site_data;
            return response;
          } catch (error) {
            this.isLoader = false;
            return error;
          }
        },
        async getPage(id=''){
          this.isLoader = true;
          try {
            const response = await axiosClient.get(getPage+`/${id}`);
            this.isLoader = false;
            id !== '' ? this.page = response.data.pages : this.pages = response.data.pages;
            return response;
          } catch (error) {
            this.isLoader = false;
            return error;
          }
        },
    }
})
