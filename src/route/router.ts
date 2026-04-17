import { ROUTES } from "./constants";

interface Page {
  render(): void;
  destroy(): void;
}

type PageLoader = () => Page;

interface Routes {
  main: PageLoader;
  search: PageLoader;
}

export class Router {
  private routes: Routes;
  private currentPage: Page | null = null;

  constructor(routes: Routes) {
    this.routes = routes;
  }

  init(): void {
    const { pathname } = location;

    switch (pathname) {
      case ROUTES.SEARCH:
        this.loadPage(this.routes.search);
        break;
      case ROUTES.MAIN:
        this.loadPage(this.routes.main);
        break;
      default:
        this.navigate(ROUTES.MAIN);
    }
  }

  navigate(path: string): void {
    history.pushState(null, "", path);
    this.init();
  }

  private loadPage(loader: PageLoader): void {
    this.currentPage?.destroy();
    this.currentPage = loader();
    this.currentPage.render();
  }
}
