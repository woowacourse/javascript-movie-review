import EventComponent from "./abstract/EventComponent";
import QueryState from "../states/QueryState";
import { composeMovieItem } from "./templates/composeMovieItem";
import MoviesState from "../states/MoviesState";
import { getPopularMovieList } from "../apis/movieList";

interface MovieListProps {
  targetId: string;
  queryState: QueryState;
  moviesState: MoviesState;
}

export default class MovieList extends EventComponent {
  private queryState: QueryState;
  private moviesState: MoviesState;

  constructor({ targetId, queryState, moviesState }: MovieListProps) {
    super({ targetId });
    this.queryState = queryState;
    this.moviesState = moviesState;
  }

  getTemplate(): string {
    const movieItemsTemplate = this.generateMovieItemsTemplate();

    return `
        <h2>지금 인기 있는 영화</h2>
        <ul class="item-list">
        ${movieItemsTemplate}
        </ul>
        <button class="btn primary full-width">더 보기</button>
    `;
  }

  async fetchInitialMovies() {
    const movies = await getPopularMovieList();

    this.moviesState.set(movies);
  }

  private generateMovieItemsTemplate() {
    const movies = this.moviesState.get();

    const movieItemsTemplate = movies.reduce((movieListTemplate, movieInfo) => {
      return movieListTemplate + composeMovieItem(movieInfo);
    }, "");

    return movieItemsTemplate;
  }

  setEvent(): void {}
}
