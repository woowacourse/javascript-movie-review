import { MOVIE_APP_IMG_PATH } from '../constant/index';
import movies from '../domain/Movies';
import { $ } from '../utils/domHelper';

export default class MovieItem extends HTMLElement {
  constructor() {
    super();

    this.render();
  }

  render() {
    this.innerHTML = `
    <li class="movie-item" id="${this.getAttribute('id')}">
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
    </li>
    `;
  }

  connectedCallback() {
    this.addEventListener('click', async () => {
      await movies.detailMovies(Number(this.getAttribute('id')));

      const detailModal = $('.movie-modal') as HTMLDialogElement;
      detailModal.showModal();
    });
  }
}
