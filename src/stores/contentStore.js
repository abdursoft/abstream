import { contentEpisodes, contentGet, contentHistory, contentPlay, contentRating, contentRatings, contentSearch, contentView, genreContent, recommendedContents, relatedContents, sliderData, titleSearch } from '@/server/api/apiRoutes'
import axiosClient from '@/service/axios'
import { defineStore } from 'pinia'
import { siteStore } from './SiteStore'

export const contentStore = defineStore('contentStore', {
  state: () => {
    return {
      contents: [],
      content: null,
      history:[],
      relatedContents: [],
      recommendedItems:[],
      ratings:null,
      sliders:[],
      site:siteStore()
    }
  },
  actions: {
    async getContent(id = null,type='content') {
      if(id){
        this.site.setLoader(true);
        try {
          this.content = null
          const response = await axiosClient.get(contentGet + `/${id}/${type}`)
          id === ''
            ? (this.contents = response.data.contents)
            : (this.content = response.data.contents)
          this.site.setLoader(false);
          return response
        } catch (error) {
          this.site.setLoader(false);
          return error
        }
      }
    },
    async getRelatedContents(id,type='content') {
      this.site.setLoader(true);
      try {
        const response = await axiosClient.get(relatedContents + `/${id}/${type}`)
        this.relatedContents = response.data.contents.data
        if(this.site.autoPlayNext && this.relatedContents.length > 0){
          this.site.setNextContent(this.relatedContents[0]);
        }
        this.site.setLoader(false);
        return response
      } catch (error) {
        this.site.setLoader(false);
        return error
      }
    },
    async getRecommendedContents(id,type='content') {
      this.site.setLoader(true);
      try {
        const response = await axiosClient.get(recommendedContents + `/${id}/${type}`)
        this.site.setLoader(false);
        this.recommendedItems = response.data.contents;
        return response
      } catch (error) {
        this.site.setLoader(false);
        return error
      }
    },
    async getContentByGenre(id) {
      this.site.setLoader(true);
      try {
        const response = await axiosClient.get(genreContent + `/${id}`)
        this.site.setLoader(false);
        return response
      } catch (error) {
        this.site.setLoader(false);
        return error
      }
    },
    async sliderImage() {
      this.site.setLoader(true);
      try {
        const response = await axiosClient.get(sliderData)
        this.site.setLoader(false);
        this.sliders = response.data.sliders;
        return response
      } catch (error) {
        this.site.setLoader(false);
        return error
      }
    },
    async contentViews(id) {
      try {
        const response = await axiosClient.post(contentView, { id: id })
        return response
      } catch (error) {
        return error
      }
    },
    async playVideo(content, type='content'){
      try {
        const response = await axiosClient.post(contentPlay, { content: content, type: type});
        if(response.status === 200){
          return response.data.contentURL;
        }
        return false;
      } catch (error) {
        return error
      }
    },
    async contentEpisodes(id) {
      try {
        const response = await axiosClient.get(`${contentEpisodes}/${id}`);
        return response
      } catch (error) {
        return error
      }
    },
    async userView(page=1) {
      this.site.setLoader(true);
      try {
        const response = await axiosClient.get(contentHistory+`?page=${page}`)
        this.history = response.data.contents.data
        this.site.setLoader(false);
        return response
      } catch (error) {
        this.site.setLoader(false);
        return error
      }
    },
    async rates(data){
      this.site.setLoader(true);
      try{
        const response = await axiosClient.post(contentRating,data)
        this.site.setLoader(false);
        this.getRatings(data.content_id);
        return response
      }catch(error){
        console.log(error);
      }
    },
    async search(key,page){
      this.site.setLoader(true);
      try{
        const response = await axiosClient.get(`${contentSearch}?q=${key}&page=${page}`);
        this.site.setLoader(false);
        return response;
      }catch(error){
        this.site.setLoader(false);
        console.log(error);
      }
    },
    async titleSearch(key,page=1){
      try{
        const response = await axiosClient.get(`${titleSearch}?q=${key}&page=${page}`);
        return response.data.contents.data
      }catch(error){
        console.log(error);
      }
    },
    async getRatings(id){
      this.site.setLoader(true);
      try{
        const response = await axiosClient.get(contentRatings+`/${id}`);
        this.site.setLoader(false);
        this.ratings = response.data.ratings;
        return response
      }catch(error){
        console.log(error);
      }
    },
    getStyle(type){
      if(type === 'regular'){
        return 'h-[200px] md:h-[250px] lg:h-[320px] xl:h-[360px] w-1/2 md:w-1/6 lg:w-1/7';
      }
      else if(type === 'large'){
        return 'h-[220px] md:h-[290px] lg:h-[350px] xl:h-[390px] w-1/2 md:w-1/5';
      }
      else if(type === 'portrait'){
        return 'h-[100px] md:h-[120px] lg:h-[180px] xl:h-[200px] w-1/2 md:w-1/5';
      }else{
        return 'min-h-[220px] md:min-h-[480px] w-full';
      }
    }
  },
})
