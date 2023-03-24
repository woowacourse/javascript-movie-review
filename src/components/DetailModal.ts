import { DetailModalType, StarKeyType } from '../type/movie';
import { MOVIE_APP_IMG_PATH, STAR_CONDITION, STAR_MENT } from '../constant';
import { $, $$ } from '../utils/domHelper';

import movies from '../domain/Movies';

export default class DetailModal extends HTMLElement {
  private movieId: number;

  constructor() {
    super();
    this.movieId = 0;

    movies.subscribe('detail', this.render.bind(this));

    this.render();
  }

  render(
    { id, title, poster_path, genres, vote_average, overview }: any = {
      id: 0,
      title: '',
      poster_path: '',
      genres: '',
      vote_average: 0,
      overview: '',
    }
  ) {
    this.movieId = id;

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
                <span>${genres}</span>
                <img src="${MOVIE_APP_IMG_PATH.starFilled}" alt="별점" />
                <span>${vote_average}</span>
              </div>  
              <p>${overview}</p>
            </div>
            <div class="my-evaluation">
              <span>내 별점</span>
              <div class="star-container">
                <img class="star-item" id="1" src="${MOVIE_APP_IMG_PATH.starEmpty}" alt="나의 별점" />
                <img class="star-item" id="2" src="${MOVIE_APP_IMG_PATH.starEmpty}" alt="나의 별점" />
                <img class="star-item" id="3" src="${MOVIE_APP_IMG_PATH.starEmpty}" alt="나의 별점" />
                <img class="star-item" id="4" src="${MOVIE_APP_IMG_PATH.starEmpty}" alt="나의 별점" />
                <img class="star-item" id="5" src="${MOVIE_APP_IMG_PATH.starEmpty}" alt="나의 별점" />
              </div>
              <span class="star-evaluation-ment">6 보통이에요</span>
            </div>
          </div>
        </div>
      </div>
    </dialog>`;

    console.log('render');
    this.setEvent();
  }

  renderStarContainer(filled: any, imageTags: any) {
    const starFilled = filled as 1 | 2 | 3 | 4 | 5;

    STAR_CONDITION[starFilled].forEach((isfilled: boolean, idx: number) => {
      if (isfilled) imageTags[idx].src = MOVIE_APP_IMG_PATH.starFilled;
      else imageTags[idx].src = MOVIE_APP_IMG_PATH.starEmpty;
    });

    $('.star-evaluation-ment').textContent = `${filled * 2}점 ${
      STAR_MENT[starFilled]
    }`;
  }

  initStarContainer() {
    return `
    <div class="star-container">
      <img src="${MOVIE_APP_IMG_PATH.starEmpty}" alt="나의 별점" />
      <img src="${MOVIE_APP_IMG_PATH.starEmpty}" alt="나의 별점" />
      <img src="${MOVIE_APP_IMG_PATH.starEmpty}" alt="나의 별점" />
      <img src="${MOVIE_APP_IMG_PATH.starEmpty}" alt="나의 별점" />
      <img src="${MOVIE_APP_IMG_PATH.starEmpty}" alt="나의 별점" />
    </div>
    <span>0점</span>
    `;
  }

  setEvent() {
    $('.star-container').addEventListener('click', (event) => {
      this.setMyEvaluation(event);
    });
  }

  setMyEvaluation(event: Event) {
    const img = event.target as HTMLElement;
    localStorage.setItem(String(this.movieId), img.id);

    this.getMyEvaluation();
  }

  getMyEvaluation() {
    const evaluation = localStorage.getItem(String(this.movieId));

    this.renderStarContainer(evaluation, [...$$('.star-item')]);
  }
}
