import { $, $$ } from '../utils/domSelector';
import { MovieDetail } from '../types';
import EventBroker from '../EventBroker';
import MovieInfoHub from '../domains/MovieInfoHub';
import { IMAGE_URL, STAR_RATING } from '../constants';

class MovieDetailModal {
  private $element = $<HTMLDialogElement>('#movie-detail-modal');

  constructor() {
    this.addClickMovieEventHandler();
    this.addBackdropClickEventHandler();
    this.addClickCloseButtonEventHandler();
    this.addClickStarRatingEventHandler();
  }

  private getTemplate(movieDetail: MovieDetail) {
    const { id, title, posterPath, genres, voteAverage, overview, starRating } = movieDetail;

    return `
    <div class="modal-container text-body">
      <div class="movie-title-container">
        <h2 class="movie-title text-subtitle">${title}</h2>
        <button type="button" id="movie-detail-modal-close-button">X</button>
      </div>
      <div class="movie-info" data-id=${id}>
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
              <img src="${starRating.imagePath}" alt="Star Image" class="star-rating-image" data-value="1"/>
              <img src="${starRating.imagePath}" alt="Star Image" class="star-rating-image" data-value="2"/>
              <img src="${starRating.imagePath}" alt="Star Image" class="star-rating-image" data-value="3"/>
              <img src="${starRating.imagePath}" alt="Star Image" class="star-rating-image" data-value="4"/>
              <img src="${starRating.imagePath}" alt="Star Image" class="star-rating-image" data-value="5"/>
            </div>
            <p class="star-rating-score">${starRating.score}</p>
            <p class="star-rating-caption">${starRating.caption}</p>
          </div>
        </div>
      </div>
    </div>`;
  }

  private render(movieDetail: MovieDetail) {
    const template = this.getTemplate(movieDetail);
    const starCountJSON = localStorage.getItem(String(movieDetail.id));

    this.$element.innerHTML = template;

    if (!starCountJSON) return;
    const starCount = JSON.parse(starCountJSON);

    this.renderStarRating(starCount);
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

  private addBackdropClickEventHandler() {
    this.$element.addEventListener('click', (event) => {
      if (event.target instanceof HTMLDialogElement && event.target.nodeName === 'DIALOG') {
        event.target.close();
      }
    });
  }

  private addClickCloseButtonEventHandler() {
    this.$element.addEventListener('click', (event) => {
      if (!(event.target instanceof HTMLButtonElement)) return;
      if (event.target.id === 'movie-detail-modal-close-button') this.$element.close();
    });
  }

  private addClickStarRatingEventHandler() {
    this.$element.addEventListener('click', (event) => {
      if (!(event.target instanceof HTMLImageElement)) return;

      const starCount = Number(
        event.target.closest('.star-rating-image')?.getAttribute('data-value'),
      );
      const movieId = event.target.closest('.movie-info')?.getAttribute('data-id');

      if (!(starCount && movieId)) return;

      this.saveStarRating(movieId, starCount);
      this.renderStarRating(starCount);
    });
  }

  renderStarRating(starCount: number) {
    const score = starCount * STAR_RATING.PER_SCORE;
    const caption = STAR_RATING.CAPTION[starCount - 1];

    $$('.star-rating-image').forEach(($star, index) => {
      if (!($star instanceof HTMLImageElement)) return;
      $star.src = index < starCount ? IMAGE_URL.STAR_FILLED : IMAGE_URL.STAR_EMPTY;
    });

    $('.star-rating-score').textContent = String(score);
    $('.star-rating-caption').textContent = caption;
  }

  saveStarRating(movieId: string, starCount: number) {
    localStorage.setItem(movieId, JSON.stringify(starCount));
  }
}

export default MovieDetailModal;
