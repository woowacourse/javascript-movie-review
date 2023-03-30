import AppComponent from "../components/AppComponent";
import AppHeaderComponent from "../components/AppHeaderComponent";
import MovieListComponent from "../components/movie/MovieListComponent";

const routes = {
  "/": app,
  "/search/:keyword": searchList,
};

async function app() {
  const list = document.querySelector<MovieListComponent>("movie-list");
  if (list) {
    await list.popularListInit();
  }
}

async function searchList(keyword: string) {
  const app = document.querySelector<AppComponent>("app-component");
  if (app) {
    const list = app.querySelector<MovieListComponent>("movie-list");
    if (list) {
      const header = app.querySelector<AppHeaderComponent>("app-header");
      if (header) {
        header.hideSearch();
        list.setSearchKeyword(decodeURI(keyword));
        await list.searchListInit();
      }
    }
  }
}

export const Router = async () => {
  const hash = location.pathname;
  const parts = hash.split("/");

  parts.forEach((el, index, arr) => (el === "" ? arr.splice(index, 1) : null));

  const route = parts[0];
  const params = parts[1];

  Object.entries(routes).forEach(([key, value]) => {
    const routeParts = key.split("/");
    routeParts.forEach((el, index, arr) =>
      el === "" ? arr.splice(index, 1) : null
    );

    const originalRoute = routeParts[0];

    if (originalRoute === route || originalRoute === undefined) {
      const handler = value;
      handler(params);
    }
  });
};

export const navigate = (url: string) => {
  if (decodeURI(location.pathname) !== url) {
    history.pushState(null, "", url);
    Router();
  }
};
