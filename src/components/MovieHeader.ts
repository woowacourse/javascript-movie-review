import EventComponent from "./abstract/EventComponent";
import QueryState from "../states/QueryState";

import { $ } from "../utils/dom";
import { throttle } from "../utils/throttle";

import { HTMLTemplate, TargetId } from "../types/common";
import IMAGES from "../images";

const MOVIE_QUERY_MAX_LENGTH = 500;
const MOBILE_SIZE = 479;

interface MovieHeaderProps {
  targetId: TargetId;
  queryState: QueryState;
}

export default class MovieHeader extends EventComponent {
  private queryState: QueryState;

  constructor({ targetId, queryState }: MovieHeaderProps) {
    super({ targetId });
    this.queryState = queryState;
  }

  protected getTemplate(): HTMLTemplate {
    return `
      <h1 id="movie-list-logo"><img src="${IMAGES.logo}" alt="MovieList 로고" /></h1>
      <div class="search-box">
          <form id="search-form">
            <input id="search-input" class="search-input" name="search-query" type="text" placeholder="검색" maxLength="${MOVIE_QUERY_MAX_LENGTH}"/>
            <button id="search-button" class="search-button">검색</button>
          </form>
      </div>
  `;
  }

  protected setEvent(): void {
    const $movieListLogo = $<HTMLHeadElement>("movie-list-logo");
    const $form = $<HTMLFormElement>("search-form");
    const $searchButton = $<HTMLButtonElement>("search-button");

    $movieListLogo?.addEventListener("click", this.handleLogoClick.bind(this));
    $form?.addEventListener("submit", this.onSearchMovieSubmit.bind(this));
    $searchButton?.addEventListener(
      "click",
      this.onSearchButtonClick.bind(this)
    );
    window.addEventListener("resize", throttle(this.onResize.bind(this), 300));
  }

  private handleLogoClick(): void {
    this.queryState.set("");
    $<HTMLFormElement>("search-form")?.reset();
  }

  private onSearchMovieSubmit(event: Event): void {
    event.preventDefault();
    const $form = $<HTMLFormElement>("search-form");

    const searchQuery = $form?.["search-query"].value;

    if (!searchQuery) {
      alert("검색어를 입력해 주세요.");
      return;
    }

    this.queryState.set(searchQuery);
  }

  private onSearchButtonClick(event: Event): void {
    event.preventDefault();

    const $searchInput = $<HTMLInputElement>("search-input");

    if ($searchInput?.classList.contains("hidden")) {
      $searchInput?.classList.remove("hidden");
    } else {
      this.onSearchMovieSubmit(event);
    }
  }

  private onResize(): void {
    const $searchInput = $<HTMLInputElement>("search-input");

    if (window.innerWidth <= MOBILE_SIZE) {
      $searchInput?.classList.add("hidden");
    } else {
      $searchInput?.classList.remove("hidden");
    }
  }
}
