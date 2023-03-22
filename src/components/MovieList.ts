import MovieCard from './MovieCard';
import { Store } from '../Store';
import WholeScreenMessageAlert from './WholeScreenMessageAlert';

class MovieList {
  #$ul = document.createElement('ul');

  constructor() {
    this.#$ul.className = 'item-list';
  }

  #template() {
    const movies = Store.get('movieStates')?.getMovieStates();
    if (!movies) return WholeScreenMessageAlert('알 수 없는 에러');

    if (!movies.results.length) {
      return this.#movieListErrorTemplate(
        `입력하신 "${movies?.query}"(와)과 일치하는 결과가 없습니다.`
      );
    }

    return movies.results.map((movie) => new MovieCard(movie).getCardNode());
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
