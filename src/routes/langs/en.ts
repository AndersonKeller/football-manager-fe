import { language } from "../../plugins/language";

const TITTLE = `Football Manager | `;

export default [
  {
    path: "/",
    name: "Home",
    props: true,
    params: true,
    component: () =>
      import(/* webpackChunkName: "home" */ "../../view/Home.vue"),
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
    component: () =>
      import(/* webpackChunkName: "home" */ "../../view/team/TeamCreate.vue"),
    meta: {
      title: TITTLE + language.translate("CRIAR_EQUIPE"),
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
