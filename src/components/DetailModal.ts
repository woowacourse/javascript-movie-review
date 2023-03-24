import { DetailModalType } from '../type/movie';
import { MOVIE_APP_IMG_PATH } from '../constant';
import { $ } from '../utils/domHelper';

import movies from '../domain/Movies';

export default class DetailModal extends HTMLElement {
  constructor() {
    super();

    movies.subscribe('detail', this.render.bind(this));

    this.render();
  }

  render(
    { title, poster_path, genres, vote_average, overview }: any = {
      title: '',
      poster_path: '',
      genres: [],
      vote_average: 0,
      overview: '',
    }
  ) {
    this.innerHTML = `
    <dialog class="movie-modal">
      <div class="movie-modal-container">
        <div class="movie-modal-header">
          <h2>${title}</h2>
        </div>
        <form method="dialog">
          <button class="close-modal-button"></button>
        </form>
        <div class="movie-modal-detail">
          <div class="movie-modal-image-container">
            <img class="skeleton" src="https://image.tmdb.org/t/p/original${poster_path}" alt="포스터" />
          </div>  
          <div class="movie-modal-description-container">
            <div class="movie-modal-overview">
              <div class="movie-modal-genre">
                <span>스릴러,공포,코미디</span>
                <img src="${MOVIE_APP_IMG_PATH.starFilled}" alt="별점" />
                <span>${vote_average}</span>
              </div>  
              <p>${overview}</p>
            </div>
            <div class="my-evaluation">
              <span>내 별점</span>
              <div class="star-container">
                <img src="${MOVIE_APP_IMG_PATH.starEmpty}" alt="나의 별점" />
                <img src="${MOVIE_APP_IMG_PATH.starEmpty}" alt="나의 별점" />
                <img src="${MOVIE_APP_IMG_PATH.starEmpty}" alt="나의 별점" />
                <img src="${MOVIE_APP_IMG_PATH.starEmpty}" alt="나의 별점" />
                <img src="${MOVIE_APP_IMG_PATH.starEmpty}" alt="나의 별점" />
              </div>
              <span>6 보통이에요</span>
            </div>
          </div>
        </div>
      </div>
    </dialog>`;
  }

  connectedCallback() {}
}
