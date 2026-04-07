import { Router } from "./route/router";
import { MainPage } from "./pages/mainPage";
import { SearchPage } from "./pages/searchPage";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.querySelector<HTMLElement>("#app");
  if (!app) return;

  const router = new Router({
    main: () => new MainPage(app, router).render(),
    search: () => new SearchPage(app, router).render(),
  });

  router.init();
});
