import './MovieInfoModal.css';
import NoImage from '../../assets/no_image.png';
import { POSTER_BASE_URL } from '../../consts/URL';
import BasicModal from '../BasicModal/BasicModal';
import movieAPI from '../../api/movie';
import MovieDomain from '../../domain/entity/Movie';
import StarIcon from '../../assets/star_filled.png';
import StarVoteBox from '../StarVoteBox/StarVoteBox';
import DeleteIcon from '../../assets/delete.png';
import { getUrlParams } from '../../utils/queryString';

class MovieInfoModal {
  movieInfoModal;
  movieId: number;

  constructor() {
    this.movieInfoModal = document.createElement('div');
    this.movieInfoModal.id = 'movie-info-modal';
    this.movieId = Number(getUrlParams('movie_id'));
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

      const starVoteBox = new StarVoteBox().render();

      const deleteButton = this.createDeleteButton();
      this.movieInfoModal.append(deleteButton);

      movieInfoDetailBox.append(starVoteBox);

      this.movieInfoModal.append(movieInfoContainer);
    }

    new BasicModal(this.movieInfoModal);
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
    movieTitleHeader.textContent = title;

    return movieTitleHeader;
  }

  createPoster(posterPath: string, title: string) {
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

  createGenreAndScore(genres: string[], voteAverage: number) {
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

    return movieGenreScoreInfoBox;
  }

  createOverview(overview: string) {
    const movieOverview = document.createElement('div');
    movieOverview.classList.add('movie-overview');
    movieOverview.textContent = overview;
    return movieOverview;
  }

  createDeleteButton() {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('modal-close-button');
    const deleteIcon = document.createElement('img');
    deleteIcon.setAttribute('src', DeleteIcon);

    deleteButton.append(deleteIcon);

    deleteButton.addEventListener('click', () => {
      BasicModal.closeModal();
    });

    return deleteButton;
  }
}

export default MovieInfoModal;
