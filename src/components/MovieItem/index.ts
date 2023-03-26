import template from './index.html';
import { STRING } from '../../utils/Constant';

export class MovieItem extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template;
    this.#render();
    this.imageSkeletonHandler();
  }

  #render() {
    this.innerHTML = template
      .replace('{id}', this.getAttribute('id') ?? STRING.UNKNOWN)
      .replace('{poster_path}', this.getAttribute('poster') ?? STRING.UNKNOWN)
      .replaceAll('{title}', this.getAttribute('title') ?? STRING.UNKNOWN)
      .replace('{vote_average}', this.getAttribute('vote') ?? STRING.UNKNOWN);
  }

  imageSkeletonHandler() {
    const movieImg = this.querySelector('img');
    const skeleton = this.querySelector('.skeleton');

    movieImg?.addEventListener('load', () => {
      movieImg.classList.remove('hidden');
      skeleton?.remove();
    });
  }
}
