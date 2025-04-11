import { langAdd, langDelete, langGet, langUpdate } from '@/server/api/apiRoutes'
import axiosClient from '@/service/axios'
import { defineStore } from 'pinia'

export const langStore = defineStore('langStore', {
  state: () => {
    return {
      languages: [],
    }
  },
  actions: {
    async getLanguageList(id = '') {
      try {
        const response = await axiosClient.get(langGet + `/${id}`)
        id === '' ? (this.languages = response.data.languages) : true
        return response
      } catch (error) {
        return error
      }
    },
  },
})
