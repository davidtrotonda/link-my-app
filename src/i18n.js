import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { defaultLanguage, supportedLanguages } from './lib/i18nRoutes.js';

const localeLoaders = {
  en: () => import('./locales/en.json'),
  es: () => import('./locales/es.json'),
  fr: () => import('./locales/fr.json'),
  ja: () => import('./locales/ja.json'),
  de: () => import('./locales/de.json'),
  pt: () => import('./locales/pt.json'),
  it: () => import('./locales/it.json'),
  ko: () => import('./locales/ko.json'),
  nl: () => import('./locales/nl.json'),
  ar: () => import('./locales/ar.json'),
  hi: () => import('./locales/hi.json'),
};

const dynamicLocaleBackend = {
  type: 'backend',
  init() {},
  read(language, _namespace, callback) {
    const normalizedLanguage = supportedLanguages.includes(language)
      ? language
      : defaultLanguage;
    const loader = localeLoaders[normalizedLanguage] || localeLoaders[defaultLanguage];

    loader()
      .then((module) => callback(null, module.default || module))
      .catch((error) => callback(error, false));
  },
};

i18n
  .use(dynamicLocaleBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: defaultLanguage,
    supportedLngs: supportedLanguages,
    load: 'languageOnly',
    ns: ['translation'],
    defaultNS: 'translation',
    react: { useSuspense: true },
    interpolation: {
      escapeValue: false 
    },
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupFromPathIndex: 0,
    }
  });

export default i18n;
