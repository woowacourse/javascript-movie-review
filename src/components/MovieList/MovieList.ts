import APIClientComponent from "../abstract/APIClientComponent";
import SkeletonUI from "../SkeletonUI";
import QueryState from "../../states/QueryState";

import { generateMovieItems } from "../templates/generateMovieItems";
import { generateMovieListSkeleton } from "../templates/generateMovieListSkeleton";
import { generateEmptyMovieListScreen } from "../templates/generateUnexpectedScreen";

import { getPopularMovieList, getSearchMovieList } from "../../apis/movieList";
import { $ } from "../../utils/dom";
import { HTMLTemplate, TargetId, Query } from "../../types/common";
import { FetchedMovieData } from "../../types/movies";

interface MovieListProps {
  targetId: TargetId;
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

  protected getTemplate(data: FetchedMovieData): HTMLTemplate {
    const movieItemsTemplate = generateMovieItems(data);

    return `
        <ul id="item-list" class="item-list">
        ${
          data.results.length === 0
            ? generateEmptyMovieListScreen()
            : movieItemsTemplate
        }
        </ul>
        ${
          this.page >= data.total_pages
            ? ""
            : '<button id="watch-more-button" class="btn primary full-width">더 보기</button>'
        }
    `;
  }

  async fetchRenderData(): Promise<FetchedMovieData> {
    this.resetPage();

    const fetchedMovieData = await this.fetchMovies(
      this.page,
      this.queryState.get()
    );
    return fetchedMovieData;
  }

  protected setEvent(): void {
    $("watch-more-button")?.addEventListener(
      "click",
      this.onWatchMoreButtonClick.bind(this)
    );
  }

  async onWatchMoreButtonClick(): Promise<void> {
    this.page += 1;

    this.skeletonUI.insert("item-list", "afterend");

    const additionalFetchedMovieData = await getPopularMovieList(this.page);

    $("skeleton-movie-item-list")?.remove();

    this.insertMovieItems(additionalFetchedMovieData);
  }

  private async insertMovieItems(data: FetchedMovieData): Promise<void> {
    const movieItemsTemplate = generateMovieItems(data);

    $("item-list")?.insertAdjacentHTML("beforeend", movieItemsTemplate);
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

  getSkeletonTemplate(): HTMLTemplate {
    const movieListSkeleton = generateMovieListSkeleton();

    return movieListSkeleton;
  }
}
