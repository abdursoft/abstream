import { addFavorite, getFavorite, removeFavorite } from '@/server/api/apiRoutes'
import axiosClient from '@/service/axios'
import { defineStore } from 'pinia'

export const favoriteStore = defineStore('favoriteStore', {
  state: () => {
    return {
      favorite: null,
      favorites: [],
    }
  },
  actions: {
    async getFavorites(id = '') {
      try {
        this.favorites = null
        const response = await axiosClient.get(getFavorite + `/${id}`)
        id === ''
          ? (this.favorites = response.data.favoriteLists)
          : (this.favorite = response.data.favoriteLists)
        return response
      } catch (error) {
        return error
      }
    },
    async addFavorite(data) {
      try {
        this.favorites = null
        const response = await axiosClient.post(addFavorite, data)
        this.getFavorites(data.content_id)
        return response
      } catch (error) {
        return error
      }
    },
    async removeFavorite(id, single = false) {
      try {
        const response = await axiosClient.delete(removeFavorite + `/${id}`)
        single ? this.getFavorites(id) : this.getFavorites()
        return response
      } catch (error) {
        return error
      }
    },
  },
})
