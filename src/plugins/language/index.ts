import { defineStore } from "pinia";
import en from "./i18n/en.json";
import es from "./i18n/es.json";
import pt from "./i18n/pt.json";

export const language = {
  langs: [
    {
      lang: "es-ES",
      img: "https://cloudfront.eleventickets.com/copa_america_2021/oficial/frontend/langs/es.jpg",
    },
    {
      lang: "pt-BR",
      img: "https://cloudfront.eleventickets.com/copa_america_2021/oficial/frontend/langs/pt.jpg",
    },
    {
      lang: "en-US",
      img: "https://cloudfront.eleventickets.com/copa_america_2021/oficial/frontend/langs/en.jpg",
    },
  ],
  lang: document.documentElement.lang,
  setLang(language: string) {
    document.documentElement.lang = language;
    this.lang = document.documentElement.lang;

    localStorage.setItem("lang", this.lang);
    let object = window.location.pathname.split("/");
    let url = this.lang.substring(0, 2);

    if (url == object[1]) {
      document.location.pathname = window.location.pathname;
    } else {
      document.location.href = `/${url}/`;
    }
  },
  get() {
    if ("lang" in localStorage) {
      return localStorage.getItem("lang");
    }
  },
  getLang() {
    if ("lang" in localStorage) {
      return {
        title: localStorage.getItem("lang")!.substring(0, 2),
        lang: localStorage.getItem("lang"),
        celular: localStorage.getItem("lang")!.substring(0, 3),
      };
    }
    const langNavegador = navigator.language;
    switch (window.location.pathname.split("/")[1]) {
      case "es":
        this.setLang("es-ES");
        break;
      case "en":
        this.setLang("en-US");
        break;
      case "pt":
        this.setLang("pt-BR");
        break;
      default:
        switch (langNavegador) {
          case "pt-BR":
            this.setLang("pt-BR");
            break;
          case "en-US":
            this.setLang("en-US");
            break;
          case "es-ES":
            this.setLang("es-ES");
            break;
          default:
            this.setLang("pt-BR");
        }
        location.href = `/${langNavegador.substring(0, 2)}/`;
        break;
    }
  },
  translate(chave: string) {
    const lang =
      "lang" in localStorage ? localStorage.getItem("lang") : "pt-BR";

    if (lang) {
      let language: any = null;

      switch (lang) {
        case "pt-BR":
          language = pt;
          break;
        case "en-US":
          language = en;
          break;
        case "es-ES":
          language = es;
          break;
        default:
          language = pt;
      }
      //console.log(language[chave.split(".")[0]], "language", chave);
      if (language["" + chave]) {
        return (
          language["" + chave][0] + language["" + chave].substr(1)
          // language["" + chave][0].toUpperCase() + language["" + chave].substr(1)
        );
      } else if (chave.includes(".")) {
        return language[chave.split(".")[0]][chave.split(".")[1]];
      } else {
        return `[${chave}]`;
      }
    }
  },
};

const useLangStore = defineStore("lang", {
  state: () => language,
  getters: {
    $lang: (state) => state.getLang()!.lang,
    $langs: () => language.langs,
  },
  actions: {
    t_(chave: string) {
      return language.translate(chave);
    },
  },
});

export default useLangStore;
