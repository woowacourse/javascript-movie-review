import { Router } from "./route/router";
import { MainPage } from "./pages/mainPage";
import { SearchPage } from "./pages/searchPage";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.querySelector<HTMLElement>("#app");
  if (!app) return;

  const router: Router = new Router({
    main: () => new MainPage(app, router),
    search: () => new SearchPage(app, router),
  });

  router.init();
});
