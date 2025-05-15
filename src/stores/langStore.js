import { langGet } from '@/server/api/apiRoutes'
import axiosClient from '@/service/axios'
import { defineStore } from 'pinia'

export const langStore = defineStore('langStore', {
  state: () => {
    return {
      language: null,
    }
  },
  actions: {
    async getLanguage(id = '1') {
      try {
        const response = await axiosClient.get(langGet + `/${id}`)
        this.language = response.data.languages
        return response
      } catch (error) {
        return error
      }
    },
  },
})
