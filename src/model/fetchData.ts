import ItemCardList from "../components/ItemCardList";
import {
  handleGetPopularMovieData,
  handleGetSearchMovieData,
} from "../service/handleSkeletonAndAPI";
import { ListType } from "../type/movie";

import movieDataStateStore from "./MovieDataStateStore";

const addItemCardList = () => {
  if (
    movieDataStateStore.fetchedMovieData.movieList !== undefined &&
    movieDataStateStore.fetchedMovieData.movieList.length !== 0
  ) {
    ItemCardList(movieDataStateStore.fetchedMovieData.movieList);
  }

  if (movieDataStateStore.fetchedMovieData.isEndPage) {
    const $loader = document.querySelector(".loader");
    $loader?.remove();
  }
};

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

const fetchMoreData = async (listType: ListType) => {
  if (listType === "popular") {
    await handleGetPopularMovieData();
  } else {
    await getSearchMovieData();
  }
  addItemCardList();
};

export default fetchMoreData;
