import { MovieData } from '../../api/types.ts';
import { $ } from '../../utils/dom.ts';
import { ErrorComponent } from '../common/ErrorComponent.ts';
import { MovieItem } from './MovieItem.ts';
import { MovieItemSkeleton } from './MovieItemSkeleton.ts';
import { NothingResult } from './NothingResult.ts';

export default class Main {
  #$element: HTMLElement;
  #$list: HTMLElement;
  #$skeletons: HTMLElement[] | undefined;

  constructor(title: string, onDetail: (movie_id: number) => void) {
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

    const $ul = $(this.#$element, 'ul');
    $ul.addEventListener('click', (e) => {
      const $li = (e.target as Element).closest('li');
      const id = $li?.dataset.id;
      onDetail(Number(id));
    });
  }

  get $element() {
    return this.#$element;
  }

  renderMovies(movies: MovieData[]) {
    this.removeSkeletons();
    const $fragment = new DocumentFragment();
    movies.forEach((movie) => $fragment.append(MovieItem(movie)));
    this.#$list.append($fragment);
    return this.#$list.lastElementChild;
  }

  renderSkeletons(length: number = 20) {
    const $newSkeletons = Array.from({ length }, () => MovieItemSkeleton());
    this.#$skeletons = $newSkeletons;
    $newSkeletons.forEach(($skeleton) => this.#$list.append($skeleton));
  }

  removeSkeletons() {
    this.#$skeletons?.forEach(($skeleton) => $skeleton.remove());
  }

  handleError(error: Error) {
    const $element = $<HTMLElement>(this.#$element, 'section');
    $element.innerHTML = '';
    $element.append(ErrorComponent(error));
  }

  renderNothing() {
    const $element = $<HTMLElement>(this.#$element, 'section');
    const $h2 = $<HTMLElement>(this.#$element, 'h2');
    $element.innerHTML = '';
    $element.append($h2, NothingResult());
  }
}
