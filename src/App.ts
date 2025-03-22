import { getMovieByName, getMovies } from "@/apis/MovieApi";
import { MovieResult, MoviesResponse } from "@/lib/types";
import { html, isElement, isHTMLFormElement } from "./lib/utils";
import { Component } from "./components/core";
import { Footer, Header, Movies } from "./components";

interface AppState {
  page: number;
  totalPages: number;
  moviesResponse: MoviesResponse | null;
  movies: MovieResult[];
  search: string;
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
      search: "",
    };
  }

  override template() {
    console.log(this.state.movies);
    return html`
      <div id="movie-review-wrap">
        <slot name="header"></slot>
        <slot name="movies"></slot>
        <slot name="footer"></slot>
      </div>
    `;
  }

  onRender() {
    this.fillSlot(
      new Header({
        search: this.state.search,
        backgroundImage: this.state.movies.at(0)?.backdrop_path,
      }).render(),
      "header"
    );
    this.fillSlot(
      new Movies({
        movies: this.state.movies,
        page: this.state.page,
        search: this.state.search,
      }).render(),
      "movies"
    );
    this.fillSlot(new Footer().render(), "footer");
  }

  async dataFetchAsync() {
    let moviesResponse;

    if (this.state.search)
      moviesResponse = await getMovieByName({
        name: this.state.search,
        page: this.state.page,
      });
    else moviesResponse = await getMovies({ page: this.state.page });

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
        this.setState({
          moviesResponse,
          movies: [...this.state.movies, ...moviesResponse.results],
          page: this.state.page + 1,
        });
      }
    });

    window.addEventListener("submit", async (event) => {
      event.preventDefault();
      const { target } = event;

      if (!isHTMLFormElement(target)) return;

      if (target.closest(".top-rated-search")) {
        const formData = new FormData(target);
        const modalInput = Object.fromEntries(formData);

        const value = modalInput.search.toString();

        this.setState({ search: value, page: 1, movies: [] });

        this.dataFetchAsync();
      }
    });
  }
}
