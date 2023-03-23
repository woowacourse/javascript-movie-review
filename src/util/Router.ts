import { MovieDetails } from "../abstracts/type";
import { ANIMATED_TIME } from "../constants/constants";
import { fetchMovieDetails } from "./Api";

const routes = {
  "": app,
  "/movie/:id": movieDetail,
};

function app() {
  const modal = document.querySelector("movie-modal") as HTMLElement;

  if (modal) {
    modal.style.opacity = "0";
    setTimeout(() => {
      modal.remove();
    }, ANIMATED_TIME.MODAL);
  }
}

async function movieDetail(id: string) {
  const modal = document.createElement("movie-modal");

  const detailData: MovieDetails = await fetchMovieDetails(id);
  Object.entries(detailData).forEach(([key, value]) => {
    modal.setAttribute(key, String(value));
  });

  const app = document.querySelector("#app") as HTMLDivElement;
  app.append(modal);

  setTimeout(() => {
    modal.classList.add("fadein");
  });
}

export const Router = async () => {
  const hash = window.location.pathname;
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
  window.history.pushState(null, "", url);
  Router();
};
