import { baseUrl } from "./constants/env";
import {
  bindModalEvents,
  bindRatingEvents,
  bindSearchEvents,
} from "./eventBinder";
import { loadMovieList, loadTopRatedMovie } from "./movieLoader";
import { initializeMovieListObserver } from "./movieObserver";

addEventListener("load", () => {
  const logo = document.querySelector<HTMLButtonElement>(".logo");
  logo?.addEventListener("click", () => {
    window.location.href = baseUrl;
  });

  bindSearchEvents();
  bindModalEvents();
  bindRatingEvents();

  loadTopRatedMovie();
  loadMovieList();

  initializeMovieListObserver();
});
