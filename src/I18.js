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

const numberFormats = {
  'en-US': { // English (United States)
    currency: { style: 'currency', currency: 'USD', notation: 'standard' },
    decimal: { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 },
    percent: { style: 'percent', useGrouping: false },
  },
  'bn-BD': { // Bengali (Bangladesh)
    currency: { style: 'currency', currency: 'BDT', currencyDisplay: 'symbol' },
    decimal: { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 },
    percent: { style: 'percent', useGrouping: false },
  },
  'ar-SA': { // Arabic (Saudi Arabia)
    currency: { style: 'currency', currency: 'SAR', currencyDisplay: 'symbol' },
    decimal: { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 3 },
    percent: { style: 'percent', useGrouping: true },
  },
  'cn-CN': { // Chinese (China)
    currency: { style: 'currency', currency: 'CNY', currencyDisplay: 'symbol' },
    decimal: { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 },
    percent: { style: 'percent', useGrouping: true },
  },
  'da-DK': { // Danish (Denmark)
    currency: { style: 'currency', currency: 'DKK', currencyDisplay: 'symbol' },
    decimal: { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 },
    percent: { style: 'percent', useGrouping: true },
  },
  'de-DE': { // German (Germany)
    currency: { style: 'currency', currency: 'EUR', currencyDisplay: 'symbol' },
    decimal: { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 },
    percent: { style: 'percent', useGrouping: true },
  },
  'es-ES': { // Spanish (Spain)
    currency: { style: 'currency', currency: 'EUR', currencyDisplay: 'symbol' },
    decimal: { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 },
    percent: { style: 'percent', useGrouping: true },
  },
  'fr-FR': { // French (France)
    currency: { style: 'currency', currency: 'EUR', currencyDisplay: 'symbol' },
    decimal: { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 },
    percent: { style: 'percent', useGrouping: true },
  },
  'he-IL': { // Hebrew (Israel)
    currency: { style: 'currency', currency: 'ILS', currencyDisplay: 'symbol' },
    decimal: { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 },
    percent: { style: 'percent', useGrouping: true },
  },
  'hi-IN': { // Hindi (India)
    currency: { style: 'currency', currency: 'INR', currencyDisplay: 'symbol' },
    decimal: { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 3 },
    percent: { style: 'percent', useGrouping: true },
  },
  'id-ID': { // Indonesian (Indonesia)
    currency: { style: 'currency', currency: 'IDR', currencyDisplay: 'symbol' },
    decimal: { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 },
    percent: { style: 'percent', useGrouping: true },
  },
  'it-IT': { // Italian (Italy)
    currency: { style: 'currency', currency: 'EUR', currencyDisplay: 'symbol' },
    decimal: { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 },
    percent: { style: 'percent', useGrouping: true },
  },
  'ja-JP': { // Japanese (Japan)
    currency: { style: 'currency', currency: 'JPY', currencyDisplay: 'symbol' },
    decimal: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }, // Yen has no decimals
    percent: { style: 'percent', useGrouping: true },
  },
  'ru-RU': { // Russian (Russia)
    currency: { style: 'currency', currency: 'RUB', currencyDisplay: 'symbol' },
    decimal: { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 },
    percent: { style: 'percent', useGrouping: true },
  },
  'sv-SE': { // Swedish (Sweden)
    currency: { style: 'currency', currency: 'SEK', currencyDisplay: 'symbol' },
    decimal: { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 },
    percent: { style: 'percent', useGrouping: true },
  },
  'th-TH': { // Thai (Thailand)
    currency: { style: 'currency', currency: 'THB', currencyDisplay: 'symbol' },
    decimal: { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 },
    percent: { style: 'percent', useGrouping: true },
  },
  'ur-PK': { // Urdu (Pakistan)
    currency: { style: 'currency', currency: 'PKR', currencyDisplay: 'symbol' },
    decimal: { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 },
    percent: { style: 'percent', useGrouping: true },
  }
};


export const i18n = createI18n({
  locale: 'EN',
  fallbackLocale: 'BN',
  numberFormats,
  legacy: false,
  messages: {
    EN: EN,
    BN: BN,
    HN: HN,
    AR: AR,
    ES: ES,
    CN: CN,
    JP: JP,
    FR: FR,
    DE: DE,
    DA: DA,
    RU: RU,
    UR: UR,
    SV: SV,
    TH: TH,
    HE: HE,
    ID: ID,
    IT: IT,
  },
})
