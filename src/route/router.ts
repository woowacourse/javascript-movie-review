import { ROUTES } from "./constants";

type PageLoader = () => void;

interface Routes {
  main: PageLoader;
  search: PageLoader;
}

export class Router {
  private routes: Routes;

  constructor(routes: Routes) {
    this.routes = routes;
  }

  init(): void {
    const { pathname } = location;

    switch (pathname) {
      case ROUTES.SEARCH:
        this.routes.search();
        break;
      case ROUTES.MAIN:
        this.routes.main();
        break;
      default:
        this.navigate(ROUTES.MAIN);
    }
  }

  navigate(path: string): void {
    history.pushState(null, "", path);
    this.init();
  }
}
