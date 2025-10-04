import a from "axios";
import { endpoints } from "../../app.config.json";
import { storageController } from "./storage.controller";
import { utilController } from "./util.controller";
import { toast } from "vue3-toastify";

let endpoint = endpoints.producao;

switch (process.env.NODE_ENV) {
  case "local":
    endpoint = endpoints.local;
    break;
  case "development":
    endpoint = endpoints.homologacao;
    break;
  case "production":
    endpoint = endpoints.producao;
    break;
}

export const serviceController = {
  axios: a.create({ baseURL: endpoint }),

  getHeaders() {
    let headers = {
      "Content-Type": "application/json",
      Authorization: "",
    };
    if (storageController.getLocal("token")) {
      headers = {
        ...headers,
        Authorization: "Bearer " + storageController.getLocal("token"),
        "Content-Type": "application/json",
        // "Ipy-CustomFrontend": "true",
      };
    }
    return headers;
  },
  setParams(data: string) {
    if (!data) {
      return data;
    }
    let params = "";

    if ("params" in sessionStorage) {
      if (!data.includes(sessionStorage.getItem("params")!)) {
        params =
          (data.indexOf("?") != -1 ? "&" : "") +
          sessionStorage.getItem("params");
      }
    }
    if (localStorage.getItem("lang")) {
      let lang = localStorage.getItem("lang")!;
      if (data.indexOf("?") != -1) {
        return data + "&lang=" + lang.replace("-", "_") + "&" + params; // + '&ambiente=' + ENV_CONF.AMBIENTE
      } else {
        return data + "?lang=" + lang.replace("-", "_") + "&" + params; // + '&ambiente=' + ENV_CONF.AMBIENTE
      }
    }

    return data + (params ? "?" + params : "");
  },
  async get(url = "", show: boolean = true, param = "") {
    url = this.setParams(url) ? this.setParams(url) + param : url + param;
    try {
      const res = await this.axios.get(url, {
        headers: this.getHeaders(),
      });
      if (res.data) {
        return res.data;
      }
    } catch (error: unknown | any) {
      console.log(error, "error");

      if (error.status === 401 || error.code === "ERR_NETWORK") {
        const lang = localStorage.getItem("lang");

        storageController.destroyLocal();
        if (lang) {
          localStorage.setItem("lang", lang);
        }
        location.reload();
        return false;
      }
      if (error.response && error.response.data) {
        if (show) {
          utilController.snackbar.error(error.response.data.message);
        }
        return false;
      }
      if (show) {
        utilController.snackbar.error(error.message);
      }

      return false;
    }
  },
  async post(url: string, body: unknown, load: boolean = true) {
    let loading = null;
    if (load) {
      loading = utilController.snackbar.loading();
    }

    url = this.setParams(url) ? this.setParams(url) : url;
    try {
      const res = await this.axios.post(url, body, {
        headers: this.getHeaders(),
      });
      if (res.data) {
        if (loading) {
          toast.remove(loading);
        }
        return res.data;
      }
    } catch (error: unknown | any) {
      console.log(error, "error");
      if (loading) {
        toast.remove(loading);
      }
      if (error.response && error.response.data) {
        utilController.snackbar.error(error.response.data.message);
        return false;
      }
      utilController.snackbar.error(error.message);

      return false;
    }
  },
  async patch(url: string, body: unknown, load: boolean = true) {
    let loading = null;
    if (load) {
      loading = utilController.snackbar.loading();
    }

    url = this.setParams(url) ? this.setParams(url) : url;
    try {
      const res = await this.axios.patch(url, body, {
        headers: this.getHeaders(),
      });
      if (res.data) {
        if (loading) {
          toast.remove(loading);
        }
        return res.data;
      }
    } catch (error: unknown | any) {
      console.log(error, "error");
      if (loading) {
        toast.remove(loading);
      }
      if (error.response && error.response.data) {
        utilController.snackbar.error(error.response.data.message);
        return false;
      }
      utilController.snackbar.error(error.message);

      return false;
    }
  },
  async delete(url: string, load: boolean = true) {
    let loading = null;
    if (load) {
      loading = utilController.snackbar.loading();
    }

    url = this.setParams(url) ? this.setParams(url) : url;
    try {
      const res = await this.axios.delete(url, {
        headers: this.getHeaders(),
      });
      if (res.data) {
        if (loading) {
          toast.remove(loading);
        }
        return res.data;
      } else {
        if (loading) {
          toast.remove(loading);
        }
        return { status: true, message: "sucesso ao remover" };
      }
    } catch (error: unknown | any) {
      console.log(error, "error");
      if (loading) {
        toast.remove(loading);
      }
      if (error.response && error.response.data) {
        utilController.snackbar.error(error.response.data.message);
        return false;
      }
      utilController.snackbar.error(error.message);

      return false;
    }
  },
};
