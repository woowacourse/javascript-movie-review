import { MovieData } from '../../api/type.ts';
import { $ } from '../../utils/dom.ts';
import { Error } from './Error.ts';
import { MoreButton } from './MoreButton.ts';
import { MovieItem } from './MovieItem.ts';
import { MovieItemSkeleton } from './MovieItemSkeleton.ts';
import { NothingResult } from './NothingResult.ts';

export default class Main {
  #$element: HTMLElement;
  #$list: HTMLElement;
  #$skeletons: HTMLElement[] = [];
  #$moreButton: HTMLElement | null;

  constructor(title: string) {
    this.#$element = document.createElement('div');
    this.#$element.className = 'container';
    this.#$element.innerHTML = `
      <main>
        <section>
          <h2>${title}</h2>
          <ul class="thumbnail-list"></ul>
        </section>
      </main>
    `;
    this.#$list = $<HTMLElement>(this.#$element, '.thumbnail-list');
    this.#$moreButton = null;
  }

  get $element() {
    return this.#$element;
  }

  renderMovies(movies: MovieData[]) {
    this.removeSkeletons();
    const $fragment = new DocumentFragment();
    movies.forEach((movie) => $fragment.append(MovieItem(movie)));
    this.#$list.append($fragment);
  }

  renderSkeletons(length: number = 20) {
    this.#$skeletons = Array.from({ length }, () => MovieItemSkeleton());
    this.#$skeletons.forEach(($skeleton) => this.#$list.append($skeleton));
  }

  removeSkeletons() {
    this.#$skeletons.forEach(($skeleton) => $skeleton.remove());
    this.#$skeletons = [];
  }

  renderMoreButton(onClick: () => void) {
    this.#$moreButton = MoreButton(onClick);
    $<HTMLElement>(this.#$element, 'section').append(this.#$moreButton);
  }

  removeMoreButton() {
    this.#$moreButton?.remove();
    this.#$moreButton = null;
  }

  renderError() {
    const $element = $<HTMLElement>(this.#$element, 'section');
    $element.innerHTML = '';
    $element.append(Error());
  }

  renderNothing() {
    const $element = $<HTMLElement>(this.#$element, 'section');
    const $h2 = $<HTMLElement>(this.#$element, 'h2');
    $element.innerHTML = '';
    $element.append($h2, NothingResult());
  }
}
