import { HTMLTemplate } from "../abstract/BaseComponent";
import QueryState, { Query } from "../../states/QueryState";
import { generateMovieItems } from "../templates/movie/generateMovieItems";
import { generateErrorFallbackScreen } from "../templates/error/generateErrorFallbackScreen";
import { getPopularMovieList, getSearchMovieList } from "../../apis/movieList";
import { $ } from "../../utils/dom";
import APIError from "../../errors/APIError";
import SkeletonUI from "../SkeletonUI";
import { MovieItem } from "../../types/movie";
import EventComponent from "../abstract/EventComponent";
import EmptyMovieList from "./EmptyMovieList";
import MovieDetailModalState from "../../states/MovieDetailModalState";
import { throttle } from "../../utils/throttle";

interface MovieListProps {
  targetId: string;
  queryState: QueryState;
  movieDetailModalState: MovieDetailModalState;
  movies?: MovieItem[];
  skeletonUI: SkeletonUI;
}

export default class MovieList extends EventComponent {
  private queryState: QueryState;
  private movieDetailModalState: MovieDetailModalState;
  private movies: MovieItem[] = [];
  private skeletonUI: SkeletonUI;
  private page = 1;
  private isLoading = false;
  private isLastPage = false;

  constructor({
    targetId,
    queryState,
    movieDetailModalState,
    movies = [],
    skeletonUI,
  }: MovieListProps) {
    super({ targetId });
    this.queryState = queryState;
    this.movieDetailModalState = movieDetailModalState;
    this.movies = movies;
    this.skeletonUI = skeletonUI;
  }

  protected getTemplate(): HTMLTemplate {
    const movieItemsTemplate = generateMovieItems(this.movies);

    return `
        <ul id="item-list" class="item-list">
        ${movieItemsTemplate}
        </ul>
    `;
  }

  protected async onInitialized(): Promise<void> {
    try {
      this.skeletonUI.render(this.targetId);

      this.resetPage();

      const movies = await this.fetchMovies(this.page, this.queryState.get());
      this.movies = movies;

      if (movies.length === 0) {
        this.renderEmptyMovieList();
        return;
      }

      this.render();
    } catch (error) {
      if (error instanceof Error) {
        this.catchErrorOnInitialized(error);
      }
    }
  }

  protected setEvent(): void {
    $<HTMLUListElement>("item-list")?.addEventListener(
      "click",
      this.handleMovieItemClick.bind(this)
    );

    $<HTMLButtonElement>("watch-more-button")?.addEventListener(
      "click",
      this.loadMoreMovies.bind(this)
    );

    window.addEventListener(
      "scroll",
      throttle(this.handleScroll.bind(this), 500)
    );
  }

  private handleMovieItemClick(event: Event): void {
    const $movieItem = (event.target as HTMLElement).closest<HTMLLIElement>(
      ".movie-item"
    );

    if ($movieItem && $movieItem.classList.contains("movie-item")) {
      const movieId = $movieItem.dataset.movieId;
      if (movieId) {
        this.movieDetailModalState.set({
          isOpen: true,
          movieId: Number(movieId),
        });
      }
    }
  }

  private handleScroll(): void {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

    const SCROLL_HEIGHT_BUFFER = 150;
    if (scrollTop + clientHeight + SCROLL_HEIGHT_BUFFER >= scrollHeight) {
      this.loadMoreMovies();
    }
  }

  private async loadMoreMovies(): Promise<void> {
    if (this.isLoading || this.isLastPage) {
      return;
    }

    this.isLoading = true;
    this.skeletonUI.insert("item-list", "afterend");
    this.page += 1;

    const additionalMovies = await this.fetchMovies(
      this.page,
      this.queryState.get()
    );

    this.isLoading = false;
    this.insertMovieItems(additionalMovies);

    $<HTMLUListElement>("skeleton-movie-item-list")?.remove();

    this.movies = [...this.movies, ...additionalMovies];

    const MOVIE_COUNT_PER_PAGE = 20;
    if (additionalMovies.length < MOVIE_COUNT_PER_PAGE) {
      this.isLastPage = true;
    }
  }

  private resetPage(): void {
    this.page = 1;
  }

  private async fetchMovies(page: number, query?: Query): Promise<MovieItem[]> {
    const movies = query
      ? await getSearchMovieList(query, page)
      : await getPopularMovieList(page);

    return movies;
  }

  private catchErrorOnInitialized(error: Error): void {
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

  private insertMovieItems(movies: MovieItem[]): void {
    const movieItemsTemplate = generateMovieItems(movies);

    $<HTMLUListElement>("item-list")?.insertAdjacentHTML(
      "beforeend",
      movieItemsTemplate
    );
  }

  private renderEmptyMovieList(): void {
    const emptyMovieList = new EmptyMovieList({
      targetId: this.targetId,
      onHomeButton: () => this.queryState.reset(),
    });

    emptyMovieList.initialize();
  }
}
