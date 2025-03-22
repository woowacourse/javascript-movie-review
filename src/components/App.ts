import { MovieResult, MoviesResponse } from "@/types";
import { html } from "../utils";
import Movies from "./Movies";
import Component from "./core/Component";
import Footer from "./Footer";
import Header from "./Header";
import { getMovies } from "@/apis/MovieApi";

interface AppState {
  page: number;
  totalPages: number;
  moviesResponse: MoviesResponse | null;
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
        moviesResponse: this.state.moviesResponse,
        page: this.state.page,
      }).render(),
      "movies"
    );
    this.fillSlot(new Footer().render(), "footer");
  }

  async dataFetchAsync() {
    const moviesResponse = await getMovies({ page: this.state.page });
    this.setState({ moviesResponse });
  }
}
