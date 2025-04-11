import { contactForm, deleteSubscription, getSubscription, makeSubscription, newsLatter } from '@/server/api/apiRoutes'
import axiosClient from '@/service/axios'
import { defineStore } from 'pinia'
import { siteStore } from './SiteStore'

export const subscriptionStore = defineStore('subscriptionStore', {
  state: () => {
    return {
      subscription: null,
      subscriptions: [],
      relatedContents: [],
      paymentInfo:null,
      site: siteStore()
    }
  },
  actions: {
    async subscribe(data) {
      this.site.setLoader(true);
      try {
        this.content = null
        const response = await axiosClient.post(makeSubscription,data);
        this.paymentInfo = response.data.payment;
        this.site.setLoader(false);
        return response
      } catch (error) {
        this.site.setLoader(false);
        return error
      }
    },
    async getSubscription(id='') {
      this.site.setLoader(true);
      try {
        const response = await axiosClient.get(getSubscription + `/${id}`);
        this.site.setLoader(false);
        id==='' ? this.subscriptions = response.data.subscriptions : this.subscription = response.data.subscriptions;
        return response
      } catch (error) {
        this.site.setLoader(false);
        return error
      }
    },
    async removeSubscription(id) {
      this.site.setLoader(true);
      try {
        const response = await axiosClient.get(deleteSubscription + `/${id}`);
        this.getSubscription();
        this.site.setLoader(false);
        return response
      } catch (error) {
        this.site.setLoader(false);
        return error
      }
    },
    async newsSubscription(data) {
      try {
        const response = await axiosClient.post(newsLatter,data);
        return response
      } catch (error) {
        return error
      }
    },
    async postContactForm(data) {
      this.site.setLoader(true);
      try {
        const response = await axiosClient.post(contactForm,data);
        this.site.setLoader(false);
        return response
      } catch (error) {
        this.site.setLoader(false);
        return error
      }
    },
  },
})
