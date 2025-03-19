import MovieListController from "./controller/MovieListController";
import SearchMovieListController from "./controller/SearchMovieListController";

const sectionElement = document.querySelector("section") as HTMLElement;
const movieListController = new MovieListController(sectionElement);
await movieListController.getPopularMovieList();

const searchBarElement = document.querySelector(
  ".search-bar",
) as HTMLFormElement;

searchBarElement.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formElement = event.target as HTMLElement;
  const target = formElement.querySelector("input") as HTMLInputElement;
  const searchValue = target.value;

  const sectionElement = document.querySelector("section") as HTMLElement;

  new SearchMovieListController(sectionElement, searchValue);
});
