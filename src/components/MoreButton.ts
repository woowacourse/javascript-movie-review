import { dataStateStore } from "../model";
import DataFetcher from "../service/DataFetcher";
import { ListType, Movie } from "../type/movie";
import { createElementWithAttribute, debouceFunc } from "../utils";

import ItemList from "./MovieList";

// --- MoreButton click event
const MoreButtonClickHandler = {
  changeMoreButtonState(event: Event, isShowMoreButton: boolean) {
    const { target } = event;

    if (target instanceof HTMLButtonElement) {
      target.classList.toggle("open", isShowMoreButton);
    }
  },

  addItemsToMovieList(totalMovieList: Movie[]) {
    const $itemList = document.querySelector(
      ".movie-list-container .movie-list",
    );

    if (!$itemList) return;

    const $newItemList = ItemList(totalMovieList);
    $itemList.parentElement?.replaceChild($newItemList, $itemList);
  },

  getSearchInputValue() {
    const $searchInput = document.querySelector("#search-input");

    if (!($searchInput instanceof HTMLInputElement)) {
      return undefined;
    }

    return $searchInput.value;
  },

  async getSearchMovieData() {
    const title = this.getSearchInputValue();

    if (!title) return;

    await DataFetcher.handleGetSearchMovieData(title, false);
  },

  handleMovieDataState(event: Event) {
    const previousScrollPosition = window.scrollY;

    const { movieList, isShowMoreButton } = dataStateStore.movieData;

    this.addItemsToMovieList(movieList);
    this.changeMoreButtonState(event, isShowMoreButton);

    window.scrollTo(0, previousScrollPosition);
  },

  async handleMovieData(event: Event, listType: ListType) {
    if (listType === "popular") {
      await DataFetcher.handleGetPopularMovieData();
    } else {
      await this.getSearchMovieData();
    }

    this.handleMovieDataState(event);
  },

  async handleClickMoreButton(event: Event, listType: ListType) {
    event.stopPropagation();

    debouceFunc(() => this.handleMovieData(event, listType));
  },
};
// MoreButton click event ---

// make MoreButton ----
const makeMoreButton = () => {
  const $moreButton = createElementWithAttribute("button", {
    id: "more-button",
    class: "btn primary full-width more-button open",
  });
  $moreButton.textContent = "더 보기";

  return $moreButton;
};

const MoreButton = (listType: ListType, isShowMoreButton: boolean) => {
  if (!isShowMoreButton) return;
  const $moreButton = makeMoreButton();
  document.querySelector(".movie-list-container")?.appendChild($moreButton);

  $moreButton.addEventListener("click", (event) =>
    MoreButtonClickHandler.handleClickMoreButton(event, listType),
  );
};

export default MoreButton;
