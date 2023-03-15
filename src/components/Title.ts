import movies from '../domain/Movies';
import { $ } from '../utils/domHelper';

export default class Title {
  $target;

  constructor($target: HTMLElement) {
    this.$target = $target;

    movies.subscribe('movies', this.render.bind(this));
  }

  render() {
    this.$target.textContent = movies.getTitle();
  }
}
