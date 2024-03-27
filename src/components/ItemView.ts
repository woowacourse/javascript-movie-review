/* eslint-disable max-depth */
/* eslint-disable max-lines-per-function */
import { movieDataStateStore } from "../model";
import { handleGetPopularMovieData } from "../service/handleSkeletonAndAPI";
import { ListType, PartialMovieDataForItemView } from "../type/movie";
import { createElementWithAttribute } from "../utils";
import throttleFunc from "../utils/throttleFunc";

import ItemCardList from "./ItemCardList";
import Title from "./Title";

const $main = document.querySelector("main");

const makeSection = (titleText: string) => {
  const $viewContainer = createElementWithAttribute("div", {
    class: "item-view-container",
  });
  const $itemCardList = createElementWithAttribute("ul", {
    class: "item-list",
  });
  $viewContainer.appendChild(Title(titleText));
  $viewContainer.appendChild($itemCardList);
  return $viewContainer;
};

const handleMovieData = async (listType: ListType) => {
  if (listType === "popular") {
    await handleGetPopularMovieData();
  }
  // else {
  //   await getSearchMovieData();
  // }

  ItemCardList(movieDataStateStore.fetchedMovieData);
};

const checkEndOfPage = () => {
  const mainElement = document.querySelector("main");
  if (mainElement) {
    const isScrollAtBottom =
      window.innerHeight + window.scrollY >= mainElement.offsetHeight;
    return isScrollAtBottom;
  }
  return false;
};

const fetchMoreData = async (listType: ListType) => {
  if (checkEndOfPage()) {
    handleMovieData(listType);
  }
};

const handleScrollToBottom = (listType: ListType) => {
  console.log("fetchMoreData", listType);
  window.addEventListener("scroll", () => {
    throttleFunc(() => {
      fetchMoreData(listType);
    });
  });
};

const renderItemView = (
  titleText: string,
  movieData: PartialMovieDataForItemView,
  listType: ListType,
) => {
  const $itemView = createElementWithAttribute("section", {
    class: "item-view",
  });
  $itemView.appendChild(makeSection(titleText));
  $main?.appendChild($itemView);

  ItemCardList(movieData.movieList);

  handleScrollToBottom(listType);
};
export default renderItemView;
