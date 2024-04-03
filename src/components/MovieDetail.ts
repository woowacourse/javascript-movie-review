import { MovieDetailData } from './../api/apiType';
import { getMovieDetail } from '../api/movieDetail';
import { yellowStar, xButton } from '../constant/svg';
import { NO_IMAGE } from '../resource';

import BaseModal from './common/ModalLayout';
import MyVote from './MyVote';
import { loader } from './common/loader';
import { CONSTANT_URL } from '../constant/api';

class MovieDetail extends BaseModal {
  constructor() {
    super();
    this.onMovieClick();
  }

  async getData(movieId: number) {
    const data = await getMovieDetail(movieId);

    return data;
  }

  async initMovieDetail(event: Event) {
    loader();
    if (!(event instanceof CustomEvent)) return;
    const movieData = await this.getData(event.detail);
    const newContainer = this.getMovieDetailTemplate(movieData).outerHTML;
    const modalContainer = document.querySelector('.modal-container') as Element;

    const load = document.querySelector('.loader-background');
    load?.remove();

    modalContainer.innerHTML = newContainer;

    this.setDetailEvent();
    new MyVote(event.detail);
  }

  setDetailEvent() {
    this.modalOpen();
    this.clickXButton();
  }

  onMovieClick() {
    const app = document.querySelector('#app');
    if (!(app instanceof HTMLElement)) return;
    app.addEventListener('open-movie-detail', (event: Event) => {
      this.initMovieDetail(event);
    });
  }

  clickXButton() {
    const xButton = document.querySelector('.x-button');

    if (!(xButton instanceof HTMLElement)) return;
    xButton.addEventListener('click', () => {
      this.modalClose();
    });
  }

  getMovieDetailTemplate(movieData: MovieDetailData) {
    const container = document.createElement('div');
    container.classList.add('container');
    const { genres, movieTitle, voteAverage, overview, posterPath } = movieData;
    const thumbnail = posterPath ? `${CONSTANT_URL.poster}${posterPath}` : NO_IMAGE;
    const genresGroup = genres.map((prop) => prop.name).join(', ');
    container.innerHTML = `
          <div>
            <div class="modal-title">${movieTitle}</div>
            <button class="x-button">${xButton}</button>
          <div class="modal-body">
            <img src=${thumbnail} class="movie-image" />
            <div class="movie-info">
              <div class="column">
                <div class="row">
                  <div class="movie-genres">${genresGroup}</div>
                  <div class="star">${yellowStar} ${voteAverage}</div>
                </div>
                <div class="vote-average">
                 ${overview}
                </div>
              </div>
              
           </div>
          </div>
        `;

    return container;
  }
}

export default MovieDetail;
