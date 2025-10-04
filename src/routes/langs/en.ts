import { language } from "../../plugins/language";
import Home from "../../view/Home.vue";
import ScheduleView from "../../view/league/ScheduleView.vue";

import TeamCreate from "../../view/team/TeamCreate.vue";

const TITTLE = `Football Manager | `;

export default [
  {
    path: "/",
    name: "Home",
    props: true,
    params: true,
    component: Home,
    meta: { title: TITTLE + language.translate("HOME"), requiresAuth: false },
  },
  {
    path: "/login",
    name: "Login",
    props: true,
    params: true,
    component: () =>
      import(/* webpackChunkName: "home" */ "../../view/Login.vue"),
    meta: { title: TITTLE + language.translate("LOGIN"), requiresAuth: false },
  },
  {
    path: "/register",
    name: "Register",
    props: true,
    params: true,
    component: () =>
      import(/* webpackChunkName: "home" */ "../../view/Register.vue"),
    meta: {
      title: TITTLE + language.translate("CADASTRO"),
      requiresAuth: false,
    },
  },
  {
    path: "/team-create",
    name: "TeamCreate",
    props: true,
    params: true,
    component: TeamCreate,
    meta: {
      title: TITTLE + language.translate("CRIAR_EQUIPE"),
      requiresAuth: false,
    },
  },
  {
    path: "/:league/schedule",
    name: "LeaguSchedule",
    props: true,
    params: true,
    component: ScheduleView,
    meta: {
      title: TITTLE + language.translate("TABELA"),
      requiresAuth: false,
    },
  },
  //   {
  //     path: "/not-found",
  //     name: "Error",
  //     component: () => import(/* webpackChunkName: "error" */ "@/view/Error.vue"),
  //     meta: {
  //       title: TITTLE + language.translate("PAGE_NOT_FOUND"),
  //       requiresAuth: false,
  //     },
  //   },
];
