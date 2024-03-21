import APIClientComponent from "../abstract/APIClientComponent";
import { HTMLTemplate } from "../abstract/BaseComponent";
import SkeletonUI from "../SkeletonUI";
import QueryState, { Query } from "../../states/QueryState";
import { Movie, generateMovieItems } from "../templates/generateMovieItems";
import { generateMovieListSkeleton } from "../templates/generateMovieListSkeleton";
import { getPopularMovieList, getSearchMovieList } from "../../apis/movieList";
import { $ } from "../../utils/dom";
import IMAGES from "../../images";

interface MovieListProps {
  targetId: string;
  queryState: QueryState;
  skeletonUI: SkeletonUI;
}

export default class MovieList extends APIClientComponent {
  private queryState: QueryState;
  private page = 1;

  constructor({ targetId, queryState, skeletonUI }: MovieListProps) {
    super({ targetId, skeletonUI });
    this.queryState = queryState;
  }

  protected getTemplate(data: Movie[]): HTMLTemplate {
    const movieItemsTemplate = generateMovieItems(data);

    return `
        <ul id="item-list" class="item-list">
        ${
          data.length === 0
            ? `<div>
            <img src="${IMAGES.emptyMovieList}" />
            <p>표시할 영화 정보가 없습니다.</p>
            </div>
              `
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

  async fetchRenderData(): Promise<Movie[]> {
    this.resetPage();

    const movies = await this.fetchMovies(this.page, this.queryState.get());

    return movies;
  }

  protected setEvent(): void {
    $("watch-more-button")?.addEventListener(
      "click",
      this.handleWatchMoreButtonClick.bind(this)
    );
  }

  async handleWatchMoreButtonClick(): Promise<void> {
    this.page += 1;

    this.skeletonUI.insert("item-list", "afterend");

    const additionalMovies = await getPopularMovieList(this.page);

    $("skeleton-movie-item-list")?.remove();

    this.insertMovieItems(additionalMovies);

    if (additionalMovies.length < 20) {
      $("watch-more-button")?.remove();
    }
  }

  private async insertMovieItems(movies: Movie[]): Promise<void> {
    const movieItemsTemplate = generateMovieItems(movies);

    $("item-list")?.insertAdjacentHTML("beforeend", movieItemsTemplate);
  }

  private async fetchMovies(page: number, query?: Query): Promise<Movie[]> {
    const movies = query
      ? await getSearchMovieList(query, page)
      : await getPopularMovieList(page);

    return movies;
  }

  private resetPage(): void {
    this.page = 1;
  }

  getSkeletonTemplate(): HTMLTemplate {
    const movieListSkeleton = generateMovieListSkeleton();

    return movieListSkeleton;
  }
}
