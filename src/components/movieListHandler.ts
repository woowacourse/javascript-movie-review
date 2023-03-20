import { movieApi } from "../domain/movieApi";
import { $ } from "../utils/selector";
import MovieList from "./MovieList";
import { MOVIE_COUNT_IN_ONE_PAGE } from "../constants";

export const updateMovies = () => {
  $<MovieList>("#movie-list").renderMovies();

  loadMoreMovies();
  removeMoreButtonIfLastPage();
};

const loadMoreMovies = () => {
  $("#more-button").addEventListener("click", () => {
    $(".item-list").insertAdjacentHTML("beforeend", makeSkeletons());

    const currentPage = Number(movieApi.urlParams.get("page"));
    movieApi.urlParams.set("page", `${currentPage + 1}`);

    const path = movieApi.url.pathname.replace("/3/", "");
    movieApi.showMovies(path, `${movieApi.urlParams.get("query")}`);
  });
};

const removeMoreButtonIfLastPage = () => {
  const currentPage = Number(movieApi.urlParams.get("page"));
  if (currentPage === movieApi.totalPage) $("#more-button").remove();
};

export const makeSkeletons = () => {
  return "<movie-skeleton></movie-skeleton>".repeat(MOVIE_COUNT_IN_ONE_PAGE);
};
