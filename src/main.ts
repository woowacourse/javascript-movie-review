import modal from "../templates/modal.html?raw";
import "../templates/styles/index.css";

import { Movie, addMovieList } from "./view/movieListView.ts";
import {
  fetchDefaultMovieList,
  fetchSearchMovieList,
} from "./service/movieApi.ts";
import {
  getElement,
  getInputElement,
  getUListElement,
} from "./view/getElementView.ts";

import {
  bindMoreMovieEvents,
  bindSearchEvents,
} from "./events/bindMovieEvent.ts";

addEventListener("load", async () => {
  const app = document.querySelector("#app");

  if (app) {
    app.innerHTML = modal;

    let pageNum = 1;

    let movieList = await fetchDefaultMovieList(pageNum);
    const movieDisplay = getUListElement(".thumbnail-list");
    addMovieList(movieDisplay, movieList);

    bindSearchEvents(pageNum);
    bindMoreMovieEvents(pageNum);
  }
});
