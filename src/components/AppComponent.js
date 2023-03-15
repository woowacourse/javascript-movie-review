import CustomComponent from "../abstracts/CustomComponent";
import HeaderComponent from "./AppHeaderComponent";
import MovieListComponent from "./movie/MovieListComponent";
import MoreButtonComponent from "./element/MoreButtonComponent";
import ListTitleComponent from "./element/ListTitleComponent";
import { REQUEST_URL, API_KEY } from "../constants/key";
import transformMovieItemsType from "../util/MovieList";

export default class AppComponent extends CustomComponent {
  option = "more_popular";
  nextPage = 1;
  totalPage;
  $itemList;
  $listTitle;

  getData(url) {
    fetch(url, { method: "GET" })
      .then(async (res) => {
        if (res.status === 200) {
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

  setInitial() {
    this.page = 1;
    this.$itemList = this.querySelector("movie-list");
    this.$listTitle = this.querySelector("list-title");

    this.$listTitle.setTitle("지금 인기있는 영화");
    this.$itemList.initialRender();

    this.getData(
      `${REQUEST_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${this.nextPage}`
    );

    this.option = "more_popular";
    this.querySelector("more-button").setAttribute("data-action", this.option);
  }

  checkPage() {
    if (this.totalPage < this.nextPage) {
      this.querySelector("more-button").classList.add("hide");
      return;
    }
    this.querySelector("more-button").classList.remove("hide");
  }

  handleEvent() {
    // TODO: 밖으로 빼기
    this.setInitial();

    document.getElementById("app").addEventListener("click", (e) => {
      // 로고 클릭
      if (e.target.dataset.action === "popular") {
        this.nextPage = 1;

        this.$listTitle.setTitle("지금 인기있는 영화");
        this.$itemList.initialRender();

        this.getData(
          `${REQUEST_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${this.nextPage}`
        );

        this.option = "more_popular";
        this.querySelector("more-button").setAttribute(
          "data-action",
          this.option
        );
      }
      // 검색 버튼 클릭 시
      if (e.target.dataset.action === "search") {
        this.nextPage = 1;
        const searchValue = document.querySelector("input").value;

        this.$listTitle.setTitle(`"${searchValue}" 검색결과`);
        this.$itemList.initialRender();

        this.getData(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko-KR&query=${searchValue}&page=${this.nextPage}&include_adult=false`
        );
        this.option = "more_search";
        this.querySelector("more-button").setAttribute(
          "data-action",
          this.option
        );
      }
      // 인기 항목 - 더보기
      if (e.target.dataset.action === "more_popular") {
        this.$itemList.appendRender();
        this.getData(
          `${REQUEST_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${this.nextPage}`
        );
      }
      // 검색 항목 - 더보기
      if (e.target.dataset.action === "more_search") {
        const searchValue = document.querySelector("input").value;

        this.$itemList.appendRender();
        this.getData(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko-KR&query=${searchValue}&page=${this.nextPage}&include_adult=false`
        );
      }
    });

    // 엔터 키 이벤트
    document.getElementById("app").addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const searchValue = document.querySelector("input").value;
        if (!searchValue) {
          alert("검색어를 입력해주세요.");
          return;
        }
        this.nextPage = 1;

        this.$listTitle.setTitle(`"${searchValue}" 검색결과`);
        this.$itemList.initialRender();

        this.getData(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko-KR&query=${searchValue}&page=${this.nextPage}&include_adult=false`
        );
        this.option = "more_search";
        this.querySelector("more-button").setAttribute(
          "data-action",
          this.option
        );
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
