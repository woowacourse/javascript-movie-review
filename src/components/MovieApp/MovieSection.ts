import Component from "../../common/Component";

import MovieListContainer from "./MovieListContainer";

import { $ } from "../../utils/dom";

export default class MovieSection extends Component<{}, {}> {
  private $container: MovieListContainer | undefined;

  private searchKeyword: string | undefined;

  protected getTemplate() {
    return /*html*/ `
      <div id="movie-list">
        <h2 id="main-title"></h2>
      </div>
      <div id="empty-result" class="empty-result hidden"></div>
      <button id="next-button" class="btn primary full-width">더 보기</button>
    `;
  }

  protected initializeState() {
    this.searchKeyword = "";
  }

  protected render() {
    this.$target.innerHTML = this.getTemplate();

    this.renderMainTitle();

    const $div = $<HTMLDivElement>("#movie-list");
    if (!$div) return;

    this.$container = new MovieListContainer($div, { searchKeyword: this.searchKeyword });
  }

  protected setEvent(): void {
    const button = $<HTMLButtonElement>("#next-button");

    button?.addEventListener("click", () => {
      this.$container?.handleRenderMovieList();
    });
  }

  private renderMainTitle() {
    const $title = $<HTMLHeadingElement>("#main-title");
    if (!$title) return;

    $title.innerText = this.searchKeyword ? `"${this.searchKeyword}" 검색 결과` : "지금 인기 있는 영화";
  }

  public rerender(searchKeyword: string = "") {
    this.searchKeyword = searchKeyword;

    this.render();
    this.setEvent();
  }
}
