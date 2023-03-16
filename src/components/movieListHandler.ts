import { movieApi } from "../domain/movieApi";
import { executeEventListener } from "../utils/eventListener";
import { $ } from "../utils/selector";
import MovieList from "./MovieList";

export const onClickMoreButton = () => {
  executeEventListener($("#more-button"), "click", async () => {
    $(".item-list").insertAdjacentHTML("beforeend", renderSkeletons());

    movieApi.page += 1;

    if (movieApi.last_keyword === "") {
      movieApi.showPopularMovies();
    } else {
      movieApi.showSearchedMovies(movieApi.last_keyword);
    }
  });
};

export const updateMovies = () => {
  const movieList = $("#movie-list") as MovieList;
  movieList.renderMovies();

  onClickMoreButton();
};

export const removeMoreButton = () => {
  $("#more-button").remove();
};

export const renderSkeletons = () => {
  return "<movie-skeleton></movie-skeleton>".repeat(20);
};
