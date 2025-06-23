// src/i18n.js
import { createI18n } from 'vue-i18n'

import EN from './i18/EN.json'
import BN from './i18/BN.json'
import AR from './i18/AR.json'
import CN from './i18/CN.json'
import DA from './i18/DA.json'
import DE from './i18/DE.json'
import ES from './i18/ES.json'
import FR from './i18/FR.json'
import HE from './i18/HE.json'
import HN from './i18/HN.json'
import ID from './i18/ID.json'
import IT from './i18/IT.json'
import JP from './i18/JP.json'
import RU from './i18/RU.json'
import SV from './i18/SV.json'
import TH from './i18/TH.json'
import UR from './i18/UR.json'

const messages = {
  EN, BN, AR, CN, DA, DE, ES, FR, HE, HN,
  ID, IT, JP, RU, SV, TH, UR
}

const numberFormats = {
  'en-US': { currency: { style: 'currency', currency: 'USD' }, decimal: { style: 'decimal', minimumFractionDigits: 2 }, percent: { style: 'percent' } },
  'bn-BD': { currency: { style: 'currency', currency: 'BDT' }, decimal: { style: 'decimal', minimumFractionDigits: 2 }, percent: { style: 'percent' } },
  'hi-IN': { currency: { style: 'currency', currency: 'INR' }, decimal: { style: 'decimal', minimumFractionDigits: 2 }, percent: { style: 'percent' } },
  // ... (other number formats, same as you have now)
}

export function createCustomI18n(locale = 'EN') {
  return createI18n({
    legacy: false,
    locale,
    fallbackLocale: 'EN',
    messages,
    numberFormats,
  })
}
