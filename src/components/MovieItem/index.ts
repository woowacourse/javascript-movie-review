import './index.css';
import { $ } from '../../utils/dom';

class MovieItem extends HTMLElement {
  connectedCallback() {
    this.render();
    this.skeletonHandler();
  }

  render() {
    const title = this.getAttribute('title') ?? '';
    const posterPath = this.getAttribute('poster') ?? '';
    const voteAverage = this.getAttribute('vote') ?? '';
    const id = this.getAttribute('id') ?? '';

    const template = `<li class="item-card" id="${id}">
    <div class="item-thumbnail skeleton"></div>
    <img
      class="item-thumbnail hidden"
      src="https://image.tmdb.org/t/p/w500${posterPath}"
      alt="${title}"
    />
    <p class="item-title">${title}</p>
    <p class="item-score"><img src="./assets/star_filled.png" alt="별점" /> ${voteAverage}</p>
  </li>
  `;
    this.innerHTML = template;
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

export default MovieItem;
