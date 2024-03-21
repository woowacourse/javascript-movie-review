import MovieItem from "../MovieItem/MovieItem";
import MoreMoviesButton from "../MoreMoviesButton/MoreMoviesButton";
import { getSearchedMoviesData } from "../../api/getSearchedMoviesData";
import { getPopularMoviesData } from "../../api/getPopularMoviesData";
import { $, $$, createElement } from "../../utility/dom";

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
    movieListTitle.textContent = "지금 인기 있는 영화";

    const movieListUl = createElement("ul", {
      class: "item-list",
    });

    this.#movieListSection.appendChild(movieListTitle);
    this.#movieListSection.appendChild(movieListUl);
  }

  async #createPopularMovieItems() {
    const ul = $(".item-list");
    const data = await getPopularMoviesData(this.#currentPage.toString());
    const liList = this.#createEmptyMovieItems(data, ul);

    setTimeout(() => {
      this.#updateMovieItemsWithData(data, liList);

      const moreMoviesButton = this.#createMoreMoviesButton();
      moreMoviesButton.addEventListener("click", () =>
        this.#handlePopularPageEnd()
      );
    }, 1000);

    this.#currentPage += 1;
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
      this.#movieListSection.innerHTML = "";
      this.#currentPage = 1;

      const titleInput = (
        searchForm.querySelector("input[type='text']") as HTMLInputElement
      ).value;

      this.#title = titleInput;

      this.#renderSearchedMovieList(titleInput);
      this.#createSearchedMovieItems(titleInput);
    });
  }

  #renderSearchedMovieList(titleInput: string) {
    const movieListTitle = createElement("h2");
    movieListTitle.textContent = `"${titleInput}" 검색 결과`;

    const searchedMovieListUl = createElement("ul", {
      class: "item-list",
    });

    this.#movieListSection.appendChild(movieListTitle);
    this.#movieListSection.appendChild(searchedMovieListUl);
  }

  async #createSearchedMovieItems(titleInput: string) {
    const ul = $("ul");
    const data = await this.#getSearchedMoviesData(titleInput);
    const liList = this.#createEmptyMovieItems(data, ul);

    setTimeout(() => {
      this.#updateMovieItemsWithData(data, liList);

      this.#handleSearchedPageEnd(data);
    }, 1000);
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
      moreMoviesButton.addEventListener("click", () =>
        this.#createSearchedMovieList()
      );

      this.#currentPage += 1;
      return;
    }

    this.#removeMoreMoviesButton();
    this.#displayMaxPageInfo();
  }

  // 인기순 및 검색 리스트 공통 메서드
  #createMovieItem() {
    const li = createElement("li");
    const article = createElement("article", {
      class: "item-card",
    });
    const thumbnail = createElement("img", {
      class: "item-thumbnail skeleton",
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
    article.appendChild(thumbnail);
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
    maxPageInfoElement.textContent = "목록의 끝에 도달했습니다 🚀";

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
}

export default MovieList;
