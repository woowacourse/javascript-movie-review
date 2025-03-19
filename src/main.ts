import { getSearchMovieResult } from "./api/getSearchMovieResult";
import MovieListController from "./controller/MovieListController";

const ulElement = document.querySelector(".thumbnail-list") as HTMLUListElement;
const movieListController = new MovieListController(ulElement);
await movieListController.getPopularMovieList();

const searchBarElement = document.querySelector(
  ".search-bar",
) as HTMLFormElement;

searchBarElement.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formElement = event.target as HTMLElement;
  const target = formElement.querySelector("input") as HTMLInputElement;

  const result = await getSearchMovieResult(target.value, 1);
});
