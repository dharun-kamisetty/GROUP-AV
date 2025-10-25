import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enTranslations from './locales/en.json';
import hiTranslations from './locales/hi.json';
import teTranslations from './locales/te.json';
import taTranslations from './locales/ta.json';
import knTranslations from './locales/kn.json';
import mlTranslations from './locales/ml.json';

const resources = {
  en: { translation: enTranslations },
  hi: { translation: hiTranslations },
  te: { translation: teTranslations },
  ta: { translation: taTranslations },
  kn: { translation: knTranslations },
  ml: { translation: mlTranslations }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    
    interpolation: {
      escapeValue: false // React already does escaping
    },

    // Options for development
    debug: false,
    
    // Load missing keys
    saveMissing: true,
    missingKeyHandler: (lng, ns, key) => {
      console.warn(`Missing translation key: ${key} for language: ${lng}`);
    }
  });

export default i18n;
