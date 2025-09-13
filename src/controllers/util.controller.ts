import { toast } from "vue3-toastify";
import moment from "moment";
export const utilController = {
  snackbar: {
    success: (message: string) => {
      return toast.success(message);
    },
    loading: () => {
      // toast.remove();
      return toast.loading("Carregando");
    },
    error: (message: string) => {
      return toast.error(message);
    },
    info: (message: string) => {
      return toast.info(message);
    },
  },
  validarEmail(email: string) {
    // FUNC: validarEmail(email)
    // CC: Valida o email no front end
    const res = /\S+@\S+\.\S+/.test(email);
    return res;
  },
  formatNumber: (number: number) => {
    const local = localStorage.getItem("lang") || "pt-BR";
    const intl = new Intl.NumberFormat(local).format(number);
    return intl;
  },
  fomatDate: (date: string | Date) => {
    const toFormat = new Date(date);
    const local = localStorage.getItem("lang") || "pt-BR";
    const intL = new Intl.DateTimeFormat(local, { timeZone: "UTC" }).format(
      toFormat
    );
    return intL;
  },
  formatHour(time: string) {
    const date = new Date();
    const split = time.split(":");
    date.setHours(Number(split[0]));
    date.setMinutes(Number(split[1]));
    const hour = moment(date).format("HH:MM");

    return hour;
  },
  asMoney: (value: number) => {
    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });

    const preco = formatter.format(value);

    return preco;
  },
};
