import EventComponent from "./abstract/EventComponent";
import QueryState from "../states/QueryState";
import { Movie, composeMovieItem } from "./templates/composeMovieItem";
import { getPopularMovieList } from "../apis/movieList";

interface MovieListProps {
  targetId: string;
  queryState: QueryState;
}

export default class MovieList extends EventComponent {
  private queryState: QueryState;
  private movies: Movie[] = [];

  constructor({ targetId, queryState }: MovieListProps) {
    super({ targetId });
    this.queryState = queryState;
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

    this.movies = movies;

    this.init();
  }

  private generateMovieItemsTemplate() {
    const movies = this.movies;

    const movieItemsTemplate = movies.reduce((movieListTemplate, movieInfo) => {
      return movieListTemplate + composeMovieItem(movieInfo);
    }, "");

    return movieItemsTemplate;
  }

  setEvent(): void {}
}
