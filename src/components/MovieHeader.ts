import { HTMLTemplate } from "./abstract/BaseComponent";
import EventComponent from "./abstract/EventComponent";
import QueryState from "../states/QueryState";
import { $ } from "../utils/dom";
import IMAGES from "../images";

interface MovieHeaderProps {
  targetId: string;
  queryState: QueryState;
}
export default class MovieHeader extends EventComponent {
  private queryState: QueryState;

  constructor({ targetId, queryState }: MovieHeaderProps) {
    super({ targetId });
    this.queryState = queryState;
  }

  getTemplate(): HTMLTemplate {
    return `
      <h1><img src="${IMAGES.logo}" alt="MovieList 로고" /></h1>
      <div class="search-box">
          <form id="search-form">
            <input name="search-query" type="text" placeholder="검색" />
            <button class="search-button">검색</button>
          </form>
      </div>
  `;
  }

  setEvent(): void {
    const $form = $("search-form") as HTMLFormElement;

    $form?.addEventListener("submit", (event) =>
      this.handleSearchMovie(event, $form)
    );
  }

  async handleSearchMovie(event: Event, form: HTMLFormElement) {
    event.preventDefault();

    const searchQuery = form["search-query"].value;

    this.queryState.set(searchQuery);
  }
}
