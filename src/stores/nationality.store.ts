import type { iReturnAllNationality } from "./../schemas/nationality.schemas";
import { defineStore } from "pinia";

export const nationalityStore = defineStore("nationalityStore", {
  state: () => {
    return {
      nationalities: [] as iReturnAllNationality,
    };
  },
  getters: {
    getNationalities: (state) => {
      return state.nationalities;
    },
  },
  actions: {
    setNationalities(value: iReturnAllNationality) {
      this.nationalities = value;
    },
  },
});
