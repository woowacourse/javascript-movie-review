import EventComponent from "./abstract/EventComponent";
import QueryState from "../states/QueryState";

import { $ } from "../utils/dom";

import { HTMLTemplate, TargetId } from "../types/common";
import IMAGES from "../images";

const MOVIE_QUERY_MAX_LENGTH = 500;

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

    $movieListLogo?.addEventListener("click", this.onLogoClick);
    $form?.addEventListener("submit", this.onSearchMovieSubmit);
  }

  private onLogoClick = (): void => {
    this.queryState.set("");
    $<HTMLFormElement>("search-form")?.reset();
  };

  private onSearchMovieSubmit = (event: Event): void => {
    const $searchInput = $<HTMLInputElement>("search-input");

    event.preventDefault();

    if (
      $searchInput &&
      ($searchInput.style.display === "none" ||
        window.getComputedStyle($searchInput).display === "none")
    ) {
      this.showInputField($searchInput);
      return;
    }

    const searchQuery = $searchInput?.value;

    if (!searchQuery) {
      alert("검색어를 입력해 주세요.");
      return;
    }

    this.queryState.set(searchQuery);
  };

  private showInputField($inputElement: HTMLInputElement): void {
    $inputElement.style.display = "inline";
    $inputElement.focus();
  }
}
