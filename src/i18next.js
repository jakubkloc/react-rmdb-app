import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./lng/en.json";
import pl from "./lng/pl.json";

i18next.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    pl: {
      translation: pl,
    },
  },
  lng: sessionStorage.getItem("language") || "pl",
});

export default i18next;
