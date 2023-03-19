import { $ } from '../utils/domHelper';
import movies from '../domain/Movies';

export default class Title {
  private $target;

  constructor($target: HTMLElement) {
    this.$target = $target;

    movies.subscribe('movies', this.render.bind(this));
  }

  render() {
    this.$target.textContent = movies.getTitle();
  }
}
