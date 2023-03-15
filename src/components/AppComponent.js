import CustomComponent from "../abstracts/CustomComponent";
import HeaderComponent from "./AppHeaderComponent";
import MovieListComponent from "./MovieListComponent";
import MoreButtonComponent from "./MoreButtonComponent";
import ListTitleComponent from "./ListTitleComponent";
import MovieListPageComponent from "./MovieListPageComponent";
import { REQUEST_URL, API_KEY } from "../constants/key";
import transformMovieItemsType from "../util/MovieList";

export default class AppComponent extends CustomComponent {
  option = "more_popular";

  handleEvent() {
    document.getElementById("app").addEventListener("click", (e) => {
      // TODO: 로고 클릭 시
      if (e.target.dataset.action === "popular") {
        const page = document.createElement("movie-list-page");
        this.querySelector(".item-list").innerHTML = ``;
        this.querySelector(".item-list").append(page);
        // TODO: 로딩 상태 변경 (대기중)
        this.popularListStatus = "loading";
        page.setAttribute("data-status", this.popularListStatus);
        // TODO: 데이터 요청
        const movieList = fetch(
          `${REQUEST_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`,
          { method: "GET" }
        )
          .then(async (res) => {
            if (res.status === 200) {
              const data = await res.json();
              // TODO: 데이터 성공 시,
              // TODO: 로딩 상태 변경 (성공)
              const movieItems = transformMovieItemsType(data.results);

              this.popularListStatus = "success";
              page.setAttribute("data-movie-list", JSON.stringify(movieItems));
              page.setAttribute("data-status", this.popularListStatus);
            } else {
              this.popularListStatus = "fail";
              page.setAttribute("data-status", this.popularListStatus);
            }
          })
          .catch((error) => {
            // TODO: 로딩 상태 변경 (성공)
            this.popularListStatus = "fail";
            this.querySelector("movie-list").setAttribute(
              "data-status",
              this.popularListStatus
            );
            //TODO: 실패 시, 상태 변경
            console.log(error);
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
        console.log("popular");
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
