import CustomComponent from "../abstracts/CustomComponent";
import HeaderComponent from "./AppHeaderComponent";
import MovieListComponent from "./movie/MovieListComponent";
import MoreButtonComponent from "./element/MoreButtonComponent";
import TitleComponent from "./element/TitleComponent";
import ModalComponent from "./ModalComponent";

import UpScrollButtonComponent from "./element/UpScrollButtonComponent";
import transformMovieItemsType from "../util/MovieList";
import {
  ACTION,
  ERROR_MESSAGE,
  REQUEST_URL,
  SCROLL_INVOKE_GAP,
  SEARCH_WARNING,
  TITLE,
} from "../constants/constants";
import { getRequest, transData } from "../api/handler";
import { urlByActionType } from "../api/url";
import { API_KEY } from "../constants/key";

export default class AppComponent extends CustomComponent {
  #nextPage = 1;
  #totalPage;
  #$movieList;
  #$movieListTitle;
  #$searchInput;
  #scrollThrottleId;

  render() {
    super.render();

    this.#$movieList = this.querySelector("movie-list");
    this.#$movieListTitle = this.querySelector("movie-list-title");
    this.#$searchInput = this.querySelector("input");

    this.popularListInit();
    this.getMovieData(ACTION.POPULAR);
    this.changeMoreButtonAction(ACTION.MORE_POPULAR);
  }

  getMovieData(actionType) {
    getRequest(
      urlByActionType(actionType, {
        nextPage: this.#nextPage,
        query: this.#$searchInput.value,
      })
    )
      .then((res) => {
        const data = transData(res);
        this.#$movieList.renderPageSuccess(data.results);

        this.#nextPage += 1;
        this.#totalPage = data.totalPage;

        this.changeButtonDisplayByPage();
      })
      .catch(() => {
        this.#$movieList.renderPageFail();
      });
  }

  changeButtonDisplayByPage() {
    if (this.isEndOfPage()) {
      this.querySelector("more-button").classList.add("hide");
      return;
    }
    this.querySelector("more-button").classList.remove("hide");
  }

  isEndOfPage() {
    return this.#totalPage <= this.#nextPage;
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

  changeMoreButtonAction(actionType) {
    this.querySelector("more-button").setAttribute("data-action", actionType);
  }

  handleEvent() {
    this.addEventListener("click", (e) => {
      switch (e.target.dataset.action) {
        case ACTION.POPULAR:
          this.popularListInit();
          this.getMovieData(ACTION.POPULAR);
          this.changeMoreButtonAction(ACTION.MORE_POPULAR);
          break;
        case ACTION.SEARCH:
          if (!this.#$searchInput.value.trim()) {
            alert(SEARCH_WARNING);
            return;
          }
          this.searchListInit();
          this.getMovieData(ACTION.SEARCH);
          this.changeMoreButtonAction(ACTION.MORE_SEARCH);
          break;
        case ACTION.MORE_POPULAR:
          this.#$movieList.appendNewPage();
          this.getMovieData(ACTION.POPULAR);
          break;
        case ACTION.MORE_SEARCH:
          this.#$movieList.appendNewPage();
          this.getMovieData(ACTION.SEARCH);
          break;
        case ACTION.UP_SCROLL:
          window.scroll({ top: 0, behavior: "smooth" });
          break;
        case ACTION.DETAIL:
          const movieId = e.target.dataset.movieId;
          getRequest(
            `${REQUEST_URL}/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`
          )
            .then((res) => {
              const modal = document.querySelector("modal-component");
              modal.setAttribute("data-item", JSON.stringify(res));

              modal.style.display = "flex";
              document.body.style.overflow = "hidden";
            })
            .catch(() => {
              alert(ERROR_MESSAGE);
            });
          break;
      }
    });

    this.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();

        if (!this.#$searchInput.value.trim()) {
          alert(SEARCH_WARNING);
          return;
        }

        this.searchListInit();
        this.getMovieData(ACTION.SEARCH);
        this.changeMoreButtonAction(ACTION.MORE_SEARCH);
      }
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const modalComponent = document.querySelector("modal-component");

        modalComponent.style.display = "none";
        document.body.style.overflow = "visible";
      }
    });

    window.addEventListener("scroll", () => {
      if (this.isEndOfPage()) return;

      this.toggleUpScrollButton();

      if (!this.#scrollThrottleId) {
        this.#scrollThrottleId = setTimeout(() => {
          if (
            this.getBoundingClientRect().bottom - window.innerHeight <
            SCROLL_INVOKE_GAP
          ) {
            this.#$movieList.appendNewPage();
            this.getMovieData(ACTION.POPULAR);
          }
          this.#scrollThrottleId = null;
        }, 1000);
      }
    });
  }

  toggleUpScrollButton() {
    const header = document.querySelector("app-header");
    const upScrollBtn = document.querySelector("up-scroll-button");

    if (header.getBoundingClientRect().bottom < 0) {
      upScrollBtn.classList.remove("hide");
      return;
    }
    upScrollBtn.classList.add("hide");
  }

  template() {
    return `
        <div id="app">
            <app-header></app-header>
            <main>
                <section class="item-view">
                    <movie-list-title></movie-list-title>
                    <movie-list></movie-list>
                    <more-button></more-button>
                </section>
            </main>
            <up-scroll-button class="hide"></up-scroll-button>
        </div>
        `;
  }
}

customElements.define("app-component", AppComponent);
