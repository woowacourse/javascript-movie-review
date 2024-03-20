import QueryState, { Query } from "../states/QueryState";
import { Movie, composeMovieItems } from "./templates/composeMovieItems";
import { getPopularMovieList, getSearchMovieList } from "../apis/movieList";
import { $ } from "../utils/dom";
import APIClientComponent from "./abstract/APIClientComponent";

interface MovieListProps {
  targetId: string;
  queryState: QueryState;
}

export default class MovieList extends APIClientComponent {
  private queryState: QueryState;
  private page = 1;

  constructor({ targetId, queryState }: MovieListProps) {
    super({ targetId });
    this.queryState = queryState;
  }

  getTemplate(data: Movie[]): string {
    const query = this.queryState.get();
    const movieItemsTemplate = this.generateMovieItemsTemplate(data);

    return `
      <h2>${query ? `"${query}" 검색결과` : "지금 인기 있는 영화"}</h2>
        <ul id="item-list" class="item-list">
        ${
          data.length === 0
            ? `<p>표시할 영화 정보가 없습니다. 🎬 </p>`
            : movieItemsTemplate
        }
        </ul>
        ${
          data.length < 20
            ? ""
            : '<button id="watch-more-button" class="btn primary full-width">더 보기</button>'
        }
    `;
  }

  async fetchInitialData() {
    this.resetPage();
    return await this.fetchMovies(this.page, this.queryState.get());
  }

  setEvent(): void {
    $("watch-more-button")?.addEventListener(
      "click",
      this.handleWatchMoreButtonClick.bind(this)
    );
  }

  async handleWatchMoreButtonClick() {
    this.page += 1;

    const additionalMovies = await getPopularMovieList(this.page);

    this.insertMovieItems(additionalMovies);

    if (additionalMovies.length < 20) {
      $("watch-more-button")?.remove();
    }
  }

  private generateMovieItemsTemplate(movies: Movie[]) {
    const movieItemsTemplate = composeMovieItems(movies);

    return movieItemsTemplate;
  }

  private async insertMovieItems(movies: Movie[]) {
    const movieItemsTemplate = composeMovieItems(movies);

    $("item-list")?.insertAdjacentHTML("beforeend", movieItemsTemplate);
  }

  private async fetchMovies(page: number, query?: Query) {
    const movies = query
      ? await getSearchMovieList(query, page)
      : await getPopularMovieList(page);

    return movies;
  }

  private resetPage() {
    this.page = 1;
  }
}
