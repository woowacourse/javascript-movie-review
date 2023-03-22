import { MOVIE_APP_IMG_PATH } from '../constant/index';

export default class MovieItem extends HTMLElement {
  constructor() {
    super();

    this.render();
  }

  render() {
    this.innerHTML = `
    <li id="${this.getAttribute('id')}">
      <a href="#">
        <div class="item-card">
          <img
          class="item-thumbnail skeleton"
          src="https://image.tmdb.org/t/p/original${this.getAttribute(
            'poster-path'
          )}"
          onerror=this.src="${MOVIE_APP_IMG_PATH.posterEmpty}"
          loading="lazy"
          />
          <p class="item-title">${this.getAttribute('title')}</p>
          <p class="item-score"><img src="${
            MOVIE_APP_IMG_PATH.starFilled
          }" alt="별점" /> ${this.getAttribute('vote-average')}</p>
        </div>
      </a>
    </li>
    `;
  }
}
