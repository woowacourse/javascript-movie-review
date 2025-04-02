import BaseModal from '../common/BaseModal.js';
import StarRating from './StarRating.js';
import MovieRatingStorageService from '../../domain/MovieRatingStorageService.ts';

class DetailModal extends BaseModal {
  constructor(movie) {
    super();
    this.movie = movie;
  }

  showMovieDetails() {
    this.open();
    const movieContent = /*html*/ `
      <div class="modal-image">
        <img src="https://image.tmdb.org/t/p/original${
          this.movie.posterPath
        }" />
      </div>
      <div class="modal-description">
        <h2>${this.movie.title}</h2>
        <p class="category">
          ${this.movie.releaseDate} · ${this.movie.genres
      .map(genre => genre.name)
      .join(', ')}
        </p>
        
        <p class="rate">
          <span>평균</span><img src="./images/star_filled.png" class="star" /><span>${
            this.movie.voteAverage
          }</span>
        </p>  
        
        <hr />
        <p class="my-rate">
          <span>내 별점</span>
          <div class="star-rating-container"></div>
        </p>

        <hr />
        <div class="movie-overview">
          <span>줄거리</span>
          <p class="detail">
            ${this.movie.overview}
          </p>
        </div>
      </div>
    `;

    this.setContent(movieContent);

    const modal = document.querySelector('.modal');
    const starRatingContainer = modal.querySelector('.star-rating-container');
    const initialRating = MovieRatingStorageService.getRating(this.movie.id);

    const starRating = new StarRating(
      starRatingContainer,
      this.movie.id,
      initialRating,
      movieRating => {
        MovieRatingStorageService.saveRating(movieRating);
      },
    );
  }
}

export default DetailModal;
