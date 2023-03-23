import { executeEventListener } from "../../utils/eventListener";
import { $ } from "../../utils/selector";
import MovieList from ".";
import Store from "../../domain/Store";
import { updateMovies } from "../../domain/movies";

const store: Store = Store.getInstance();

export const onClickMoreButton = () => {
  executeEventListener($("#more-button"), {
    type: "click",
    prevent: true
  }, async () => {
    $(".item-list").insertAdjacentHTML("beforeend", renderSkeletons());

    store.nextPage();

    if (store.getLastKeyword() === "") {
      updateMovies();
    } else {
      updateMovies(store.getLastKeyword());
    }
  });
};

export const renderMovieList = () => {
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
