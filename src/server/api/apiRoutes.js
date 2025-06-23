import install from '@/install'

// import host
const { host } = install

// base routes
export const ROOT_URL = `${host}/api/v1/`
export const BASE_URL = `${ROOT_URL}client/`
export const AUTH_URL = `${ROOT_URL}auth/`
export const USER_URL = `${ROOT_URL}user/`
export const PASSWORD_URL = `${ROOT_URL}password/`

// get site data
export const siteData = `${BASE_URL}site-data`

// slider data
export const sliderData = `${BASE_URL}slider-data`

// category routes
export const genreGet = `${BASE_URL}genre/list`
export const genreContent = `${BASE_URL}genre-contents`
export const genreByContent = `${BASE_URL}content-by-genre`

// person routes
export const personGet = `${BASE_URL}person/open`

// news latter and contact form
export const newsLatter = `${BASE_URL}news-latter`
export const contactForm = `${BASE_URL}contact`

// plans routes
export const planGet = `${BASE_URL}plan`

// page controller
export const getPage = `${BASE_URL}pages`

// language routes
export const langGet = `${BASE_URL}langs`

// content routes
export const contentGet = `${BASE_URL}contents`
export const contentPlay = `${BASE_URL}play`
export const contentView = `${BASE_URL}content-view`
export const relatedContents = `${BASE_URL}related-contents`
export const recommendedContents = `${BASE_URL}recommended-contents`
export const contentHistory = `${USER_URL}content/history`
export const contentRating = `${USER_URL}content/rating`
export const titleSearch = `${BASE_URL}search`
export const contentSearch = `${BASE_URL}contents-search`
export const contentRatings = `${BASE_URL}contents-ratings`
export const contentEpisodes = `${BASE_URL}content-episodes`

// episode routes
export const episodeGet = `${BASE_URL}episode/open`

// payment method routes
export const paymentMethodGet = `${BASE_URL}payment-method`

// authentication and password
export const signup = `${AUTH_URL}signup`
export const signin = `${AUTH_URL}signin`
export const signout = `${AUTH_URL}signout`
export const signOTP = `${AUTH_URL}signup-otp-verify`
export const authCheck = `${AUTH_URL}check`

// 2factor authentication
export const get2FactorSecret = `${AUTH_URL}2fa/secret`
export const verify2FactorSecret = `${AUTH_URL}2fa/verify`
export const disable2FactorSecret = `${AUTH_URL}2fa/disable`

// comment controller
export const getComment = `${USER_URL}comment/list`
export const addComment = `${USER_URL}comment/create`
export const removeComment = `${USER_URL}comment/delete`

// favorite list controller
export const getFavorite = `${USER_URL}favorite/list`
export const addFavorite = `${USER_URL}favorite/create`
export const removeFavorite = `${USER_URL}favorite/delete`

// subscription controller
export const getSubscription = `${USER_URL}subscription/list`
export const makeSubscription = `${USER_URL}subscription/create`
export const deleteSubscription = `${USER_URL}subscription/delete`

// Payments controller
export const getPayments = `${USER_URL}payment/list`
export const deletePayments = `${USER_URL}payment/delete`

// profile controller
export const profileData = `${USER_URL}profile/data`
export const profileImage = `${USER_URL}profile/image/update`

// tv controller
export const getTv = `${BASE_URL}tv/list`
export const playTv = `${BASE_URL}tv/play`
export const relatedTv = `${BASE_URL}tv/related`
export const genreTv = `${BASE_URL}tv/genre`
export const otherTv = `${BASE_URL}tv/others`

// password controller
export const sendOTP = `${PASSWORD_URL}send-otp`
export const otpVerify = `${PASSWORD_URL}verify-otp`
export const newPassword = `${PASSWORD_URL}new-password`

// player data
export const getPlayer = `${BASE_URL}player-data`;
