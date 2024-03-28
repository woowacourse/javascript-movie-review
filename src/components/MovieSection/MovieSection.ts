import Component from "../common/Component";
import MovieListContainer from "../MovieListContainer/MovieListContainer";

import { $ } from "../../utils/dom";

import "./MovieSection.css";

export default class MovieSection extends Component<{}, {}> {
  private searchKeyword: string | undefined;

  protected getTemplate() {
    return /*html*/ `
      <div id="movie-list">
        <h2 id="main-title"></h2>
      </div>
      <div id="empty-result" class="empty-result hidden"></div>
      <div id="scroll-trigger" class="scroll-trigger full-width"></div>
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

    new MovieListContainer($div, { searchKeyword: this.searchKeyword });
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
