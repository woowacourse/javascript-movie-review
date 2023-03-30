import template from './index.html';
import { STRING } from '../../utils/Constant';
import { $$ } from '../../utils/Dom';

export class MovieItem extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template;
    this.render();
    this.imageSkeletonHandler();
  }

  private render() {
    this.innerHTML = template
      .replace('{id}', this.getAttribute('id') ?? STRING.UNKNOWN)
      .replace('{poster_path}', this.getAttribute('poster') ?? STRING.UNKNOWN)
      .replaceAll('{title}', this.getAttribute('title') ?? STRING.UNKNOWN)
      .replace('{vote_average}', this.getAttribute('vote') ?? STRING.UNKNOWN);
  }

  private imageSkeletonHandler() {
    const movieImg = $$('img', HTMLImageElement, this);
    const skeleton = $$('.skeleton', HTMLDivElement, this);

    movieImg?.addEventListener('load', () => {
      movieImg.classList.remove('hidden');
      skeleton?.remove();
    });
  }
}
