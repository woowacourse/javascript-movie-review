import ItemCardList from "../components/ItemCardList";
import {
  handleGetPopularMovieData,
  handleGetSearchMovieData,
} from "../service/handleSkeletonAndAPI";
import { ListType } from "../type/movie";

import movieDataStateStore from "./MovieDataStateStore";

const removeLoader = () => {
  if (movieDataStateStore.fetchedMovieData.isEndPage) {
    const $loader = document.querySelector(".loader");
    $loader?.remove();
  }
};

const addItemCardList = () => {
  if (
    movieDataStateStore.fetchedMovieData.movieList !== undefined &&
    movieDataStateStore.fetchedMovieData.movieList.length !== 0
  ) {
    ItemCardList(movieDataStateStore.fetchedMovieData.movieList);
  }

  removeLoader();
};

const getSearchInputValue = () => {
  const $searchInput = document.querySelector("#search-input");
  return $searchInput instanceof HTMLInputElement ? $searchInput.value : "";
};

const getSearchMovieData = async () => {
  const title = getSearchInputValue();

  if (!title) return;

  await handleGetSearchMovieData(title, false);
};

const fetchMoreData = async (listType: ListType) => {
  if (listType === "popular") {
    await handleGetPopularMovieData();
  } else {
    await getSearchMovieData();
  }
  addItemCardList();
};

export default fetchMoreData;
