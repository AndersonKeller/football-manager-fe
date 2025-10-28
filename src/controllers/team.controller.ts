import type { iReturnAllNationality } from "../schemas/nationality.schemas";
import type { iReturnAllPositionCategory } from "../schemas/position-category.schemas";
import type { iReturnAllPosition } from "../schemas/position.schemas";
import type {
  iCreateTeam,
  iReturnTeam,
  iReturnTeamPlayers,
} from "../schemas/team.schemas";
import { serviceController } from "./service.controller";

const ENDPOINTS = {
  NATIONALITY: "/nationality",
  TEAM: "/team",
  POSITIONCATEGORY: "/position-category",
  POSITION: "position",
};
export const teamController = {
  getAllNationality: async (): Promise<iReturnAllNationality> => {
    return await serviceController.get(ENDPOINTS.NATIONALITY);
  },
  createTeam: async (teamData: iCreateTeam): Promise<iReturnTeam> => {
    return await serviceController.post(ENDPOINTS.TEAM, teamData);
  },
  getAllPositionCategory: async (): Promise<iReturnAllPositionCategory> => {
    return await serviceController.get(ENDPOINTS.POSITIONCATEGORY);
  },
  getAllPositions: async (): Promise<iReturnAllPosition> => {
    return await serviceController.get(ENDPOINTS.POSITION);
  },
  getTeamPlayers: async (teamId: string): Promise<iReturnTeamPlayers> => {
    return await serviceController.get(`${ENDPOINTS.TEAM}/${teamId}/player`);
  },
};
