import { getSearchMovieResult } from "./api/getSearchMovieResult";
import MovieListSection from "./component/MovieListSection";
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
  const searchValue = target.value;

  const { results: searchMovieList } = await getSearchMovieResult(
    searchValue,
    1,
  );

  const sectionElement = document.querySelector("section");

  sectionElement?.replaceWith(
    MovieListSection(`"${searchValue}" 겅색 결과`, searchMovieList),
  );
});
