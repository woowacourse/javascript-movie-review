import Component from "../common/Component";

import Header from "./Header";
import MovieSection from "./MovieApp/MovieSection";

import { $ } from "../utils/dom";

export default class App extends Component<{}, {}> {
  private movieSection: MovieSection | undefined;

  protected getTemplate(): string {
    return /*html*/ `
      <header></header>
      <main>
        <section class="item-view"></section>
      </main>
    `;
  }

  protected render() {
    this.$target.innerHTML = this.getTemplate();

    this.createChild();
  }

  private createChild() {
    const $header = $<HTMLDivElement>("header");
    const $section = $<HTMLDivElement>(".item-view");

    if (!$header || !$section) return;

    this.movieSection = new MovieSection($section);

    new Header($header, {
      onSearchKeywordSubmit: this.movieSection.rerender.bind(this.movieSection),
      onLogoClick: this.movieSection.rerender.bind(this.movieSection),
    });
  }
}
