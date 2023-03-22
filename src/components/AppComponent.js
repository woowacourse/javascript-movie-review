import CustomComponent from "../abstracts/CustomComponent";
import HeaderComponent from "./AppHeaderComponent";
import MovieListComponent from "./movie/MovieListComponent";
import MoreButtonComponent from "./element/MoreButtonComponent";
import TitleComponent from "./element/TitleComponent";
import MovieModalComponent from "./modal/MovieModalComponent";
import transformMovieItemsType from "../util/MovieList";
import { API_KEY } from "../constants/key";
import { ACTION, REQUEST_URL, TITLE } from "../constants/constants";
import navigate from "../util/Navigate";

const routes = [
  {
    path: "/",
    view: () => {
      const modal = document.querySelector("movie-modal");

      if (modal) {
        modal.style.opacity = 0;
        setTimeout(() => {
          modal.remove();
        }, 500);
      }
    },
  },
  {
    path: "/info",
    view: () => {},
  },
];

export const App = async () => {
  const pageMatches = routes.map((route) => {
    return {
      route: route,
      isMatch: window.location.pathname === route.path,
    };
  });

  let match = pageMatches.find((pageMatch) => pageMatch.isMatch);
  if (match) {
    match.route.view();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    const target = e.target.closest("a");
    if (!(target instanceof HTMLAnchorElement)) return;

    e.preventDefault();
    navigate(target.href);
  });

  App();
});

window.addEventListener("popstate", (event) => {
  const state = event.state;
  if (state) {
    const modal = document.createElement("movie-modal");

    Object.keys(state).forEach((key) => {
      modal.setAttribute(key, state[key]);
    });

    document.querySelector("#app").append(modal);

    setTimeout(() => {
      modal.style.opacity = 1;
    });

    window.history.replaceState(state, null, "/info");
  } else {
    navigate("/");
  }
});

window.addEventListener("keyup", async (event) => {
  if (event.key === "Backspace") {
    event.preventDefault();
    navigate("/");
  }
});

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
        this.#$movieList.appendNewPage();
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

    this.#intersectionObserver.observe(lastChild);
  }

  async fetchAPI(actionType) {
    switch (actionType) {
      case ACTION.POPULAR:
      default:
        return await fetch(
          `${REQUEST_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${
            this.#nextPage
          }`,
          { method: "GET" }
        );
      case ACTION.SEARCH:
        return await fetch(
          `${REQUEST_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${
            this.#$searchInput.value
          }&page=${this.#nextPage}&include_adult=false`,
          { method: "GET" }
        );
    }
  }

  async renderListByData(actionType) {
    const result = await this.fetchAPI(actionType)
      .then(async (res) => {
        if (!res.ok) {
          this.#$movieList.renderPageFail();
          if (this.#intersectionObserver) {
            this.#intersectionObserver.disconnect();
          }
          return false;
        }

        const data = await res.json();
        this.#totalPage = data.total_pages;

        const movieItems = transformMovieItemsType(data.results);
        this.#$movieList.renderPageSuccess(movieItems);

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

  searchListInit() {
    this.#nextPage = 1;
    this.#$movieListTitle.setTitle(
      `"${this.#$searchInput.value}" ${TITLE.SEARCH}`
    );
    this.#$movieList.initialPage();
  }

  popularListInit() {
    this.#nextPage = 1;

    this.#$searchInput.value = "";
    this.#$movieListTitle.setTitle(TITLE.POPULAR);
    this.#$movieList.initialPage();
  }

  hideSearch() {
    if (this.querySelector(".header-logo").style.display === "none") {
      this.querySelector(".search-button-wrapper").style.display = "flex";
      this.querySelector(".search-box").style.display = "none";
      this.querySelector(".header-logo").style.display = "block";
      this.querySelector(".hide-all").style.display = "none";
    }
  }

  async checkEventAction(e) {
    switch (e.target.dataset.action) {
      case "hide_search":
        this.hideSearch();
        break;
      // 로고 눌렀을 때 액션
      case "search_on":
        this.querySelector(".search-button-wrapper").style.display = "none";
        this.querySelector(".search-box").style.display = "flex";
        this.querySelector(".header-logo").style.display = "none";
        this.querySelector(".hide-all").style.display = "block";
        break;
      case ACTION.POPULAR:
        this.popularListInit();
        await this.renderListByData(ACTION.POPULAR);
        this.loadIntersectionObserver(ACTION.POPULAR);
        break;
      // 검색했을 때 액션
      case ACTION.SEARCH:
        if (this.#$searchInput.style.display === "none") {
          this.#$searchInput.style.display = "block";
          return;
        }
        if (!this.#$searchInput.value) {
          this.popularListInit();
          await this.renderListByData(ACTION.POPULAR);
          this.loadIntersectionObserver(ACTION.POPULAR);
          return;
        }
        this.hideSearch();
        this.searchListInit();
        await this.renderListByData(ACTION.SEARCH);
        this.loadIntersectionObserver(ACTION.SEARCH);
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
          this.popularListInit();
          await this.renderListByData(ACTION.POPULAR);
          this.loadIntersectionObserver(ACTION.POPULAR);
          return;
        }

        this.hideSearch();
        this.searchListInit();
        await this.renderListByData(ACTION.SEARCH);
        this.loadIntersectionObserver(ACTION.SEARCH);
      }
    });
  }

  template() {
    return `
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
