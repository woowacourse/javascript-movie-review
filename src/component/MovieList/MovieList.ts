import MovieItem from "../MovieItem/MovieItem";
import MoreMoviesButton from "../MoreMoviesButton/MoreMoviesButton";
import { getSearchedMoviesData } from "../../api/getSearchedMoviesData";
import { getPopularMoviesData } from "../../api/getPopularMoviesData";
import { $, $$, createElement } from "../../utility/dom";
import hangsungImg from "../../image/wooteco-icon.png";
import { validation } from "../../utility/validation";
import {
  ERROR_MESSAGE,
  INFO_MESSAGE,
  TITLE_TEXT,
} from "../../constant/setting";

const MAX_PAGE_PER_REQUEST = 20;
const MAX_PAGE_COUNT = 50;

class MovieList {
  #type: string;
  #title: string;
  #movieListSection;
  #currentPage = 1;

  constructor() {
    this.#title = "";
    this.#movieListSection = $(".item-view") as Element;
    this.#type = "popular";

    this.#renderPopularMovieList();
    this.#createPopularMovieItems();
    this.#setupSearchHandler();
  }

  #renderPopularMovieList() {
    const movieListTitle = createElement("h2");
    movieListTitle.textContent = TITLE_TEXT.POPULAR;

    const movieListUl = createElement("ul", {
      class: "item-list",
    });

