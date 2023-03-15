import CustomComponent from "../abstracts/CustomComponent";
import HeaderComponent from "./AppHeaderComponent";
import MovieListComponent from "./MovieListComponent";
import MoreButtonComponent from "./MoreButtonComponent";
import ListTitleComponent from "./ListTitleComponent";
import { REQUEST_URL, API_KEY } from "../constants/key";
import transformMovieItemsType from "../util/MovieList";

export default class AppComponent extends CustomComponent {
  option = "more_popular";
  page = 1;

  handleEvent() {
    document.getElementById("app").addEventListener("click", (e) => {
      // TODO: 로고 클릭 시
      if (e.target.dataset.action === "popular") {
        const $itemList = this.querySelector("movie-list");

        $itemList.initialRender();

        // TODO: 페이지 상수화
        const movieList = fetch(
          `${REQUEST_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${this.page}`,
          { method: "GET" }
        )
          .then(async (res) => {
            if (res.status === 200) {
              const data = await res.json();
              const movieItems = transformMovieItemsType(data.results);
              $itemList.renderPageSuccess(movieItems);
              this.page += 1;
            } else {
              $itemList.renderPageFail();
            }
          })
          .catch((error) => {
            $itemList.renderPageFail();
          });

        this.option = "more_popular";
        this.querySelector("more-button").setAttribute(
          "data-action",
          this.option
        );
      }
      // 검색 버튼 클릭 시
      if (e.target.dataset.action === "search") {
        this.option = "more_search";
        this.querySelector("more-button").setAttribute(
          "data-action",
          this.option
        );
      }
      // 인기 항목 - 더보기
      if (e.target.dataset.action === "more_popular") {
        const $itemList = this.querySelector("movie-list");
        $itemList.appendRender();
        const movieList = fetch(
          `${REQUEST_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${this.page}`,
          { method: "GET" }
        )
          .then(async (res) => {
            if (res.status === 200) {
              const data = await res.json();
              const movieItems = transformMovieItemsType(data.results);
              $itemList.renderPageSuccess(movieItems);
              this.page += 1;
            } else {
              $itemList.renderPageFail();
            }
          })
          .catch((error) => {
            $itemList.renderPageFail();
          });
      }
      // 검색 항목 - 더보기
      if (e.target.dataset.action === "more_search") {
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
                    <more-button data-action="${this.option}"></more-button>
                </section>
            </main>
        </div>
        `;
  }
}
customElements.define("app-component", AppComponent);
