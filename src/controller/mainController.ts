import {
  morePopularController,
  moreSearchController,
} from "./moreButtonController";
import { popularController } from "./popularController";
import { searchController } from "./searchController";
import { MovieBannerView } from "../view/movieBannerView";
import { MovieListView } from "../view/movieListView";
import { SearchView } from "../view/searchView";
import { AppState } from "../state/appState";
import { ModalView } from "../view/modalView";
import { modalController } from "./modalController";
import { rateController } from "./rateController";
import { InfiniteScrollView } from "../view/infiniteScrollView";

export class MainController {
  #movieListView;
  #movieBannerView;
  #searchView;
  #infiniteScrollView;
  #modalView;

  #appState;

  constructor() {
    this.#movieListView = new MovieListView((id: string) =>
      this.#handleMovieItem(id),
    );
    this.#movieBannerView = new MovieBannerView((id: string) =>
      this.#handleMovieItem(id),
    );
    this.#searchView = new SearchView(() => this.#handleSearch());
    this.#modalView = new ModalView((id: string) => this.#handleRate(id));
    this.#infiniteScrollView = new InfiniteScrollView(() =>
      this.#getObserver(),
    );
    this.#appState = new AppState();
  }

  async init() {
    const app = document.querySelector("#app");

    if (!app) return;

    this.#appState.reset();
    await popularController(
      this.#appState.getPage(),
      this.#movieListView,
      this.#movieBannerView,
      this.#infiniteScrollView,
    );
  }

  async #handleSearch() {
    this.#appState.resetSearch();

    this.#appState.setValue(this.#searchView.getValue());
    await searchController(
      this.#appState,
      this.#movieListView,
      this.#infiniteScrollView,
    );

    this.#appState.setIsSearch(true);
    this.#movieBannerView.hide();

    this.#movieListView.setTitle(
      `"${this.#appState.getSearchValue()}" 검색 결과`,
    );
  }

  #getObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          this.#handleAddButton();
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0,
      },
    );

    return observer;
  }

  async #handleAddButton() {
    if (this.#appState.getIsSearch()) {
      moreSearchController(
        this.#appState,
        this.#movieListView,
        this.#infiniteScrollView,
      );
    } else {
      morePopularController(
        this.#appState,
        this.#movieListView,
        this.#infiniteScrollView,
      );
    }
  }

  async #handleMovieItem(id: string) {
    this.#modalView.open();
    modalController(id, this.#modalView, this.#appState);
  }

  async #handleRate(rate: string) {
    rateController(rate, this.#modalView, this.#appState);
  }
}
