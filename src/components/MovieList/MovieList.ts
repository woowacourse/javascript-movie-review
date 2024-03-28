import EventComponent from "../abstract/EventComponent";
import SkeletonUI from "../SkeletonUI";
import QueryState from "../../states/QueryState";
import APIError from "../../error/APIError";

import { generateMovieItems } from "../templates/generateMovieItems";
import {
  generateEmptyMovieListScreen,
  generateNetworkNotWorkingScreen,
} from "../templates/generateUnexpectedScreen";

import { getPopularMovieList, getSearchMovieList } from "../../apis/movieList";
import { $ } from "../../utils/dom";
import { throttle } from "../../utils/throttle";
import { HTMLTemplate, TargetId, Query } from "../../types/common";
import { FetchedMovieData } from "../../types/movies";

interface MovieListProps {
  targetId: TargetId;
  queryState: QueryState;
  skeletonUI: SkeletonUI;
}

export default class MovieList extends EventComponent {
  private page = 1;
  private queryState: QueryState;
  private skeletonUI: SkeletonUI;
  private movieList: FetchedMovieData;

  constructor({ targetId, queryState, skeletonUI }: MovieListProps) {
    super({ targetId });
    this.queryState = queryState;
    this.skeletonUI = skeletonUI;
    this.movieList = {} as FetchedMovieData;
  }

  override async init(): Promise<void> {
    this.skeletonUI.render(this.targetId);
    this.resetPage();

    try {
      const movieList = await this.fetchMovies(
        this.page,
        this.queryState.get()
      );

      this.movieList = movieList;

      this.render();
      this.setEvent();
    } catch (error) {
      this.handleError(error);
    }
  }

  protected getTemplate(): HTMLTemplate {
    const movieItemsTemplate = generateMovieItems(this.movieList);
    return `
        <ul id="item-list" class="item-list">
        ${
          this.movieList.results.length === 0
            ? generateEmptyMovieListScreen()
            : movieItemsTemplate
        }
        </ul>
    `;
  }

  protected setEvent(): void {
    window.addEventListener("scroll", throttle(this.onScroll.bind(this), 500));
  }

  private onScroll() {
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight
    ) {
      this.loadMoreMovies();
    }
  }

  private handleError(error: unknown): void {
    if (error instanceof APIError) {
      this.displayErrorMessage(error.message, generateEmptyMovieListScreen);
    } else if (error instanceof Error) {
      this.displayErrorMessage(
        "네트워크가 원활하지 않습니다. 인터넷 연결 확인 후 다시 시도해주세요.",
        generateNetworkNotWorkingScreen
      );
    }
  }

  private displayErrorMessage(
    message: string,
    screenGenerator: () => HTMLTemplate
  ): void {
    alert(message);
    const errorTargetElement = $<HTMLElement>(this.targetId);
    if (errorTargetElement) {
      errorTargetElement.innerHTML = screenGenerator();
    }
  }

  private async fetchMovies(
    page: number,
    query?: Query
  ): Promise<FetchedMovieData> {
    const fetchedMovieData = query
      ? await getSearchMovieList(query, page)
      : await getPopularMovieList(page);

    return fetchedMovieData;
  }

  private resetPage(): void {
    this.page = 1;
  }

  private async loadMoreMovies() {
    this.page += 1;

    this.skeletonUI.insert("item-list", "afterend");

    const additionalFetchedMovieData = await getPopularMovieList(this.page);

    this.skeletonUI.remove("skeleton-movie-item-list");

    this.insertMovieItems(additionalFetchedMovieData);
  }

  private async insertMovieItems(data: FetchedMovieData): Promise<void> {
    const movieItemsTemplate = generateMovieItems(data);

    $("item-list")?.insertAdjacentHTML("beforeend", movieItemsTemplate);
  }
}
