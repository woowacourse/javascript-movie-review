import MovieListController from "./controller/MovieListController";
import SearchMovieListController from "./controller/SearchMovieListController";

const mainElement = document.querySelector("main") as HTMLElement;
const movieListController = new MovieListController(mainElement);

await movieListController.renderMovieList();

const searchBarElement = document.querySelector(
  ".search-bar",
) as HTMLFormElement;

searchBarElement.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formElement = event.target as HTMLElement;
  const target = formElement.querySelector("input") as HTMLInputElement;
  const searchValue = target.value;

  new SearchMovieListController(mainElement, searchValue);
});

const headerLogoElement = document.querySelector(".header-wrapper .logo");

headerLogoElement?.addEventListener("click", async () => {
  await movieListController.renderExistingMovieList();

  const inputElement = searchBarElement.querySelector(
    "input",
  ) as HTMLInputElement;
  inputElement.value = "";
});
