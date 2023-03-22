import './index.css';
import template from './index.html';
import { $ } from '../../utils/dom';

export class MovieItem extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template;
    this.render();
    this.skeletonHandler();
  }

  render() {
    this.innerHTML = template
      .replace('{poster_path}', this.getAttribute('poster') ?? '')
      .replaceAll('{title}', this.getAttribute('title') ?? '')
      .replace('{vote_average}', this.getAttribute('vote') ?? '');
  }

  skeletonHandler() {
    const image = $<HTMLImageElement>('img', this);
    image.addEventListener('load', () => {
      image.classList.remove('hidden');
      this.removeSkeleton();
    });
  }

  removeSkeleton() {
    const skeleton = $<HTMLDivElement>('.skeleton', this);
    skeleton.remove();
  }
}
