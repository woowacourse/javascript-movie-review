import { Movie } from '../movies.type';
import store from '../store';
import Rate from './Rate';

/* eslint camelcase: ["error", {ignoreDestructuring: true}] */
class DetailModal {
  modal: HTMLDialogElement;

  constructor(private readonly movie: Movie, private readonly rate?: string) {
    this.modal = document.querySelector('.modal') as HTMLDialogElement;
    this.modal.replaceChildren();
    this.init();
  }

  // modal과 detail을 나누고. modal을 붙이되, 내용인 detail을 새로 갈아끼워준다.
  private template = ({ id, title, poster_path, overview, vote_average, genre_ids }: Movie) => `
          <div class="modal-backdrop"></div>
          <div class="modal-container" id="${id}">
              <div class="title-wrapper">
                  <p class="modal-title">${title} 
                  </p>
                  <button class="close-button">
                      <img src="assets/close.png" />
                  </button>
              </div>
              <div class="modal-card">
                  <img
                    class="modal-thumbnail skeleton"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face${poster_path}"
                    loading="lazy"
                    alt="${title}"
                  />
                  <div class="modal-info">
                      <div class="modal-genre-score">
                          <p class="modal-genres">${genre_ids.map((genreId) => {
                            return ' ' + store.getGenres(genreId);
                          })}</p>
                          <p class="modal-score"><img src="assets/star_filled.png" alt="별점" /> ${vote_average}</p>
                          <p class="modal-overview">${overview}</p>
                      </div>
                      <div class="user-score"></div>
                  </div>
              </div>
          </div>
      `;

  init() {
    this.render(this.movie);
    document.body.style.overflow = 'hidden';
    this.addEvent();
  }

  render(movie: Movie) {
    (this.modal as HTMLDialogElement).insertAdjacentHTML('beforeend', this.template(movie));
    document.querySelector('.user-score')?.insertAdjacentHTML('beforeend', Rate.template);
    if (this.rate) Rate.renderStar(this.rate);
  }

  addEvent() {
    document.querySelector('.modal-backdrop')?.addEventListener('click', this.closeModal);
    document.querySelector('.close-button')?.addEventListener('click', this.closeModal);
    Rate.listener((this.movie as Movie).id);
  }

  closeModal = () => {
    const modal = this.modal as HTMLDialogElement;
    document.body.style.removeProperty('overflow');
    modal.close();
  };
}

export default DetailModal;
