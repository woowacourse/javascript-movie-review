import { StarKeyType } from '../type/movie';
import { MOVIE_APP_IMG_PATH, STAR_CONDITION, STAR_MENT } from '../constant';
import { $, $$ } from '../utils/domHelper';
import { saveMovieRating, loadMovieRating } from '../utils/useLocalStorage';

import movies from '../domain/Movies';

export default class DetailModal extends HTMLElement {
  private movieId: number;
  private starMent: string;

  constructor() {
    super();
    this.movieId = 0;
    this.starMent = '0점';

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
    <dialog id="modal" class="movie-modal">
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
              ${this.initStarContainer()}
              </div>
              <span class="star-evaluation-ment">${this.starMent}</span>
            </div>
          </div>
        </div>
      </div>
    </dialog>
    `;

    this.setEvent();
  }

  renderStarContainer(evaluation: StarKeyType) {
    const imageTags = [...$$('.star-item')] as HTMLImageElement[];

    const starImages = STAR_CONDITION[evaluation]
      .map((isfilled: boolean, idx: number) => {
        if (isfilled) imageTags[idx].src = MOVIE_APP_IMG_PATH.starFilled;
        else imageTags[idx].src = MOVIE_APP_IMG_PATH.starEmpty;

        return isfilled
          ? `<img class="star-item" id="${idx + 1}" src="${
              MOVIE_APP_IMG_PATH.starFilled
            }" alt="나의 별점" />`
          : `<img class="star-item" id="${idx + 1}" src="${
              MOVIE_APP_IMG_PATH.starEmpty
            }" alt="나의 별점" />`;
      })
      .join('');

    $('.star-evaluation-ment').textContent = `${evaluation * 2}점 ${
      STAR_MENT[evaluation]
    }`;

    this.starMent = `${evaluation * 2}점 ${STAR_MENT[evaluation]}`;

    return starImages;
  }

  initStarContainer() {
    const storaged = localStorage.getItem(String(this.movieId));

    if (storaged !== null)
      return this.renderStarContainer(Number(storaged) as StarKeyType);
    else {
      this.starMent = '0점';

      return `
      <img class="star-item" id="1" src="${MOVIE_APP_IMG_PATH.starEmpty}" alt="나의 별점" />
      <img class="star-item" id="2" src="${MOVIE_APP_IMG_PATH.starEmpty}" alt="나의 별점" />
      <img class="star-item" id="3" src="${MOVIE_APP_IMG_PATH.starEmpty}" alt="나의 별점" />
      <img class="star-item" id="4" src="${MOVIE_APP_IMG_PATH.starEmpty}" alt="나의 별점" />
      <img class="star-item" id="5" src="${MOVIE_APP_IMG_PATH.starEmpty}" alt="나의 별점" />
      `;
    }
  }

  setEvent() {
    $('.star-container').addEventListener('click', (event) => {
      this.setMyEvaluation(event);
    });
    this.addEventListener('click', (event) => {
      this.closeModal(event);
    });
  }

  setMyEvaluation(event: Event) {
    const img = event.target;

    if (img instanceof HTMLElement) {
      saveMovieRating(String(this.movieId), img.id);
    }

    this.getMyEvaluation();
  }

  getMyEvaluation() {
    const evaluation = loadMovieRating(String(this.movieId));

    this.renderStarContainer(Number(evaluation) as StarKeyType);
  }

  closeModal(event: Event) {
    if (
      event.target instanceof HTMLDialogElement &&
      event.target.id === 'modal'
    ) {
      event.target.close();
    }
  }
}
