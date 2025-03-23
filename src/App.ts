import { MovieResult, MoviesResponse } from "@/lib/types";
import { MovieApiClient } from "./apis";
import { Footer, Header, Movies } from "./components";
import { Component } from "./components/core";
import { html, isElement, isHTMLFormElement } from "./lib/utils";

export interface AppState {
  page: number;
  totalPages: number;
  moviesResponse: MoviesResponse | null;
  movies: MovieResult[] | null;
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
      movies: null,
      search: "",
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
    this.fillSlot(
      new Header({
        search: this.state.search,
        backgroundImage: this.state.movies?.at(0)?.backdrop_path,
      }).element,
      "header"
    );
    this.fillSlot(
      new Movies({
        movies: this.state.movies,
        totalPages: this.state.moviesResponse?.total_pages ?? 1,
        page: this.state.page,
        search: this.state.search,
      }).element,
      "movies"
    );
    this.fillSlot(new Footer().element, "footer");
  }

  async dataFetchAsync() {
    let moviesResponse;

    if (this.state.search)
      moviesResponse = await MovieApiClient.get({
        query: this.state.search,
        page: this.state.page,
      });
    else
      moviesResponse = await MovieApiClient.getAll({ page: this.state.page });

    if (this.state.movies)
      this.setState({
        moviesResponse,
        movies: [...this.state.movies, ...moviesResponse.results],
      });
    else
      this.setState({
        moviesResponse,
        movies: moviesResponse.results,
      });
  }

  addEventListener() {
    window.addEventListener("click", async (event) => {
      const { target } = event;
      if (!isElement(target)) return;

      if (target.closest(".show-more")) {
        let moviesResponse;

        if (this.state.search)
          moviesResponse = await MovieApiClient.get({
            query: this.state.search,
            page: this.state.page + 1,
          });
        else
          moviesResponse = await MovieApiClient.getAll({
            page: this.state.page + 1,
          });

        if (this.state.movies)
          this.setState({
            moviesResponse,
            movies: [...this.state.movies, ...moviesResponse.results],
            page: this.state.page + 1,
          });
        else
          this.setState({
            moviesResponse,
            movies: moviesResponse.results,
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
