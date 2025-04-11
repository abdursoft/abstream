import { deletePayments, getPayments, paymentMethodGet } from '@/server/api/apiRoutes'
import axiosClient from '@/service/axios'
import { defineStore } from 'pinia'
import { siteStore } from './SiteStore'

export const paymentStore = defineStore('paymentStore', {
  state: () => {
    return {
      methods: [],
      method: null,
      payments: [],
      payment: null,
      site: siteStore(),
    }
  },
  actions: {
    async getPaymentMethod(id = '') {
      this.site.setLoader(true)
      try {
        this.method = null
        const response = await axiosClient.get(paymentMethodGet + `/${id}`)
        id === '' ? (this.methods = response.data.methods) : (this.method = response.data.methods)
        this.site.setLoader(false)
        return response
      } catch (error) {
        this.site.setLoader(false)
        return error
      }
    },
    async paymentList(id='') {
      this.site.setLoader(true)
      try {
        this.payment = null
        this.payments = null
        const response = await axiosClient.get(getPayments + `/${id}`);
        id === '' ? (this.payments = response.data.payments) : (this.payment = response.data.payments)
        this.site.setLoader(false)
        return response
      } catch (error) {
        this.site.setLoader(false)
        return error
      }
    },
    async removePayment(id){
      this.site.setLoader(true)
      try {
        const response = await axiosClient.delete(deletePayments + `/${id}`);
        this.paymentList();
        this.site.setLoader(false)
        return response
      } catch (error) {
        this.site.setLoader(false)
        return error
      }
    }
  },
})
