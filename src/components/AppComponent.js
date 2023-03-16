import CustomComponent from "../abstracts/CustomComponent";
import HeaderComponent from "./AppHeaderComponent";
import MovieListComponent from "./movie/MovieListComponent";
import MoreButtonComponent from "./element/MoreButtonComponent";
import ListTitleComponent from "./element/ListTitleComponent";
import { API_KEY } from "../constants/key";
import transformMovieItemsType from "../util/MovieList";
import {
  ACTION_OPTION,
  REQUEST_URL,
  SEARCH_WARNING,
  TITLE,
} from "../abstracts/constants";

export default class AppComponent extends CustomComponent {
  option = ACTION_OPTION.MORE_POPULAR;
  nextPage = 1;
  totalPage;
  $itemList;
  $listTitle;

  getData(url) {
    fetch(url, { method: "GET" })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          this.totalPage = data.total_pages;

          const movieItems = transformMovieItemsType(data.results);

          this.$itemList.renderPageSuccess(movieItems);
          this.nextPage += 1;
          this.checkPage();
        } else {
          this.$itemList.renderPageFail();
        }
      })
      .catch((error) => {
        this.$itemList.renderPageFail();
      });
  }

  render() {
    super.render();

    this.$itemList = this.querySelector("movie-list");
    this.$listTitle = this.querySelector("list-title");

    this.getPopularData();
  }

  checkPage() {
    if (this.totalPage < this.nextPage) {
      this.querySelector("more-button").classList.add("hide");
      return;
    }
    this.querySelector("more-button").classList.remove("hide");
  }

  getPopularData() {
    this.nextPage = 1;

    this.$listTitle.setTitle(TITLE.POPULAR);
    this.$itemList.initialRender();

    this.getData(
      `${REQUEST_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${this.nextPage}`
    );

    this.option = ACTION_OPTION.MORE_POPULAR;
    this.querySelector("more-button").setAttribute("data-action", this.option);
  }

  getSearchData() {
    this.nextPage = 1;
    const searchValue = document.querySelector("input").value;

    this.$listTitle.setTitle(`"${searchValue}" ${TITLE.SEARCH}`);
    this.$itemList.initialRender();

    this.getData(
      `${REQUEST_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${searchValue}&page=${this.nextPage}&include_adult=false`
    );
    this.option = ACTION_OPTION.MORE_SEARCH;
    this.querySelector("more-button").setAttribute("data-action", this.option);
  }

  handleEvent() {
    document.getElementById("app").addEventListener("click", (e) => {
      switch (e.target.dataset.action) {
        case ACTION_OPTION.POPULAR:
          this.getPopularData();
          break;
        case ACTION_OPTION.SEARCH:
          this.getSearchData();
          break;
        case ACTION_OPTION.MORE_POPULAR:
          this.$itemList.appendRender();
          this.getData(
            `${REQUEST_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${this.nextPage}`
          );
          break;
        case ACTION_OPTION.MORE_SEARCH:
          const searchValue = document.querySelector("input").value;

          this.$itemList.appendRender();
          this.getData(
            `${REQUEST_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${searchValue}&page=${this.nextPage}&include_adult=false`
          );
          break;
      }
    });

    document.getElementById("app").addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();

        const searchValue = document.querySelector("input").value;
        if (!searchValue) {
          alert(SEARCH_WARNING);
          return;
        }

        this.getSearchData();
      }
    });
  }
  template() {
    return `
        <div id="app">
            <app-header></app-header>
            <main>
                <section class="item-view">
                    <list-title></list-title>
                    <movie-list></movie-list>
                    <more-button></more-button>
                </section>
            </main>
        </div>
        `;
  }
}
customElements.define("app-component", AppComponent);
