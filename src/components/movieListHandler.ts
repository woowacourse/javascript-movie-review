import { movieApi } from "../domain/movieApi";
import { $ } from "../utils/selector";
import MovieList from "./MovieList";
import { MOVIE_COUNT_IN_ONE_PAGE } from "../constants";

export const onClickMoreButton = () => {
  $("#more-button").addEventListener("click", async () => {
    $(".item-list").insertAdjacentHTML("beforeend", renderSkeletons());

    const currentPage = Number(movieApi.urlParams.get("page"));
    movieApi.urlParams.set("page", `${currentPage + 1}`);

    const path = movieApi.url.pathname.replace("/3/", "");
    movieApi.showMovies(path, `${movieApi.urlParams.get("query")}`);
  });
};

export const updateMovies = () => {
  $<MovieList>("#movie-list").renderMovies();

  onClickMoreButton();
};

export const removeMoreButton = () => {
  $("#more-button").remove();
};

export const renderSkeletons = () => {
  return "<movie-skeleton></movie-skeleton>".repeat(MOVIE_COUNT_IN_ONE_PAGE);
};
