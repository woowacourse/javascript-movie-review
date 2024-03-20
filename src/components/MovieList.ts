import EventComponent from "./abstract/EventComponent";
import QueryState from "../states/QueryState";
import { Movie, composeMovieItems } from "./templates/composeMovieItems";
import { getPopularMovieList } from "../apis/movieList";
import { $ } from "../utils/dom";

interface MovieListProps {
  targetId: string;
  queryState: QueryState;
}

export default class MovieList extends EventComponent {
  private queryState: QueryState;
  private movies: Movie[] = [];
  private page = 1;

  constructor({ targetId, queryState }: MovieListProps) {
    super({ targetId });
    this.queryState = queryState;
  }

  getTemplate(): string {
    const movieItemsTemplate = this.generateMovieItemsTemplate();

    return `
        <h2>지금 인기 있는 영화</h2>
        <ul id="item-list" class="item-list">
        ${movieItemsTemplate}
        </ul>
        <button id="watch-more-button" class="btn primary full-width">더 보기</button>
    `;
  }

  async fetchInitialMovies() {
    const movies = await getPopularMovieList();

    this.movies = movies;

    this.init();
  }

  private generateMovieItemsTemplate() {
    const movies = this.movies;

    const movieItemsTemplate = composeMovieItems(movies);

    return movieItemsTemplate;
  }

  async handleWatchMoreButtonClick() {
    this.page += 1;

    const additionalMovies = await getPopularMovieList(this.page);

    this.insertMovieItems(additionalMovies);

    if (additionalMovies.length < 20) {
      $("watch-more-button")?.remove();
    }
  }

  private async insertMovieItems(movies: Movie[]) {
    const movieItemsTemplate = composeMovieItems(movies);

    $("item-list")?.insertAdjacentHTML("beforeend", movieItemsTemplate);
  }

  setEvent(): void {
    $("watch-more-button")?.addEventListener(
      "click",
      this.handleWatchMoreButtonClick.bind(this)
    );
  }
}
