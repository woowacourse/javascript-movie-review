import CustomComponent from "../abstracts/CustomComponent";
import HeaderComponent from "./AppHeaderComponent";
import MovieListComponent from "./movie/MovieListComponent";
import MoreButtonComponent from "./element/MoreButtonComponent";
import TitleComponent from "./element/TitleComponent";
import transformMovieItemsType from "../util/MovieList";
import { ACTION, SEARCH_WARNING, TITLE } from "../constants/constants";
import { getRequest, transData } from "../api/handler";
import { urlByActionType } from "../api/url";

export default class AppComponent extends CustomComponent {
  #nextPage = 1;
  #totalPage;
  #$movieList;
  #$movieListTitle;
  #$searchInput;

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
        this.changeButtonDisplayByPage();
      })
      .catch(() => {
        this.#$movieList.renderPageFail();
      });
  }

  changeButtonDisplayByPage() {
    if (this.#totalPage < this.#nextPage) {
      this.querySelector("more-button").classList.add("hide");
      return;
    }
    this.querySelector("more-button").classList.remove("hide");
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
        </div>
        `;
  }
}

customElements.define("app-component", AppComponent);
