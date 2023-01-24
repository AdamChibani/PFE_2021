import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import fr_CA from "./app/i18n/fr-CA/main.json";
import en_CA from "./app/i18n/en-CA/main.json";

import nagigation_fr_CA from "./app/i18n/fr-CA/navigation.json";
import nagigation_en_CA from "./app/i18n/en-CA/navigation.json";

import calendar_fr_CA from "./app/i18n/fr-CA/calendar.json";
import calendar_en_CA from "./app/i18n/en-CA/calendar.json";

const resources = {
  "fr-CA": {
    translation: fr_CA,
    navigation: nagigation_fr_CA,
    calendar: calendar_fr_CA,
  },
  "en-CA": {
    translation: en_CA,
    navigation: nagigation_en_CA,
    calendar: calendar_en_CA,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    debug: true,
    resources,
    lng: "fr-CA",
    fallbackLng: "fr-CA",
    keySeparator: ".",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
