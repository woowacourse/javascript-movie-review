import { HTMLTemplate } from "../abstract/BaseComponent";
import QueryState, { Query } from "../../states/QueryState";
import { generateMovieItems } from "../templates/movie/generateMovieItems";
import { generateErrorFallbackScreen } from "../templates/error/generateErrorFallbackScreen";
import { getPopularMovieList, getSearchMovieList } from "../../apis/movieList";
import { $ } from "../../utils/dom";
import APIError from "../../error/APIError";
import SkeletonUI from "../SkeletonUI";
import { Movie } from "../../types/movie";
import EventComponent from "../abstract/EventComponent";
import EmptyMovieList from "./EmptyMovieList";

interface MovieListProps {
  targetId: string;
  queryState: QueryState;
  movies?: Movie[];
  skeletonUI: SkeletonUI;
}

export default class MovieList extends EventComponent {
  private queryState: QueryState;
  private page = 1;
  private movies: Movie[] = [];
  private skeletonUI: SkeletonUI;

  constructor({
    targetId,
    queryState,
    movies = [],
    skeletonUI,
  }: MovieListProps) {
    super({ targetId });
    this.queryState = queryState;
    this.movies = movies;
    this.skeletonUI = skeletonUI;
  }

  protected getTemplate(): HTMLTemplate {
    const movieItemsTemplate = generateMovieItems(this.movies);

    return `
        <ul id="item-list" class="item-list">
        ${movieItemsTemplate}
        </ul>
        ${
          this.movies.length === 20
            ? '<button id="watch-more-button" class="btn primary full-width">더 보기</button>'
            : ""
        }
    `;
  }

  protected async onInitialized(): Promise<void> {
    try {
      this.skeletonUI.render(this.targetId);

      this.resetPage();

      const movies = await this.fetchMovies(this.page, this.queryState.get());
      this.movies = movies;

      if (movies.length === 0) {
        const emptyMovieList = new EmptyMovieList({
          targetId: this.targetId,
          onHomeButton: () => this.queryState.reset(),
        });

        emptyMovieList.initialize();
        return;
      }

      this.render();
    } catch (error) {
      if (error instanceof Error) {
        this.handleErrorOnInitialized(error);
      }
    }
  }

  protected handleErrorOnInitialized(error: Error): void {
    if (error instanceof APIError) {
      alert(error.message);
    } else if (error instanceof Error) {
      alert(
        "네트워크가 원활하지 않습니다. 인터넷 연결 확인 후 다시 시도해주세요."
      );
    }

    const errorTargetElement = $(this.targetId);
    if (errorTargetElement instanceof HTMLElement) {
      errorTargetElement.innerHTML = generateErrorFallbackScreen();
    }
  }

  protected setEvent(): void {
    $<HTMLButtonElement>("watch-more-button")?.addEventListener(
      "click",
      this.handleWatchMoreButtonClick.bind(this)
    );
  }

  async handleWatchMoreButtonClick(): Promise<void> {
    this.page += 1;

    this.skeletonUI.insert("item-list", "afterend");

    const additionalMovies = await this.fetchMovies(this.page);

    $<HTMLUListElement>("skeleton-movie-item-list")?.remove();

    this.movies = [...this.movies, ...additionalMovies];
    this.insertMovieItems(additionalMovies);

    if (additionalMovies.length < 20) {
      $<HTMLButtonElement>("watch-more-button")?.remove();
    }
  }

  private insertMovieItems(movies: Movie[]): void {
    const movieItemsTemplate = generateMovieItems(movies);

    $<HTMLUListElement>("item-list")?.insertAdjacentHTML(
      "beforeend",
      movieItemsTemplate
    );
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
}
