import type { iCreateRound } from "../schemas/game.schemas";
import type { iReturnLeagueTeams } from "../schemas/league.schemas";
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
  getLeagueTeams: async (leagueId: number): Promise<iReturnLeagueTeams> => {
    return await serviceController.get(`${ENDPOINTS.LEAGUE}/${leagueId}/team`);
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
