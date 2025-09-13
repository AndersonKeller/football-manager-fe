import type { iReturnStadium } from "../schemas/stadium.schemas";
import type { iReturnTeam } from "../schemas/team.schemas";

import { defineStore } from "pinia";

export const teamStore = defineStore("teamStore", {
  state: () => {
    return {
      team: null as iReturnTeam | null,
      stadium: null as iReturnStadium | null,
    };
  },
  getters: {
    getTeam: (state) => {
      return state.team;
    },
    getStadium: (state) => {
      return state.stadium;
    },
  },
  actions: {
    setTeam(value: iReturnTeam) {
      this.team = value;
    },
    setStadium(value: iReturnStadium) {
      this.stadium = value;
    },
  },
});
