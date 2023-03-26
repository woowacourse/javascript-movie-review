import './MovieListItem.css';
import { sliceScore, sliceSting } from '../utils/common';
import { MovieScoreInfo } from '../types/type';

export interface HTMLMovieListItemElement extends HTMLElement {
  updateReviewedElement: () => void;
}

class MovieListItem extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setClickEvent();
    this.updateReviewedElement();
  }

  render() {
    const imgUrl = this.getAttribute('imgUrl');
    const title = this.getAttribute('title') || '';
    const score = this.getAttribute('score') || '';

    this.innerHTML = /*html*/ `
    <li class="moive-item-container">
      <a>
        <div class="item-card">
            <movie-image imgUrl="${imgUrl}" title="${title}" width="200" class="movie-list-image-wrapper"></movie-image>
          <p class="item-title">${sliceSting(title)}</p>
          <div class="item-score-container">
            <movie-score score="${sliceScore(score)}"></movie-score>
            <div class="item-check" title="내가 평가한 영화">✅</div>
          </div>
        </div>
      </a>
    </li>`;
  }

  setClickEvent() {
    this.querySelector('li')?.addEventListener('click', () => {
      const movieId = this.getAttribute('movieId') || '';

      this.updateQueries(movieId);
    });
  }

  updateReviewedElement() {
    const movieId = this.getAttribute('movieId');
    const movieScore: MovieScoreInfo[] = JSON.parse(localStorage.getItem('movieScore') || '[]');

    const isReview = movieScore.some(movie => movie.id === Number(movieId));

    if (!isReview) {
      this.querySelector('.item-check')?.classList.add('hide');
      return;
    }

    this.querySelector('.item-check')?.classList.remove('hide');
  }

  updateQueries(movieId: string) {
    const path = window.location.hash.replace('#', '');
    const URL = new URLSearchParams(path);
    const searchWord = URL.get('q');
    const searchURL = searchWord ? `q=${searchWord}&` : '';
    if (movieId === '') {
      window.location.hash = `${searchURL}`;
      return;
    }
    window.location.hash = `?${searchURL}id=${movieId}`;
  }
}

export default MovieListItem;
