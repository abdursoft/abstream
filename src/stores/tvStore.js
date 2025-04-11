import { genreTv, getTv, otherTv, playTv, relatedTv } from '@/server/api/apiRoutes'
import axiosClient from '@/service/axios'
import { defineStore } from 'pinia'
import { siteStore } from './SiteStore'

export const tvStore = defineStore('tvStore', {
  state: () => {
    return {
      tvs: [],
      tv: null,
      tvGenre: null,
      tvGenres: [],
      relatedTv:[],
      otherTv:[],
      site: siteStore(),
    }
  },
  actions: {
    async genreTvs() {
      this.site.setLoader(true)
      try {
        const response = await axiosClient.get(genreTv)
        this.tvGenres = response.data.genre
        this.site.setLoader(false)
        return response
      } catch (error) {
        this.site.setLoader(false)
        return error
      }
    },
    async getTv(id = '') {
      this.site.setLoader(true)
      try {
        this.tv = null
        const response = await axiosClient.get(getTv + `/${id}`)
        id === '' ? (this.tvs = response.data.tvs) : (this.tv = response.data.tvs);
        this.site.setLoader(false);
        return response
      } catch (error) {
        this.site.setLoader(false);
        return error
      }
    },
    async playTv(id) {
      this.site.setLoader(true)
      try {
        const response = await axiosClient.post(playTv, { content: id});
        if(response.status === 200){
          return response.data.contentURL;
        }
        return false;
      } catch (error) {
        return error
      }
    },
    async getRelatedTv(id = '') {
      this.site.setLoader(true)
      try {
        this.tv = null
        const response = await axiosClient.get(relatedTv + `/${id}`);
        this.relatedTv = response.data.tvs.data;
        this.site.setLoader(false);
        return response
      } catch (error) {
        this.site.setLoader(false);
        return error
      }
    },
    async getOthersTv(id) {
      this.site.setLoader(true)
      try {
        this.tv = null
        const response = await axiosClient.get(otherTv + `/${id}`);
        this.otherTv = response.data.tvs;
        this.site.setLoader(false);
        return response
      } catch (error) {
        this.site.setLoader(false);
        return error
      }
    },
  },
})
