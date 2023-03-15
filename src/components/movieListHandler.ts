import { movieApi } from "../domain/movieApi";
import { executeEventListener } from "../utils/eventListener";
import { $ } from "../utils/selector";
import MovieList from "./MovieList";

export const onClickMoreButton = () => {
  executeEventListener($("#more-button"), "click", async () => {
    if (movieApi.last_keyword === "") {
      await movieApi.fetchPopularMovieInfo();
    } else {
      await movieApi.fetchSearchedMovieInfo(movieApi.last_keyword);
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
