import MovieCard from './MovieCard';
import stateRender from '../renderer/StateRender';
import { createInfiniteScrollObserver } from '../utils/observer';

class MovieList {
  #$ul = document.createElement('ul');

  constructor() {
    this.#$ul.className = 'item-list';
  }

  #template() {
    const { results, query } = stateRender.getMovieState();

    if (!results.length) {
      return this.#movieListErrorTemplate(`입력하신 "${query}"(와)과 일치하는 결과가 없습니다.`);
    }

    return results.map((movie) => new MovieCard(movie).getCardNode());
  }

  render($target: HTMLElement) {
    const template = this.#template();
    this.removeAlertContainer($target);

    if (template instanceof HTMLDivElement) {
      $target.insertAdjacentElement('beforeend', template);

      return;
    }

    for (const child of template) {
      this.#$ul.insertAdjacentElement('beforeend', child);
    }

    const $lastChild = this.#$ul.lastElementChild;
    if ($lastChild) createInfiniteScrollObserver($lastChild);

    $target.insertAdjacentElement('beforeend', this.#$ul);
  }

  removeAlertContainer($target: HTMLElement) {
    const $alertContainer = $target.querySelector('.alert-container');
    if ($alertContainer) $target.removeChild($alertContainer);
  }

  removeCurentCategory() {
    while (this.#$ul.firstChild) this.#$ul.removeChild(this.#$ul.firstChild);
  }

  #movieListErrorTemplate(message: string) {
    const $container = document.createElement('div');
    $container.className = 'alert-container';
    $container.innerHTML = ` 
      <p class="alert-message alert-title">${message}</p>
          
      <p class="alert-message alert-sub-title">🌕 다른 키워드를 입력해 보세요.</p>
      <p class="alert-message alert-sub-title">🌕 영화를 찾고 계신가요?</p>
      <p class="alert-message alert-sub-title">🌕 영화 제목만을 입력해 주세요</p>
    `;

    return $container;
  }
}

export default MovieList;
