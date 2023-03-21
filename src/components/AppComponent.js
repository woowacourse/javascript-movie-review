import CustomComponent from "../abstracts/CustomComponent";
import HeaderComponent from "./AppHeaderComponent";
import MovieListComponent from "./movie/MovieListComponent";
import MoreButtonComponent from "./element/MoreButtonComponent";
import TitleComponent from "./element/TitleComponent";
import transformMovieItemsType from "../util/MovieList";
import { API_KEY } from "../constants/key";
import { ACTION, REQUEST_URL, TITLE } from "../constants/constants";

export default class AppComponent extends CustomComponent {
  #nextPage = 1;
  #totalPage;
  #$movieList;
  #$movieListTitle;
  #$searchInput;

  async render() {
    super.render();

    this.#$movieList = this.querySelector("movie-list");
    this.#$movieListTitle = this.querySelector("movie-list-title");
    this.#$searchInput = this.querySelector("input");

    this.popularListInit();
    await this.renderListByData(ACTION.POPULAR);
    this.changeMoreButtonAction(ACTION.MORE_POPULAR);

    const lastChild = this.#$movieList
      .querySelector("movie-list-page:last-of-type")
      .querySelector(`movie-item:last-of-type`);

    const io = new IntersectionObserver((entry, observer) => {
      const ioTarget = entry[0].target;

      if (entry[0].isIntersecting) {
        console.log("현재 보이는 타켓", ioTarget);
        io.unobserve(ioTarget);
        this.#$movieList.appendNewPage();
        this.renderListByData(ACTION.POPULAR).then(() => {
          const newLastChild = this.#$movieList
            .querySelector("movie-list-page:last-of-type")
            .querySelector(`movie-item:last-of-type`);
          io.observe(newLastChild);
        });
      }
    });

    io.observe(lastChild);
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
    await this.fetchAPI(actionType)
      .then(async (res) => {
        if (!res.ok) {
          this.#$movieList.renderPageFail();
          return;
        }

        const data = await res.json();
        this.#totalPage = data.total_pages;

        const movieItems = transformMovieItemsType(data.results);
        this.#$movieList.renderPageSuccess(movieItems);

        this.#nextPage += 1;
        this.checkHasNextPage();
      })
      .catch((error) => {
        this.#$movieList.renderPageFail();
      });
  }

  checkHasNextPage() {
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

  async checkEventAction(e) {
    switch (e.target.dataset.action) {
      case "hide_search":
        if (this.querySelector(".header-logo").style.display === "none") {
          this.querySelector(".search-button-wrapper").style.display = "flex";
          this.querySelector(".search-box").style.display = "none";
          this.querySelector(".header-logo").style.display = "block";
          this.querySelector(".hide-all").style.display = "none";
        }
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
        this.changeMoreButtonAction(ACTION.MORE_POPULAR);
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
          this.changeMoreButtonAction(ACTION.MORE_POPULAR);
          return;
        }
        this.searchListInit();
        await this.renderListByData(ACTION.SEARCH);
        this.changeMoreButtonAction(ACTION.MORE_SEARCH);
        break;
      // 인기 영화 목록에서 더보기 눌렀을 때 액션
      case ACTION.MORE_POPULAR:
        this.#$movieList.appendNewPage();
        await this.renderListByData(ACTION.POPULAR);
        break;
      // 검색 결과 목록에서 더보기 눌렀을 때 액션
      case ACTION.MORE_SEARCH:
        this.#$movieList.appendNewPage();
        await this.renderListByData(ACTION.SEARCH);
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
          this.changeMoreButtonAction(ACTION.MORE_POPULAR);
          return;
        }

        this.searchListInit();
        await this.renderListByData(ACTION.SEARCH);
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
