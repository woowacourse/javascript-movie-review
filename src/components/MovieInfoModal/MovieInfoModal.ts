import { Movie } from '../../types/movie';
import './MovieInfoModal.css';

import { POSTER_BASE_URL } from '../../consts/URL';
import BasicModal from '../BasicModal/BasicModal';
import movieAPI from '../../api/movie';
import { getUrlParams } from '../../utils/queryString';
class MovieInfoModal {
  movieInfo: any; //TODO: any 없애기
  movieInfoBox;

  constructor() {
    this.movieInfoBox = document.createElement('div');
    this.movieInfoBox.classList.add('movie-info-modal');
    new BasicModal(this.movieInfoBox);

    this.render();
  }

  async render() {
    const movieId = getUrlParams('movie_id');
    // if (movieId) {
    const result = await movieAPI.fetchDetailOfMovie({ movieId: Number(movieId) });

    console.log('result', result);
    this.movieInfo = result;
    // }

    // await this.getMovieDetail();
    const movieTitleHeader = document.createElement('div');
    movieTitleHeader.id = 'movie-info-modal-header';
    movieTitleHeader.textContent = this.movieInfo.title;
    this.movieInfoBox.append(movieTitleHeader);

    const movieInfoWrapper = document.createElement('div');
    movieInfoWrapper.id = 'movie-info-flex-wrapper';

    const moviePoster = document.createElement('img');
    moviePoster.id = 'movie-info-poster';

    if (this.movieInfo.posterPath) {
      console.log('aaaa', this.movieInfo.posterPath);
      moviePoster.setAttribute('src', POSTER_BASE_URL + this.movieInfo.posterPath);
    }

    // moviePoster.setAttribute('src', POSTER_BASE_URL + this.movieInfo.posterPath);
    moviePoster.setAttribute('alt', this.movieInfo.title);
    movieInfoWrapper.append(moviePoster);

    const movieInfoDetailBox = document.createElement('div');
    movieInfoDetailBox.id = 'movie-info-modal-box';
    movieInfoWrapper.append(movieInfoDetailBox);

    this.movieInfoBox.append(movieTitleHeader);
    this.movieInfoBox.append(movieInfoWrapper);

    const movieScoreBox = document.createElement('div');
    movieScoreBox.id = 'movie-info-modal-score';
  }

  async getMovieDetail() {
    const movieId = getUrlParams('movie_id');
    if (movieId) {
      const result = await movieAPI.fetchDetailOfMovie({ movieId: Number(movieId) });
      this.movieInfo = result;
      console.log(this.movieInfo);
    }
  }
}

export default MovieInfoModal;