    this.#movieListSection.appendChild(movieListTitle);
    this.#movieListSection.appendChild(movieListUl);
  }

  async #createPopularMovieItems() {
    const ul = $(".item-list");

    try {
      const data = await getPopularMoviesData(this.#currentPage.toString());

      const liList = this.#createEmptyMovieItems(data, ul);

      setTimeout(() => {
        this.#updateMovieItemsWithData(data, liList);

        const moreMoviesButton = this.#createMoreMoviesButton();
        moreMoviesButton.addEventListener("click", () => {
          this.#handlePopularPageEnd();
          this.#currentPage += 1;
        });
      }, 1000);
    } catch (error) {
      this.#handleError(error as Error);
    }
    this.#removeMoreMoviesButton();
  }

  #handlePopularPageEnd() {
    if (this.#currentPage === MAX_PAGE_COUNT) this.#displayMaxPageInfo();
    if (this.#currentPage > MAX_PAGE_COUNT) return;

    this.#createPopularMovieItems();
  }

  #setupSearchHandler() {
    const searchForm = $(".search-box");

    searchForm?.addEventListener("submit", (event) => {
      event.preventDefault();

      this.#type = "search";
      this.#currentPage = 1;

      const titleInput = (
        searchForm.querySelector("input[type='text']") as HTMLInputElement
      ).value;

      if (!validation.validateEmptyInput(titleInput)) {
        alert(INFO_MESSAGE.EMPTY_SEARCH_KEYWORD);
        return;
      }

      this.#title = titleInput;
      this.#movieListSection.innerHTML = "";
      this.#renderSearchedMovieList(titleInput);
      this.#createSearchedMovieItems(titleInput);
    });
  }

  #renderSearchedMovieList(titleInput: string) {
    const movieListTitle = createElement("h2");
    movieListTitle.textContent = TITLE_TEXT.SEARCH(titleInput);

    const searchedMovieListUl = createElement("ul", {
      class: "item-list",
    });

    this.#movieListSection.appendChild(movieListTitle);
    this.#movieListSection.appendChild(searchedMovieListUl);
  }

  async #createSearchedMovieItems(titleInput: string) {
    const ul = $("ul");

    try {
      const data = await this.#getSearchedMoviesData(titleInput);
      if (data.length > 0) {
        const liList = this.#createEmptyMovieItems(data, ul);

        setTimeout(() => {
          this.#updateMovieItemsWithData(data, liList);
          this.#handleSearchedPageEnd(data);
        }, 1000);
      }
    } catch (error) {
      this.#handleError(error as Error);
    }
  }

  async #getSearchedMoviesData(titleInput: string) {
    return await getSearchedMoviesData(
      this.#currentPage.toString(),
      titleInput
    );
  }

  #handleSearchedPageEnd(data: IMovieItemData[]) {
    if (data.length === MAX_PAGE_PER_REQUEST) {
      this.#removeMoreMoviesButton();

      const moreMoviesButton = this.#createMoreMoviesButton();
      moreMoviesButton.addEventListener("click", () => {
        this.#createSearchedMovieList();
        this.#currentPage += 1;
      });

      return;
    }

    this.#removeMoreMoviesButton();
    this.#displayMaxPageInfo();
  }

  // NOTE: 인기순 및 검색 리스트 공통 메서드
  #createMovieItem() {
    const li = createElement("li");
    const article = createElement("article", {
      class: "item-card",
    });
    const tumbnailContainer = createElement("div", {
      class: "thumbnail-container skeleton",
    });
    const thumbnail = createElement("img", {
      class: "item-thumbnail",
      loading: "lazy",
      alt: "",
    }) as HTMLImageElement;
    const title = createElement("p", {
      class: "item-title skeleton",
    });
    const scoreWrapper = createElement("div", {
      class: "item-score-wrapper",
    });
    const score = createElement("span", {
      class: "item-score skeleton",
    });
    const starImg = createElement("img", {
      class: "item-filled-star",
    }) as HTMLImageElement;

    scoreWrapper.appendChild(score);
    scoreWrapper.appendChild(starImg);
    article.appendChild(tumbnailContainer);
    tumbnailContainer.appendChild(thumbnail);
    article.appendChild(title);
    article.appendChild(scoreWrapper);
    li.appendChild(article);

    return li;
  }

  #createEmptyMovieItems(
    data: IMovieItemData[],
    ul: HTMLElement | null
  ): HTMLLIElement[] {
    return data.map(() => {
      const liElement = this.#createMovieItem() as HTMLLIElement;
      ul?.appendChild(liElement);
      return liElement;
    });
  }

  #updateMovieItemsWithData(data: IMovieItemData[], liList: HTMLLIElement[]) {
    this.#removeSkeleton();

    const movieItems = data.map(
      ({ title, poster_path, vote_average }) =>
        new MovieItem({ title, poster_path, vote_average })
    );

    movieItems.forEach((movieItem: MovieItem, index: number) => {
      const li = liList[index];
      if (li) {
        movieItem.setMovieItemData(li);
      }
    });
  }

  #createSearchedMovieList() {
    this.#createSearchedMovieItems(this.#title);
  }

  #displayMaxPageInfo() {
    this.#removeMoreMoviesButton();
    const maxPageInfo = this.#createMaxPageInfo();

    this.#movieListSection.appendChild(maxPageInfo);
  }

  #createMaxPageInfo() {
    const maxPageInfoElement = createElement("p", {
      class: "max-page-info",
    });
    maxPageInfoElement.textContent = INFO_MESSAGE.MAX_PAGE;

    return maxPageInfoElement;
  }

  #createMoreMoviesButton() {
    const moreMoviesButton = MoreMoviesButton.createMoreMoviesButton();
    this.#movieListSection.appendChild(moreMoviesButton);

    return moreMoviesButton;
  }

  #removeMoreMoviesButton() {
    $(".btn")?.remove();
  }

  #removeSkeleton() {
    const skeletonElements = $$(".skeleton");

    if (skeletonElements) {
      skeletonElements.forEach((element) => {
        element.classList.remove("skeleton");
      });
    }
  }

  #crateErrorUI(message: string) {
    const sectionElement = $(".item-view");
    const errorWrapper = createElement("div", {
      class: "error-wrapper",
    });
    const imgElement = createElement("img", {
      class: "wooteco-icon",
      src: hangsungImg,
    });
    const textElement = createElement("p", {
      class: "error-message",
    });
    textElement.textContent = message;

    if (sectionElement) {
      sectionElement.innerHTML = "";
      sectionElement.appendChild(errorWrapper);
    }

    if (errorWrapper) {
      errorWrapper.appendChild(imgElement);
      errorWrapper.appendChild(textElement);
    }
  }

  async #handleError(error: Error) {
    if (typeof error === "object" && error.message) {
      this.#crateErrorUI(error.message);
    } else {
      this.#crateErrorUI(ERROR_MESSAGE.UNKNOWN);
    }
  }
}

export default MovieList;
