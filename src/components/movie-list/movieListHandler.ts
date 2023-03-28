import { updateMovies } from "../../domain/movies";
import Store from "../../domain/Store";
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
  const observer = new IntersectionObserver(checkIntersectionObserverEntries);
  observer.observe(loadingTrigger as Element);
}


export const checkIntersectionObserverEntries = (intersectionObserverEntries: IntersectionObserverEntry[]) => {
  const isElementVisible = intersectionObserverEntries[0].isIntersecting; // 옵저빙을 하나만 했으므로 굳이 배열을 돌리지 않습니다.
  if (isElementVisible) {
    loadNextPage();
  }
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
