import movies from '../domain/Movies';
import { $ } from '../utils/domHelper';

export default class SeeMore {
  $target;

  constructor($target: HTMLElement) {
    this.$target = $target;
  }

  setEvent() {
    $('.btn').addEventListener('click', () => {
      this.showMoreMovies();
    });
  }

  template() {
    return `<button class="btn primary full-width">더 보기</button>`;
  }

  render() {
    this.$target.insertAdjacentHTML('beforeend', this.template());

    return this;
  }

  showMoreMovies() {
    movies.setMovies();
  }
}
