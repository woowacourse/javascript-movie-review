import DefaultPoster from '../../assets/default_poster.png';
import { STAR_FILLED } from '../../../assets/svg';
import { dispatchCustomEvent } from '../../utils/domUtils';

class MovieListItem extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    const posterPath = this.getAttribute('poster-path');
    this.innerHTML = /* html */ `
      <li id="${this.getAttribute('id')}">
        <div class="item-card">
          <img
            class="item-thumbnail skeleton"
            src=${
              posterPath === 'null'
                ? DefaultPoster
                : `https://image.tmdb.org/t/p/w220_and_h330_face${posterPath}`
            }
            loading="lazy"
            alt="${this.getAttribute('title')}"
          />
          <p class="item-title">
            ${this.getAttribute('title')}
          </p>
          <p class="item-score">
            ${STAR_FILLED}
            ${this.getAttribute('vote-average')}
          </p>
        </div>
      </li>
    `;
  }

  connectedCallback() {
    this.querySelector('.item-thumbnail')?.addEventListener('load', this.onLoad);
    this.addEventListener('click', this.onClick);
  }

  onLoad = () => {
    this.querySelector('.item-thumbnail')?.classList.remove('skeleton');
  };

  onClick = () => {
    dispatchCustomEvent(this, 'clickItem', { id: Number(this.getAttribute('id')) });
  };
}

export default MovieListItem;
