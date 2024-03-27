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
            <input id="search-input" name="search-query" type="text" placeholder="검색" maxLength="${MOVIE_QUERY_MAX_LENGTH}"/>
            <button class="search-button">검색</button>
          </form>
      </div>
  `;
  }

  protected setEvent(): void {
    const $form = $<HTMLFormElement>("search-form");
    const $movieListLogo = $<HTMLHeadElement>("movie-list-logo");

    $form?.addEventListener("submit", (event) =>
      this.onSearchMovieSubmit(event, $form)
    );

    $movieListLogo?.addEventListener("click", this.onLogoClick.bind(this));
  }

  private onSearchMovieSubmit(event: Event, form: HTMLFormElement): void {
    event.preventDefault();

    const searchQuery = form["search-query"].value;

    if (!searchQuery) {
      alert("검색어를 입력해 주세요.");
      return;
    }

    this.queryState.set(searchQuery);
  }

  private onLogoClick(): void {
    this.queryState.set("");

    $<HTMLFormElement>("search-form")?.reset();
  }
}
