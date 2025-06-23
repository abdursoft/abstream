import { defineStore } from 'pinia'
import { siteStore } from './SiteStore'
import {
  authCheck,
  disable2FactorSecret,
  get2FactorSecret,
  newPassword,
  otpVerify,
  profileData,
  profileImage,
  sendOTP,
  signin,
  signOTP,
  signout,
  signup,
  verify2FactorSecret,
} from '@/server/api/apiRoutes'
import axiosClient from '@/service/axios'
import router from '@/router'
import axios from 'axios'

export const authStore = defineStore('authStore', {
  state: () => {
    return {
      user: null,
      authToken: null,
      isAuth: false,
      subscription: '0',
      site: siteStore(),
      passwordToken: null,
      verifyToken: null,
      google2Fa: null,
    }
  },
  actions: {
    async authUser() {
      this.site.setLoader(true)
      try {
        const res = await axiosClient.post(authCheck)
        this.isAuth = true
        this.user = res.data.user
        this.subscription = res.data.subscription
        this.site.setLoader(false)
        this.authToken = localStorage.getItem('authToken')
        return res
      } catch (error) {
        this.site.setLoader(false)
        return error
      }
    },
    async registerUser(data) {
      this.site.setLoader(true)
      try {
        const res = await axiosClient.post(signup, data)
        this.site.setLoader(false)
        return res
      } catch (error) {
        this.site.setLoader(false)
        return error
      }
    },
    async loginUser(data) {
      this.site.setLoader(true)
      try {
        const res = await axiosClient.post(signin, data)
        this.site.setLoader(false)
        this.isAuth = true
        this.user = res.data.user
        this.authToken = res.data.token
        return res
      } catch (error) {
        this.site.setLoader(false)
        return error
      }
    },
    async setUserData(data) {
      this.site.setLoader(true)
      try {
        const res = await axiosClient.post(profileData, data)
        this.authUser()
        this.site.setLoader(false)
        return res
      } catch (error) {
        this.site.setLoader(false)
        return error
      }
    },
    async userProfile(data) {
      this.site.setLoader(true)
      try {
        let form = new FormData()
        form.append('image', data)
        const res = await axios.post(profileImage, form, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${this.authToken}`,
          },
        })
        this.authUser()
        this.site.setLoader(false)
        return res
      } catch (error) {
        this.site.setLoader(false)
        return error
      }
    },
    async logout() {
      try {
        await axiosClient.post(signout,[]);
        this.isAuth = false
        this.user = null
        this.authToken = false
        this.subscription = '0'
        localStorage.removeItem('authToken')
        router.push({ name: 'home' })
      } catch (error) {
        return error;
      }
    },
    async signupOTPVerify(data) {
      this.site.setLoader(true)
      try {
        const res = await axiosClient.post(signOTP, data, {
          otpToken: localStorage.getItem('otpToken'),
        })
        this.site.setLoader(false)
        return res
      } catch (error) {
        this.site.setLoader(false)
        return error
      }
    },
    async sendPasswordOTP(data) {
      this.site.setLoader(true)
      try {
        const res = await axiosClient.post(sendOTP, data)
        this.passwordToken = res.data.token
        this.site.setLoader(false)
        return res
      } catch (error) {
        this.site.setLoader(false)
        return error
      }
    },
    async verifyPasswordOTP(data) {
      this.site.setLoader(true)
      try {
        const res = await axiosClient.post(otpVerify, data, {
          headers: {
            otp_token: this.passwordToken,
          },
        })
        this.verifyToken = res.data.token
        this.passwordToken = null
        this.site.setLoader(false)
        return res
      } catch (error) {
        this.site.setLoader(false)
        return error
      }
    },
    async setNewPassword(data) {
      this.site.setLoader(true)
      try {
        const res = await axiosClient.post(newPassword, data, {
          headers: {
            new_password_token: this.verifyToken,
          },
        })
        this.site.setLoader(false)
        return res
      } catch (error) {
        this.site.setLoader(false)
        return error
      }
    },
    async get2faSecret() {
      this.site.setLoader(true)
      try {
        const res = await axiosClient.post(get2FactorSecret, [])
        this.site.setLoader(false)
        this.google2Fa = res.data.data
        return res
      } catch (error) {
        this.site.setLoader(false)
        return error
      }
    },
    async verify2faSecret(data) {
      this.site.setLoader(true)
      try {
        const res = await axiosClient.post(verify2FactorSecret, data)
        this.site.setLoader(false)
        this.authUser();
        return res
      } catch (error) {
        this.site.setLoader(false)
        return error
      }
    },
    async remove2faAuth() {
      this.site.setLoader(true)
      try {
        const res = await axiosClient.post(disable2FactorSecret, [])
        this.site.setLoader(false)
        this.google2Fa = null;
        this.authUser();
        return res
      } catch (error) {
        this.site.setLoader(false)
        return error
      }
    },
  },
})
