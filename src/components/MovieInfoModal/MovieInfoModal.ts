import './MovieInfoModal.css';
import NoImage from '../../assets/no_image.png';
import { POSTER_BASE_URL } from '../../consts/URL';
import BasicModal from '../BasicModal/BasicModal';
import movieAPI from '../../api/movie';
import { getUrlParams } from '../../utils/queryString';
import MovieDomain from '../../domain/entity/Movie';
import StarIcon from '../../assets/star_filled.png';
import StarVoteBox from '../StarVoteBox/StarVoteBox';

class MovieInfoModal {
  movieId;

  constructor() {
    this.movieId = getUrlParams('movie_id');
  }

  async render() {
    const movieInfoModal = document.createElement('div');
    movieInfoModal.classList.add('movie-info-modal');

    new BasicModal(movieInfoModal);

    const movieInfoContainer = document.createElement('div');
    movieInfoContainer.id = 'movie-info-flex-wrapper';

    const movieInfoDetailBox = document.createElement('div');
    movieInfoDetailBox.id = 'movie-info-detail-box';
    const movieId = getUrlParams('movie_id');

    if (!movieId) return;
    const movieInfo = await this.getMovieDetail(Number(movieId));

    if (movieInfo) {
      const { title, posterPath, voteAverage, genres, overview } = movieInfo;

      const titleHeader = this.renderMovieTitle(title);
      movieInfoModal.append(titleHeader);

      const poster = this.renderPoster(posterPath, title);
      movieInfoContainer.append(poster);

      const genreAndVote = this.renderGenresAndVoteAverage(genres, voteAverage);
      movieInfoDetailBox.append(genreAndVote);

      const movieOverview = this.renderOverview(overview);

      movieInfoDetailBox.append(movieOverview);
      movieInfoContainer.append(movieInfoDetailBox);

      const starVoteBox = new StarVoteBox().render();

      movieInfoDetailBox.append(starVoteBox);
      movieInfoModal.append(movieInfoContainer);
    }
  }

  rerender() {
    const modalContainer = document.querySelector('.modal-container');

    modalContainer?.replaceChildren();
    this.movieId = getUrlParams('movie_id');
    this.render();
  }

  async getMovieDetail(movieId: number) {
    const movieData = await movieAPI.fetchDetailOfMovie({ movieId });
    const movieInfo = MovieDomain.formatMovieDetail(movieData);
    return movieInfo;
  }

  renderMovieTitle(title: string) {
    const movieTitleHeader = document.createElement('div');
    movieTitleHeader.id = 'movie-info-modal-header';
    movieTitleHeader.textContent = title;

    return movieTitleHeader;
  }

  renderPoster(posterPath: string, title: string) {
    const moviePoster = document.createElement('img');
    moviePoster.id = 'movie-info-poster';

    if (posterPath) {
      moviePoster.setAttribute('src', POSTER_BASE_URL + posterPath);
    } else {
      moviePoster.classList.add('no-image');
      const noImageIcon = document.createElement('img');
      noImageIcon.classList.add('no-image-icon');
      noImageIcon.setAttribute('src', NoImage);
      moviePoster.append(noImageIcon);
    }
    moviePoster.setAttribute('alt', title);
    return moviePoster;
  }

  renderGenresAndVoteAverage(genres: string[], voteAverage: number) {
    const movieGenreScoreInfoBox = document.createElement('div');
    movieGenreScoreInfoBox.id = 'movie-info-genre-score-box';

    const movieGenre = document.createElement('span');
    movieGenre.id = 'movie-info-genre';
    movieGenre.textContent = genres.join(', ');

    const starIcon = document.createElement('img');
    starIcon.setAttribute('src', StarIcon);
    starIcon.classList.add('star-icon');

    const movieScoreBox = document.createElement('span');
    movieScoreBox.id = 'movie-info-score-box';

    const movieScore = document.createElement('span');
    movieScore.id = 'movie-info-score';

    movieScore.textContent = String(voteAverage);

    movieGenreScoreInfoBox.append(movieGenre);
    movieGenreScoreInfoBox.append(movieScoreBox);

    movieScoreBox.append(starIcon);
    movieScoreBox.append(movieScore);

    return movieScoreBox;
  }

  renderOverview(overview: string) {
    const movieOverview = document.createElement('div');
    movieOverview.classList.add('movie-overview');
    movieOverview.textContent = overview;
    return movieOverview;
  }
}

export default MovieInfoModal;
