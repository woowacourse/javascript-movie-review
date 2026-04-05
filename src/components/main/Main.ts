import { MovieData } from '../../api/type.ts';
import { $ } from '../../utils/dom.ts';
import { MoreButton } from './MoreButton.ts';
import { MovieItem } from './MovieItem.ts';
import { MovieItemSkeleton } from './MovieItemSkeleton.ts';

export default class Main {
  #$element: HTMLElement;
  #$list: HTMLElement;
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

    this.#$moreButton = MoreButton({ page: 1, totalPages: 2 });
  }

  get $element() {
    return this.#$element;
  }

  renderMovies(movies: MovieData[]) {
    const $fragment = new DocumentFragment();
    movies.forEach((movie) => $fragment.append(MovieItem(movie)));
    this.#$list.append($fragment);
  }

  renderSkeletons() {
    const $skeletons = Array.from({ length: 20 }, () => MovieItemSkeleton());
    $skeletons.forEach(($s) => this.#$list.append($s));
    return $skeletons;
  }

  renderMoreButton(onClick: () => void) {
    this.#$moreButton = MoreButton({ page: 1, totalPages: 2 });
    $<HTMLElement>(this.#$element, 'section').append(this.#$moreButton);
  }

  removeMoreButton() {
    this.#$moreButton?.remove();
    this.#$moreButton = null;
  }
}
