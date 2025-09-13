import { createRouter, createWebHistory } from "vue-router";

import en from "./langs/en";

let routes: any = null;
let router = null;

init();
function init() {
  routes = en;
  if (!localStorage.getItem("lang")) {
    localStorage.setItem("lang", document.documentElement.lang);
  }
  exit();
}
function exit() {
  const config = {
    history: createWebHistory(),
    routes,
  };

  router = createRouter(config);

  router.beforeEach(async (to, from, next) => {
    let getElement = `__${window.btoa("session")}`;
    const session = localStorage.getItem(getElement)
      ? JSON.parse(
          window.decodeURIComponent(
            window.atob(window.localStorage.getItem(getElement)!)
          )
        ).data
      : false;

    if (to.meta.requiresAuth && !session) {
      next("/login");
      return;
    }
    // if (to.meta.noUser && session) {
    //   next("/");
    //   return;
    // }

    next();

    document.title = to.meta.title as string;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });
}

export default router;
