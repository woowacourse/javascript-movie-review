import Component from "./common/Component";
import Header from "./Header/Header";
import MovieSection from "./MovieSection/MovieSection";

import { $ } from "../utils/dom";

import "./App.css";
import { Optional } from "../types/utility";

export default class App extends Component<{}, {}> {
  private movieSection: Optional<MovieSection>;

  protected getTemplate(): string {
    return /*html*/ `
      <header class="full-width flex justify-between align-center mb-3"></header>
      <main>
        <section class="flex flex-col justify-center w-fit item-view"></section>
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
