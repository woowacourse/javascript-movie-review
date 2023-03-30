import CustomComponent from "../abstracts/CustomComponent";
import HeaderComponent from "./AppHeaderComponent";
import MovieListComponent from "./movie/MovieListComponent";
import MovieModalComponent from "./modal/MovieModalComponent";
import { ACTION, ROUTER } from "../constants/constants";
import { navigate, Router } from "../util/Router";

export default class AppComponent extends CustomComponent {
  #$searchInput;
  #$movieList;

  async render() {
    super.render();

    this.#$movieList = this.querySelector("movie-list");
    this.#$searchInput = this.querySelector("input");
  }

  async searchEventAction() {
    // 검색 값이 없을 때 전체 리스트 보여줌.
    if (!this.#$searchInput.value) {
      navigate("/");
      return;
    }
    navigate(`/${ROUTER.MOVIE_SEARCH}/${this.#$searchInput.value}`);
    this.#$movieList.setSearchKeyword(this.#$searchInput.value);
  }

  async checkClickEvent(e) {
    switch (e.target.dataset.action) {
      // 로고 눌렀을 때 액션
      case ACTION.POPULAR:
        navigate("/");
        break;
      // 검색했을 때 액션
      case ACTION.SEARCH:
        await this.searchEventAction();
        break;
    }
  }

  handleEvent() {
    this.addEventListener("click", async (e) => {
      await this.checkClickEvent(e);
    });

    // 검색시 엔터 눌렀을 때 액션
    this.addEventListener("keypress", async (e) => {
      if (e.key === "Enter") {
        await this.searchEventAction();
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
                    <movie-list></movie-list>
                </section>
            </main>
        </div>
        `;
  }
}

customElements.define("app-component", AppComponent);
