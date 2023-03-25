import './MovieListItem.css';
import { $, sliceScore, sliceSting } from '../utils/common';
import { HTMLModalElement } from './Modal';

class MovieListItem extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setClickEvent();
  }

  render() {
    const id = this.id;
    const imgUrl = this.getAttribute('imgUrl');
    const title = this.getAttribute('title') || '';
    const score = this.getAttribute('score') || '';

    this.innerHTML = /*html*/ `
    <li id="${id}" class="moive-item-container">
      <a>
        <div class="item-card">
            <movie-image imgUrl="${imgUrl}" title="${title}" width="200" class="movie-list-image-wrapper"></movie-image>
          <p class="item-title">${sliceSting(title)}</p>
          <div class="item-score-container">
            <movie-score score="${sliceScore(score)}"></movie-score>
            <div class="item-check" title="이미 본 영화">✅</div>
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

      modal.setModalAttributes({
        id: Number(id),
        title,
        imgUrl,
        score: Number(sliceScore(score)),
        description,
      });
      modal.connectedCallback();
      modal.openModal();
    });
  }
}

export default MovieListItem;
