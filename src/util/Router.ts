import { MovieDetails } from "../abstracts/type";
import AppComponent from "../components/AppComponent";
import AppHeaderComponent from "../components/AppHeaderComponent";
import MovieModalComponent from "../components/modal/MovieModalComponent";
import { ANIMATED_TIME } from "../constants/constants";
import { fetchMovieDetails } from "./Api";
import MovieListComponent from "../components/movie/MovieListComponent";

const routes = {
  "/": app,
  "/movie/:id": movieDetail,
  "/search/:keyword": searchList,
};

const closeModal = () => {
  const modal = document.querySelector("movie-modal") as HTMLElement;

  if (modal) {
    modal.style.opacity = "0";
    setTimeout(() => {
      modal.remove();
    }, ANIMATED_TIME.MODAL);
  }
};

async function app() {
  closeModal();

  const list = document.querySelector("movie-list") as MovieListComponent;
  await list.popularListInit();
}

async function movieDetail(id: string) {
  const modal = document.createElement("movie-modal") as MovieModalComponent;
  modal.loadMovieDetail(id);

  const app = document.querySelector("#app") as HTMLDivElement;
  app.append(modal);

  setTimeout(() => {
    modal.classList.add("fadein");
  });
}

async function searchList(keyword: string) {
  closeModal();

  const app = document.querySelector("app-component") as AppComponent;
  const list = app.querySelector("movie-list") as MovieListComponent;
  if (list) {
    const header = app.querySelector("app-header") as AppHeaderComponent;
    header.hideSearch();
    list.setSearchKeyword(decodeURI(keyword));
    list.searchListInit();
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
