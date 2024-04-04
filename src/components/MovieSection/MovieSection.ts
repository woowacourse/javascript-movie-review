import Component from "../common/Component";
import MovieListContainer from "../MovieListContainer/MovieListContainer";

import { $ } from "../../utils/dom";
import { Optional } from "../../types/utility";

import "./MovieSection.css";

export default class MovieSection extends Component {
  private searchKeyword: Optional<string>;

  protected getTemplate() {
    return /*html*/ `
      <div id="movie-list">
        <h2 id="main-title" class="font-bold select-none main-title"></h2>
      </div>
      <ul id="empty-result" class="flex flex-col text-center text-base hidden empty-result"></ul>
      <div id="scroll-trigger" class="h-5 full-width"></div>
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
