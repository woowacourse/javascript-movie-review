import './MovieInfoModal.css';
import NoImage from '../../assets/no_image.png';
import { POSTER_BASE_URL } from '../../consts/URL';
import BasicModal from '../BasicModal/BasicModal';
import movieAPI from '../../api/movie';
import MovieDomain from '../../domain/entity/Movie';
import StarIcon from '../../assets/star_filled.png';
import DeleteIcon from '../../assets/delete.png';
import { deleteUrlParams, getUrlParams, setUrlParams } from '../../utils/queryString';
import UserScoreBox from '../UserScoreBox/UserScoreBox';

class MovieInfoModal {
  movieInfoModal;
  movieId: number;
  movieInfoContainer;

  constructor() {
    this.movieInfoModal = document.createElement('div');
    this.movieInfoModal.id = 'movie-info-modal';
    this.movieId = Number(getUrlParams('movie_id'));

    this.movieInfoContainer = document.createElement('div');
    this.movieInfoContainer.id = 'movie-info-flex-wrapper';
  }

  async render() {
    const movieInfoContainer = document.createElement('div');
    movieInfoContainer.id = 'movie-info-flex-wrapper';

    const movieInfoDetailBox = document.createElement('div');
    movieInfoDetailBox.id = 'movie-info-detail-box';

    const movieInfo = await this.getMovieDetail(Number(this.movieId));

    if (movieInfo) {
      const { title, posterPath, voteAverage, genres, overview } = movieInfo;

      const titleHeader = this.createTitle(title);
      this.movieInfoModal.append(titleHeader);

      const poster = this.createPoster(posterPath, title);
      movieInfoContainer.append(poster);

      const genreAndVote = this.createGenreAndScore(genres, voteAverage);
      movieInfoDetailBox.append(genreAndVote);

      const movieOverview = this.createOverview(overview);
      movieInfoDetailBox.append(movieOverview);

      movieInfoContainer.append(movieInfoDetailBox);

      const deleteButton = this.createDeleteButton();
      this.movieInfoModal.append(deleteButton);
      this.movieInfoModal.append(movieInfoContainer);
    }

    new BasicModal(this.movieInfoModal);
    new UserScoreBox();
  }

  rerender() {
    this.movieId = Number(getUrlParams('movie_id'));

    const movieInfoModal = document.querySelector('#movie-info-modal');

    movieInfoModal?.replaceChildren();
    this.render();
  }

  async getMovieDetail(movieId: number) {
    const movieData = await movieAPI.fetchDetailOfMovie({ movieId });
    const movieInfo = MovieDomain.formatMovieDetail(movieData);
    return movieInfo;
  }

  createTitle(title: string) {
    const movieTitleHeader = document.createElement('div');
    movieTitleHeader.id = 'movie-info-modal-header';

    const movieTitle = document.createElement('span');
    movieTitle.id = 'movie-title';
    movieTitle.textContent = title;

    movieTitleHeader.append(movieTitle);

    return movieTitleHeader;
  }

  createPoster(posterPath: string, title: string) {
    if (posterPath) {
      const moviePoster = document.createElement('img');
      moviePoster.id = 'movie-info-poster';
      moviePoster.setAttribute('src', POSTER_BASE_URL + posterPath);
      moviePoster.setAttribute('alt', title);
      return moviePoster;
    } else {
      const moviePoster = document.createElement('div');
      moviePoster.id = 'movie-info-poster';
      const noImageIcon = document.createElement('img');
      noImageIcon.classList.add('no-image-icon');
      noImageIcon.setAttribute('src', NoImage);
      moviePoster.append(noImageIcon);
      moviePoster.setAttribute('alt', title);
      return moviePoster;
    }
  }

  createGenreAndScore(genres: string[], voteAverage: number) {
    const movieGenreScoreInfoBox = document.createElement('div');
    movieGenreScoreInfoBox.id = 'movie-info-genre-score-box';

    const movieGenre = this.createGenre(genres);
    const movieScore = this.createScore(voteAverage);

    movieGenreScoreInfoBox.append(movieGenre);
    movieGenreScoreInfoBox.append(movieScore);

    return movieGenreScoreInfoBox;
  }

  createGenre(genres: string[]) {
    const movieGenre = document.createElement('span');
    movieGenre.id = 'movie-info-genre';
    movieGenre.textContent = genres.join(', ');
    return movieGenre;
  }

  createScore(voteAverage: number) {
    const starIcon = document.createElement('img');
    starIcon.setAttribute('src', StarIcon);
    starIcon.classList.add('star-icon');

    const movieScoreBox = document.createElement('span');
    movieScoreBox.id = 'movie-info-score-box';

    const movieScore = document.createElement('span');
    movieScore.id = 'movie-info-score';

    movieScore.textContent = String(voteAverage);

    movieScoreBox.append(starIcon);
    movieScoreBox.append(movieScore);

    return movieScoreBox;
  }

  createOverview(overview: string) {
    const movieOverview = document.createElement('div');
    movieOverview.id = 'movie-overview';
    movieOverview.textContent = overview;
    return movieOverview;
  }

  createDeleteButton() {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('modal-close-button', 'flex-center');
    const deleteIcon = document.createElement('img');
    deleteIcon.setAttribute('src', DeleteIcon);

    deleteButton.append(deleteIcon);

    deleteButton.addEventListener('click', () => {
      BasicModal.closeModal();
      deleteUrlParams('movie_id');
    });

    return deleteButton;
  }
}

export default MovieInfoModal;
