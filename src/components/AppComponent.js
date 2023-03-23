import CustomComponent from "../abstracts/CustomComponent";
import HeaderComponent from "./AppHeaderComponent";
import MovieListComponent from "./movie/MovieListComponent";
import TitleComponent from "./element/TitleComponent";
import MovieModalComponent from "./modal/MovieModalComponent";
import { ACTION, TITLE } from "../constants/constants";
import { Router } from "../util/Router";
import { fetchPopularMovieList, fetchSearchMovieList } from "../util/Api";

export default class AppComponent extends CustomComponent {
  #nextPage = 1;
  #totalPage;
  #$movieList;
  #$movieListTitle;
  #$searchInput;
  #intersectionObserver;

  async render() {
    super.render();

    this.#$movieList = this.querySelector("movie-list");
    this.#$movieListTitle = this.querySelector("movie-list-title");
    this.#$searchInput = this.querySelector("input");

    this.popularListInit();
    await this.renderListByData(ACTION.POPULAR);
    this.loadIntersectionObserver(ACTION.POPULAR);
  }

  async loadIntersectionObserver(type) {
    const lastChild = await this.#$movieList.querySelector(
      `movie-item:last-of-type`
    );

    this.#intersectionObserver = new IntersectionObserver((entry) => {
      const ioTarget = entry[0].target;

      if (entry[0].isIntersecting && this.checkHasNextPage()) {
        this.#intersectionObserver.unobserve(ioTarget);
        this.renderListByData(type).then((res) => {
          if (res) {
            const newLastChild = this.#$movieList.querySelector(
              `movie-item:last-of-type`
            );

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

  async fetchAPI(actionType) {
    switch (actionType) {
      case ACTION.POPULAR:
      default:
        return await fetchPopularMovieList(this.#nextPage);
      case ACTION.SEARCH:
        return await fetchSearchMovieList(
          this.#$searchInput.value,
          this.#nextPage
        );
    }
  }

  async renderListByData(actionType) {
    this.#$movieList.appendNewPage();

    const result = await this.fetchAPI(actionType)
      .then(async (res) => {
        if (!res.isSuccess) {
          this.#$movieList.renderPageFail();
          if (this.#intersectionObserver) {
            this.#intersectionObserver.disconnect();
          }
          return false;
        }

        const listData = res.data.list;
        this.#$movieList.renderPageSuccess(listData);

        const totalPage = res.data.totalPage;
        this.#totalPage = totalPage;

        this.#nextPage += 1;

        return true;
      })
      .catch((error) => {
        this.#$movieList.renderPageFail();
        if (this.#intersectionObserver) {
          this.#intersectionObserver.disconnect();
        }
        return false;
      });

    return result;
  }

  checkHasNextPage() {
    if (this.#totalPage < this.#nextPage) {
      this.#intersectionObserver.disconnect();
      return false;
    }

    return true;
  }

  async searchListInit() {
    this.#nextPage = 1;
    this.#$movieListTitle.setTitle(
      `"${this.#$searchInput.value}" ${TITLE.SEARCH}`
    );
    this.#$movieList.initialPage();

    await this.renderListByData(ACTION.SEARCH);
    this.loadIntersectionObserver(ACTION.SEARCH);
  }

  popularListInit() {
    this.#nextPage = 1;

    this.#$searchInput.value = "";
    this.#$movieListTitle.setTitle(TITLE.POPULAR);
    this.#$movieList.initialPage();
  }

  async popularListAction() {
    this.popularListInit();
    await this.renderListByData(ACTION.POPULAR);
  }

  async searchListAction() {
    await this.searchListInit();
    await this.renderListByData(ACTION.SEARCH);
  }

  async checkEventAction(e) {
    switch (e.target.dataset.action) {
      // 로고 눌렀을 때 액션
      case ACTION.POPULAR:
        this.popularListAction();
        break;
      // 검색했을 때 액션
      case ACTION.SEARCH:
        // 검색 값이 없을 때 전체 리스트 보여줌.
        if (!this.#$searchInput.value) {
          this.popularListAction();
          return;
        }
        this.searchListAction();
        break;
    }
  }

  handleEvent() {
    this.addEventListener("click", async (e) => {
      await this.checkEventAction(e);
    });

    // 검색시 엔터 눌렀을 때 액션
    this.addEventListener("keyup", async (e) => {
      if (e.key === "Enter") {
        e.preventDefault();

        if (!this.#$searchInput.value) {
          this.popularListAction();
          return;
        }

        this.querySelector("app-header").hideSearch();
        this.searchListAction();
      }
    });

    this.defaultRoutingEvent();
  }

  defaultRoutingEvent() {
    window.addEventListener("DOMContentLoaded", () => {
      Router();
    });

    window.addEventListener("popstate", () => {
      Router();
    });
  }

  template() {
    return /*html*/ `
        <div id="app">
            <app-header></app-header>
            <main>
                <section class="item-view">
                    <movie-list-title></movie-list-title>
                    <movie-list></movie-list>
                </section>
            </main>
        </div>
        `;
  }
}

customElements.define("app-component", AppComponent);
