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
  movieInfoBox;
  movieInfoWrapper;
  movieInfoDetailBox;

  constructor() {
    this.movieInfoBox = document.createElement('div');
    this.movieInfoBox.classList.add('movie-info-modal');
    new BasicModal(this.movieInfoBox);
    this.movieInfoWrapper = document.createElement('div');
    this.movieInfoWrapper.id = 'movie-info-flex-wrapper';

    this.movieInfoDetailBox = document.createElement('div');
    this.movieInfoDetailBox.id = 'movie-info-detail-box';
    this.render();
  }

  async render() {
    const movieId = getUrlParams('movie_id');

    const movieInfo = await this.getMovieDetail(Number(movieId));

    if (movieInfo) {
      const { title, posterPath, voteAverage, genres, overview } = movieInfo;

      this.renderMovieTitle(title);
      this.renderPoster(posterPath, title);
      this.renderGenresAndVoteAverage(genres, voteAverage);
      this.renderOverview(overview);

      const starVoteBox = new StarVoteBox().render();

      this.movieInfoDetailBox.append(starVoteBox);
      this.movieInfoBox.append(this.movieInfoWrapper);
    }
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
    this.movieInfoBox.append(movieTitleHeader);
    this.movieInfoBox.append(movieTitleHeader);
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
    this.movieInfoWrapper.append(moviePoster);
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

    this.movieInfoDetailBox.append(movieGenreScoreInfoBox);
  }

  renderOverview(overview: string) {
    const movieOverview = document.createElement('div');
    movieOverview.classList.add('movie-overview');
    movieOverview.textContent = overview;
    this.movieInfoDetailBox.append(movieOverview);
    this.movieInfoWrapper.append(this.movieInfoDetailBox);
  }
}

export default MovieInfoModal;
