import { movieApi } from "../domain/movieApi";
import { $ } from "../utils/selector";
import MovieList from "./MovieList";

export const onClickMoreButton = () => {
  $("#more-button").addEventListener("click", async () => {
    $(".item-list").insertAdjacentHTML("beforeend", renderSkeletons());

    movieApi.page += 1;

    if (movieApi.lastKeyword === "") {
      movieApi.showPopularMovies();
    } else {
      movieApi.showSearchedMovies(movieApi.lastKeyword);
    }
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
  return "<movie-skeleton></movie-skeleton>".repeat(20);
};
