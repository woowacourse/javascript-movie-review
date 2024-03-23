import { ElementId, HTMLTemplate } from "./abstract/BaseComponent";
import EventComponent from "./abstract/EventComponent";
import QueryState from "../states/QueryState";
import { $ } from "../utils/dom";
import IMAGES from "../images";

const MOVIE_QUERY_MAX_LENGTH = 500;

interface MovieHeaderProps {
  targetId: ElementId;
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
            <input name="search-query" type="text" placeholder="검색" maxLength="${MOVIE_QUERY_MAX_LENGTH}"/>
            <button class="search-button">검색</button>
          </form>
      </div>
  `;
  }

  protected setEvent(): void {
    const $form = $<HTMLFormElement>("search-form");

    $form?.addEventListener("submit", (event) =>
      this.handleSearchMovie(event, $form)
    );

    $<HTMLHeadElement>("movie-list-logo")?.addEventListener(
      "click",
      this.handleLogoClick.bind(this)
    );
  }

  private async handleSearchMovie(
    event: Event,
    form: HTMLFormElement
  ): Promise<void> {
    event.preventDefault();

    const searchQuery = form["search-query"].value;

    this.queryState.set(searchQuery);
  }

  private handleLogoClick(): void {
    this.queryState.set("");

    const $searchForm = $<HTMLFormElement>("search-form");

    $searchForm?.reset();
  }
}
