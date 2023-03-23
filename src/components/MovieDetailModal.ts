import starFilled from '../assets/star_filled.png';
import { Genre, GetMovieDetailResponse } from '../service/types';

export default class MovieDetailModal {
  movieDetail: GetMovieDetailResponse;
  $parent: HTMLElement;
  $modal: HTMLDialogElement;
  $closeButton: HTMLButtonElement;

  constructor($parent: HTMLElement, movieDetail: GetMovieDetailResponse) {
    this.movieDetail = movieDetail;
    this.$parent = $parent;
    this.$parent.insertAdjacentHTML('beforeend', this.template());
    this.$modal = this.$parent.querySelector('.movie-detail-modal') as HTMLDialogElement;
    this.$closeButton = this.$modal.querySelector(
      '.movie-detail-modal-close-button',
    ) as HTMLButtonElement;
  }

  template() {
    const { title, poster_path, genres, vote_average, overview } = this.movieDetail;

    const getGenreNames = (genres: Genre[]) => {
      return genres.map((genre) => genre.name);
    };
    return `
    <dialog class='movie-detail-modal'>
      <div class="movie-detail-modal-title-container">
        <span class='movie-detail-modal-title'>${title}</span>
        <button class='movie-detail-modal-close-button'>X</button>
      </div>
      <div class='movie-detail-modal-main'>
        <div class="movie-detail-modal-thumbnail">
          <img
            src="https://image.tmdb.org/t/p/original/${poster_path}"
            alt="Grapefruit slice atop a pile of other slices"
          />
        </div>
        <section class="movie-detail-modal-description">
          <div>
            <div class="movie-detail-modal-genre-vote">
              <span>${getGenreNames(genres).join(',')}</span>
              <span class="item-score"><img src="${starFilled}" alt="별점" /><span class='item-vote-average'>${vote_average}</span>
              </div>
            <p>${overview}</p>
          </div>
          <div class="movie-detail-modal-user-vote">
            <span id="user-vote-title">내 별점</span>
            <span id="user-vote-star-span">
              <img src="${starFilled}" alt="별점"/>
              <img src="${starFilled}" alt="별점"/>
              <img src="${starFilled}" alt="별점"/>
              <img src="${starFilled}" alt="별점"/>
              <img src="${starFilled}" alt="별점"/>
            </span>
            <span id="user-vote-star-amount">6</span>
            <span id="user-vote-star-description">보통이에요</span>
          </div>
        </section>
      </div>
    </dialog>
    `;
  }

  bindEvent() {
    this.$closeButton.addEventListener('click', () => {
      this.close();
    });
  }

  show() {
    this.$modal.showModal();
  }

  close() {
    this.$modal.remove();
  }
}
