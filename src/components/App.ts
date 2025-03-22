import { MovieResult, MoviesResponse } from "@/types";
import { html, isElement, isHTMLFormElement } from "../utils";
import Movies from "./Movies";
import Component from "./core/Component";
import Footer from "./Footer";
import Header from "./Header";
import { getMovies } from "@/apis/MovieApi";
import { store } from "@/store";
import { renderMoviesList } from "@/domains/renderMoviesList";

interface AppState {
  page: number;
  totalPages: number;
  moviesResponse: MoviesResponse | null;
  movies: MovieResult[];
  searchKeyword: string;
}

export default class App extends Component<null, AppState> {
  constructor() {
    super();
  }

  override setup() {
    this.state = {
      page: 1,
      totalPages: 1,
      moviesResponse: null,
      movies: [],
      searchKeyword: "",
    };
  }

  override template() {
    return html`
      <div id="movie-review-wrap">
        <slot name="header"></slot>
        <slot name="movies"></slot>
        <slot name="footer"></slot>
      </div>
    `;
  }

  onRender() {
    this.fillSlot(new Header().render(), "header");
    this.fillSlot(
      new Movies({
        movies: this.state.movies,
        page: this.state.page,
      }).render(),
      "movies"
    );
    this.fillSlot(new Footer().render(), "footer");
  }

  async dataFetchAsync() {
    const moviesResponse = await getMovies({ page: this.state.page });
    this.setState({
      moviesResponse,
      movies: [...this.state.movies, ...moviesResponse.results],
    });
  }

  addEventListener() {
    window.addEventListener("click", async (event) => {
      const { target } = event;
      if (!isElement(target)) return;

      if (target.closest(".show-more")) {
        const moviesResponse = await getMovies({ page: this.state.page + 1 });
        console.log(moviesResponse);
        this.setState({
          moviesResponse,
          movies: [...this.state.movies, ...moviesResponse.results],
          page: this.state.page + 1,
        });
      }
    });

    //   window.addEventListener("submit", async (event) => {
    //     event.preventDefault();
    //     const { target } = event;

    //     if (!isHTMLFormElement(target)) return;

    //     if (target.closest(".top-rated-search")) {
    //       const formData = new FormData(target);
    //       const modalInput = Object.fromEntries(formData);

    //       const value = modalInput.search.toString();

    //       store.searchKeyword = value;
    //       store.page = 1;

    //       const $title = $(".thumbnail-title");
    //       if ($title) $title.textContent = `"${store.searchKeyword}" 검색 결과`;

    //       const $thumbnailList = $(".thumbnail-list");
    //       if ($thumbnailList) $thumbnailList.innerHTML = "";

    //       $(".top-rated-container")?.classList.add("close");
    //       $(".overlay")?.classList.add("close");

    //       store.movies = [];

    //       await renderMoviesList();
    //     }
    //   });
  }
}
