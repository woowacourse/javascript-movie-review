import CustomComponent from "../../abstracts/CustomComponent";
import TitleComponent from "../element/TitleComponent";
import MovieComponent from "./MovieComponent";
import ErrorComponent from "./ErrorComponent";
import { MOVIES_PER_PAGE, ACTION, TITLE } from "../../constants/constants";
import { fetchPopularMovieList, fetchSearchMovieList } from "../../util/Api";

export default class MovieListComponent extends CustomComponent {
  #page;
  #intersectionObserver;
  #nextPage = 1;
  #totalPage;
  #searchKeyword;
  #$movieListTitle;
  #$movieList;

  async render() {
    super.render();
    this.#$movieListTitle = this.querySelector("movie-list-title");
    this.#$movieList = this.querySelector(".movie-item-list");
    await this.popularListInit();
  }

  setSearchKeyword(keyword) {
    this.#searchKeyword = keyword;
  }

  initialPage() {
    this.#page = ``;
    this.#$movieList.innerHTML = ``;
  }

  async searchListInit() {
    this.#nextPage = 1;
    this.#$movieListTitle.setTitle(`"${this.#searchKeyword}" ${TITLE.SEARCH}`);
    this.initialPage();

    await this.renderListByData(ACTION.SEARCH);
    this.loadIntersectionObserver(ACTION.SEARCH);
  }

  async popularListInit() {
    this.#nextPage = 1;

    document.querySelectorAll("input").forEach((el) => (el.value = ""));
    this.#$movieListTitle.setTitle(TITLE.POPULAR);
    this.initialPage();

    await this.renderListByData(ACTION.POPULAR);
    this.loadIntersectionObserver(ACTION.POPULAR);
  }

  async loadIntersectionObserver(type) {
    const lastChild = this.querySelector(`movie-item:last-of-type`);

    this.#intersectionObserver = new IntersectionObserver((entry) => {
      const ioTarget = entry[0].target;

      if (entry[0].isIntersecting && this.checkHasNextPage()) {
        this.#intersectionObserver.unobserve(ioTarget);
        this.renderListByData(type).then((res) => {
          if (res) {
            const newLastChild = this.querySelector(`movie-item:last-of-type`);

            this.#intersectionObserver.observe(newLastChild);
          }
        });
      }
    });

    if (lastChild) {
      this.#intersectionObserver.observe(lastChild);
      return;
    }

    this.#intersectionObserver.disconnect();
  }

  checkHasNextPage() {
    if (this.#totalPage < this.#nextPage) {
      this.#intersectionObserver.disconnect();
      return false;
    }
    return true;
  }

  async fetchAPI(actionType) {
    switch (actionType) {
      case ACTION.POPULAR:
      default:
        return await fetchPopularMovieList(this.#nextPage);
      case ACTION.SEARCH:
        return await fetchSearchMovieList(this.#searchKeyword, this.#nextPage);
    }
  }

  async renderListByData(actionType) {
    this.appendSkeletonPage();

    const result = await this.fetchAPI(actionType)
      .then(async (res) => {
        if (!res.isSuccess) {
          this.renderPageFail();
          if (this.#intersectionObserver) {
            this.#intersectionObserver.disconnect();
          }
          return false;
        }

        const listData = res.data.list;
        this.renderPageSuccess(listData);

        this.#totalPage = res.data.totalPage;
        this.#nextPage += 1;

        return true;
      })
      .catch((error) => {
        this.renderPageFail();
        if (this.#intersectionObserver) {
          this.#intersectionObserver.disconnect();
        }
        return false;
      });

    return result;
  }

  renderPageFail() {
    if (this.querySelector("error-page")) return;

    const errorPage = document.createElement("error-page");
    this.append(errorPage);
  }

  appendSkeletonPage() {
    const errorPage = this.querySelector("error-page");
    if (errorPage) {
      errorPage.remove();
    }

    this.#page = /*html*/ `
          <div class="skeleton-card">
            <div class="item-card skeleton">
              <div class="item-thumbnail skeleton"></div>
              <div class="item-title skeleton"></div>
              <div class="item-score skeleton"></div>
            </div>
          </div>
      `.repeat(MOVIES_PER_PAGE);

    this.#$movieList.insertAdjacentHTML("beforeend", this.#page);
  }

  setNoResultPage() {
    this.#$movieList.classList.add("no-result-list");

    this.#$movieList.innerHTML = /*html*/ `
        <div class="no-result-box">
          <h1 class="no-result-title">검색 결과를 찾지 못하였습니다.</h1>
          <ul class="no-result-recommends">
            <li>단어의 철자가 정확한지 확인해 보세요.</li>
            <li>검색어의 단어 수를 줄이거나, 보다 일반적인 검색어로 다시 검색해 보세요.</li>
            <li>두 단어 이상의 검색어인 경우, 띄어쓰기를 확인해 보세요.</li>
          </ul>
        </div>
      `;
  }

  renderPageSuccess(movieItems) {
    if (!movieItems.length) {
      this.setNoResultPage();

      return;
    }

    this.#$movieList.classList.remove("no-result-list");

    this.querySelectorAll(".skeleton-card").forEach((el) => {
      el.remove();
    });

    this.#page = `
            ${movieItems
              .map((movieItem) => {
                return `
                  <movie-item
                    id="${movieItem.id}"
                    title="${movieItem.title}"
                    poster_path="${movieItem.poster_path}"
                    vote_average="${movieItem.vote_average}"
                  >
                  </movie-item>`;
              })
              .join("")}
        `;

    this.#$movieList.insertAdjacentHTML("beforeend", this.#page);
  }

  template() {
    return `
      <movie-list-title></movie-list-title>
      <div class="movie-item-list"></div>
    `;
  }
}

customElements.define("movie-list", MovieListComponent);
