import { $ } from '../utils/domSelector';
import { MovieDetail } from '../types';
import EventBroker from '../EventBroker';
import MovieInfoHub from '../domains/MovieInfoHub';

class MovieDetailModal {
  private $element = $<HTMLDialogElement>('#movie-detail-modal');

  constructor() {
    this.addClickMovieEventHandler();
    this.addClickCloseButtonEventHandler();
  }

  private getTemplate(movieDetail: MovieDetail) {
    const { title, posterPath, genres, voteAverage, overview, starRating } = movieDetail;

    return `
    <div class="modal-container text-body">
      <div class="movie-title-container">
        <h2 class="movie-title text-subtitle">${title}</h2>
        <button type="button" id="movie-detail-modal-close-button">X</button>
      </div>
      <div class="movie-info">
        <img src="${posterPath}" alt="${title} Poster Image" class="poster-image skeleton" />
        <div class="movie-info-detail"> 
          <div class="genre-vote-average-container">
            <p>${genres}</p>
            <img src="./assets/star_filled.png" alt="Star Image" class="star-image" />
            <p>${voteAverage}</p>          
          </div>
          <p class="movie-overview">${overview}</p>
          <div class="star-rating-container">
            <p>My Star Rating</p>
            <div class="star-container">
              <img src="${starRating.imagePath}" alt="Star Image" class="star-image" />
              <img src="${starRating.imagePath}" alt="Star Image" class="star-image" />
              <img src="${starRating.imagePath}" alt="Star Image" class="star-image" />
              <img src="${starRating.imagePath}" alt="Star Image" class="star-image" />
              <img src="${starRating.imagePath}" alt="Star Image" class="star-image" />
            </div>
            <p class="star-rating-score">${starRating.score}</p>
            <p class="star-rating-coment">${starRating.coment}</p>
          </div>
        </div>
      </div>
    </div>`;
  }

  private render(movieDetail: MovieDetail) {
    const template = this.getTemplate(movieDetail);
    this.$element.innerHTML = template;
  }

  private addClickMovieEventHandler() {
    EventBroker.addEventListener('clickMovieEvent', async (event) => {
      if (this.$element.open) return;

      const movieDetail = await MovieInfoHub.getMovieInfo(Number(event.detail.movieId));

      if (!movieDetail) return;

      this.render(movieDetail);
      this.$element.showModal();
    });
  }

  private addClickCloseButtonEventHandler() {
    this.$element.addEventListener('click', (event) => {
      if (!(event.target instanceof HTMLButtonElement)) return;
      if (event.target.id === 'movie-detail-modal-close-button') this.$element.close();
    });
  }
}

export default MovieDetailModal;
