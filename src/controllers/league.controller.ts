import type { iCreateRound } from "../schemas/game.schemas";
import { serviceController } from "./service.controller";

const ENDPOINTS = {
  LEAGUE: "/league",
};

export const leagueController = {
  getLeagueSchedule: async (leagueId: number) => {
    return await serviceController.get(
      `${ENDPOINTS.LEAGUE}/${leagueId}/schedule`
    );
  },
  getLeagueTeamSchedule: async (
    leagueId: number,
    idTeam: string
  ): Promise<iCreateRound[]> => {
    return await serviceController.get(
      `${ENDPOINTS.LEAGUE}/${leagueId}/team/${idTeam}/schedule`
    );
  },
};
