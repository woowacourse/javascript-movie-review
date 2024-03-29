/* eslint-disable max-lines-per-function */
import { movieDataStateStore } from "../model";
import {
  handleGetPopularMovieData,
  handleGetSearchMovieData,
} from "../service/handleSkeletonAndAPI";
import { ListType } from "../type/movie";

import ItemCardList from "./ItemCardList";

const getSearchInputValue = () => {
  const $searchInput = document.querySelector("#search-input");

  if (!($searchInput instanceof HTMLInputElement)) {
    return undefined;
  }

  return $searchInput.value;
};

const getSearchMovieData = async () => {
  const title = getSearchInputValue();

  if (!title) return;

  await handleGetSearchMovieData(title, false);
};

const addItemCardList = () => {
  if (
    movieDataStateStore.fetchedMovieData.movieList !== undefined &&
    movieDataStateStore.fetchedMovieData.movieList.length !== 0
  ) {
    ItemCardList(movieDataStateStore.fetchedMovieData.movieList);
    return undefined;
  }
  const $loader = document.querySelector(".loader");
  $loader?.remove();
  return undefined;
};

const fetchMoreData = async (listType: ListType) => {
  if (listType === "popular") {
    await handleGetPopularMovieData();
  } else {
    await getSearchMovieData();
  }
  addItemCardList();
};

const handleIntersection = (
  entries: IntersectionObserverEntry[],
  listType: ListType,
) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      fetchMoreData(listType);
    }
  });
};

const createIntersectionObserver = (listType: ListType) => {
  const observer = new IntersectionObserver(
    (entries) => handleIntersection(entries, listType),
    {
      rootMargin: "0px 0px -50px 0px",
    },
  );

  return observer;
};

let previousObserver: IntersectionObserver | null = null;
const addObserver = ($loadMore: HTMLElement, listType: ListType) => {
  if (previousObserver) {
    previousObserver.disconnect();
  }

  const observer = createIntersectionObserver(listType);
  observer.observe($loadMore);

  previousObserver = observer;
};

const LoadMore = (listType: ListType, isEndPage: boolean) => {
  const $itemView = document.querySelector(".item-view");

  const $loader = document.createElement("div");
  $loader.classList.add("loader");

  for (let i = 0; i < 3; i += 1) {
    const $dot = document.createElement("div");
    $dot.classList.add("loader-dot");
    $loader.appendChild($dot);
  }

  if (!isEndPage) $itemView?.appendChild($loader);

  addObserver($loader, listType);
};
export default LoadMore;
