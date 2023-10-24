import i18next from "i18next";
import en from "./en.json";
import ua from "./ua.json";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
  lng: "ua",
  resources: {
    en: en,
    ua: ua,
  },
  react: {
    useSuspense: false,
  },
});

export default i18next;
