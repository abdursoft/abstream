import { genreByContent, genreContent, genreGet, genreTv } from '@/server/api/apiRoutes'
import axiosClient from '@/service/axios'
import { defineStore } from 'pinia'
import { siteStore } from './SiteStore'

export const categoryStore = defineStore('categoryStore', {
  state: () => {
    return {
      categories: [],
      genres: [],
      genre: null,
      episodes: [],
      site: siteStore(),
    }
  },
  actions: {
    async getCategoryList(id = '') {
      this.site.setLoader(true)
      try {
        const response = await axiosClient.get(genreGet + `/${id}`)
        id === '' ? (this.categories = response.data.categories) : true
        this.site.setLoader(false)
        return response
      } catch (error) {
        this.site.setLoader(false)
        return error
      }
    },
    async genreContents(page,type='content') {
      this.site.setLoader(true)
      try {
        const response = await axiosClient.get(genreContent + `/${type}?page=${page}`)
        this.genres = response.data.genre
        this.site.setLoader(false)
        return response
      } catch (error) {
        this.site.setLoader(false)
        return error
      }
    },
    async footerGenres(page,type=content) {
      if (this.genres.length <= 0) {
        this.site.setLoader(true)
        try {
          const response = await axiosClient.get(genreContent + `/${type}?page=${page}`)
          this.genres = response.data.genre
          this.site.setLoader(false)
          return response
        } catch (error) {
          this.site.setLoader(false)
          return error
        }
      }
    },
    async genreByContents(id,type='content') {
      this.site.setLoader(true)
      this.genre = null
      try {
        const response = await axiosClient.get(genreByContent + `/${id}/${type}`)
        this.genre = response.data.genre
        this.site.setLoader(false)
        return response
      } catch (error) {
        this.site.setLoader(false)
        return error
      }
    },
  },
})
