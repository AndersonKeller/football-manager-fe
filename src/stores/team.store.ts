import type { iReturnStadium } from "../schemas/stadium.schemas";
import type { iReturnTeam, iReturnTeamPlayers } from "../schemas/team.schemas";

import { defineStore } from "pinia";

export const teamStore = defineStore("teamStore", {
  state: () => {
    return {
      team: null as iReturnTeam | null,
      stadium: null as iReturnStadium | null,
      teamPlayers: {} as iReturnTeamPlayers,
    };
  },
  getters: {
    getTeam: (state) => {
      return state.team;
    },
    getStadium: (state) => {
      return state.stadium;
    },
    getTeamPlayers: (state) => {
      return state.teamPlayers;
    },
  },
  actions: {
    setTeam(value: iReturnTeam) {
      this.team = value;
    },
    setStadium(value: iReturnStadium) {
      this.stadium = value;
    },
    setTeamPlayers(value: iReturnTeamPlayers) {
      this.teamPlayers = value;
    },
  },
});
