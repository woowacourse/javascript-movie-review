import { movies } from "../../domain/movies";
import { executeEventListener } from "../../utils/eventListener";
import { $ } from "../../utils/selector";
import MovieList from ".";
import Store from "../../domain/Store";

const store: Store = Store.getInstance();

export const onClickMoreButton = () => {
  executeEventListener($("#more-button"), {
    type: "click",
    prevent: true
  }, async () => {
    $(".item-list").insertAdjacentHTML("beforeend", renderSkeletons());

    store.nextPage();

    if (store.getLastKeyword() === "") {
      movies.showPopularMovies();
    } else {
      movies.showSearchedMovies(store.getLastKeyword());
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
