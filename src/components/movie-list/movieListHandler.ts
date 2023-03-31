import { updateMovies } from "../../domain/movies";
import Store from "../../domain/Store";
import { observeIntersection } from "../../utils/observeIntersection";
import { $ } from "../../utils/selector";
import MovieList from "./MovieList";

const store: Store = Store.getInstance();

export const renderMovieList = () => {
  const movieList = $("#movie-list") as MovieList;
  movieList.render();

  handleInfinityScroll();
};

const handleInfinityScroll = () => {
  const loadingTrigger = document.getElementById('loading-trigger');
  observeIntersection(loadingTrigger as HTMLElement, loadNextPage);
}


const loadNextPage = () => {
  $(".item-list").insertAdjacentHTML("beforeend", dummySkeletons());
  store.nextPage();

  if (store.getLastKeyword() === "") {
    updateMovies();
  } else {
    updateMovies(store.getLastKeyword());
  }
}

export const removeMoreButton = () => {
  $("#loading-trigger").remove();
};

export const dummySkeletons = () => {
  return "<movie-skeleton></movie-skeleton>".repeat(20);
};
