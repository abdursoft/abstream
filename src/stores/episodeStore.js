import { episodeAdd, episodeDelete, episodeGet, episodeUpdate } from '@/server/api/apiRoutes'
import axiosClient from '@/service/axios'
import { defineStore } from 'pinia'

export const episodeStore = defineStore('episodeStore', {
  state: () => {
    return {
      episodes: [],
      episode: null,
    }
  },
  actions: {
    async getEpisode(id = '') {
      try {
        this.episode = null
        const response = await axiosClient.get(episodeGet + `/${id}`)
        id === ''
          ? (this.episodes = response.data.episodes)
          : (this.episode = response.data.episodes)
        return response
      } catch (error) {
        return error
      }
    },
  },
})
