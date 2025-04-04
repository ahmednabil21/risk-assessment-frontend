// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          upload: "Upload",
          analyze: "Analyze",
          // أضف باقي النصوص...
        }
      },
      ar: {
        translation: {
          upload: "رفع",
          analyze: "تحليل",
          // أضف باقي النصوص...
        }
      }
    },
    lng: "ar", // اللغة الافتراضية
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;