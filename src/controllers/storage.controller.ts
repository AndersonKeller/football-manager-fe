export const storageController = {
  setLocal(nome: string, dados: string) {
    //FUNC: setLocal(nome, dados)

    let setElement = `__${window.btoa(nome)}`;
    let output = window.btoa(
      window.encodeURIComponent(
        JSON.stringify({ session: new Date().getTime(), data: dados })
      )
    );

    if (["token", "session", "enderecos", "lang"].includes(nome)) {
      window.localStorage.setItem(setElement, output);
    } else {
      window.sessionStorage.setItem(setElement, output);
    }
  },

  getLocal(nome: string) {
    //FUNC: getLocal(nome)

    let getElement = `__${window.btoa(nome)}`;
    if (["token", "lang"].includes(nome)) {
      if (getElement in localStorage && getElement) {
        return JSON.parse(
          window.decodeURIComponent(
            window.atob(window.localStorage.getItem(getElement)!)
          )
        ).data;
      }
    } else if (["session", "enderecos"].includes(nome)) {
      if (getElement in localStorage && getElement) {
        const data = JSON.parse(
          window.decodeURIComponent(
            window.atob(window.localStorage.getItem(getElement)!)
          )
        ).data;
        console.log(data, "data?");
        return typeof data === "object" ? data : JSON.parse(data);
      }
    } else {
      if (getElement in sessionStorage) {
        const data = JSON.parse(
          window.decodeURIComponent(
            window.atob(window.sessionStorage.getItem(getElement)!)
          )
        ).data;
        return JSON.parse(data);
      }
    }

    return false;
  },

  destroyLocal() {
    //FUNC: destroyLocal()

    let lang = "pt-BR";

    if ("lang" in localStorage) {
      lang = localStorage.getItem("lang")!;
    }

    sessionStorage.clear();
    localStorage.clear();

    localStorage.setItem("lang", lang);
    return false;
  },
};
