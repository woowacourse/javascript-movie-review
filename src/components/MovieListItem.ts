import { STAR_FILLED_ICON } from '../icons';

import DefaultPoster from '../../images/default_poster.png';

class MovieListItem extends HTMLElement {
  constructor() {
    super();

    const imgSrc = this.getAttribute('poster-path');
    this.innerHTML = /* html */ `
      <li>
        <a href="#">
          <div class="item-card">
            <img
              class="item-thumbnail skeleton"
              src=${
                imgSrc === 'null'
                  ? DefaultPoster
                  : `https://image.tmdb.org/t/p/w300_and_h450_face${imgSrc}`
              }
              loading="lazy"
              alt="${this.getAttribute('title')}"
            />
            <p class="item-title">${this.getAttribute('title')}</p>
            <p class="item-score" aria-label="별점">${STAR_FILLED_ICON} ${this.getAttribute(
      'vote-average'
    )}  </p>
          </div>
        </a>
      </li>
    `;
  }
}

export default MovieListItem;
