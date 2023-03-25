import './MovieListItem.css';
import STAR_FILLED from '../image/star-filled.png';
import { $, sliceSting } from '../utils/common';
import { HTMLModalElement } from './Modal';

class MovieListItem extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setClickEvent();
  }

  render() {
    const SLICE_START = 0;
    const SLICE_END = 3;
    const id = this.id;
    const imgUrl = this.getAttribute('imgUrl');
    const title = this.getAttribute('title') || '';
    const score = this.getAttribute('score');

    this.innerHTML = /*html*/ `
    <li id="${id}" class="moive-item-container">
      <a>
        <div class="item-card">
            <movie-image imgUrl="${imgUrl}" title="${title}" width="200" class="movie-list-image-wrapper"></movie-image>
          <p class="item-title">${sliceSting(title)}</p>
          <div class="item-score">
            <span>${score?.slice(SLICE_START, SLICE_END)}</span>
            <img src="${STAR_FILLED}" alt="별점" />
          </div>
        </div>
      </a>
    </li>`;
  }

  setClickEvent() {
    this.querySelector('li')?.addEventListener('click', () => {
      const modal = $('movie-modal') as HTMLModalElement;

      const id = this.id;
      const title = this.getAttribute('title') || '';
      const imgUrl = this.getAttribute('imgUrl') || '';
      const score = this.getAttribute('score') || '';
      const description = this.getAttribute('description') || '';

      modal.setModalAttributes({ id: Number(id), title, imgUrl, score: Number(score), description });
      modal.connectedCallback();
      modal.openModal();
    });
  }
}

export default MovieListItem;
