import { movieApi } from "../domain/movieApi";
import { executeEventListener } from "../utils/eventListener";
import { $ } from "../utils/selector";
import MovieList from "./MovieList";

export const onClickMoreButton = () => {
  executeEventListener(
    $("#more-button"),
    "click",
    async () => await movieApi.fetchMovieInfo()
  );
};

export const updateMovies = () => {
  const movieList = $("#movie-list") as MovieList;
  movieList.renderMovies();
  onClickMoreButton();
};

