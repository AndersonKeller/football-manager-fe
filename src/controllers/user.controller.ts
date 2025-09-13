import type { iReturnTeam } from "../schemas/team.schemas";
import type {
  iCreateLogin,
  iCreateUser,
  iReturnLogin,
  iReturnUser,
} from "../schemas/user.schemas";
import { serviceController } from "./service.controller";
const ENDPOINTS = {
  USER: "/user",
  LOGIN: "/user/login",
  TEAM: "/user/team",
};
export const userController = {
  createUser: async (userData: iCreateUser): Promise<iReturnUser> => {
    return await serviceController.post(ENDPOINTS.USER, userData);
  },
  login: async (loginData: iCreateLogin): Promise<iReturnLogin> => {
    return await serviceController.post(ENDPOINTS.LOGIN, loginData);
  },
  getUserTeam: async (): Promise<iReturnTeam> => {
    return await serviceController.get(ENDPOINTS.TEAM, false);
  },
};
