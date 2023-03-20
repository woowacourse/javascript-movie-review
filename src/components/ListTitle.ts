import { Store } from '../Store';
class ListTitle {
  $h2 = document.createElement('h2');

  constructor() {
    this.$h2.className = 'movie-list-title';
  }

  render($target: HTMLElement) {
    const movieState = Store.get('movieStates')?.getMovieStates();

    this.$h2.innerHTML =
      movieState?.category === 'popular'
        ? '지금 인기있는 영화'
        : `"${movieState?.query}" 검색 결과`;

    $target.insertAdjacentElement('beforeend', this.$h2);
  }
}

export default ListTitle;
