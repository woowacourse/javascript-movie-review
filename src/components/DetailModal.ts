import { ratingComment } from '../constants';
import { Movie } from '../movies.type';
import store from '../store';
import { setLocalStorage } from '../util/LocalStorage';

/* eslint camelcase: ["error", {ignoreDestructuring: true}] */
class DetailModal {
  constructor(private readonly movie: Movie, private readonly rate?: string) {
    this.init();
  }

  private template = ({ id, title, poster_path, overview, vote_average, genre_ids }: Movie) => `
      <div class="modal"> 
          <div class="modal-backdrop"></div>
          <div class="modal-container" id="${id}">
              <p class="modal-title">${title} <button class="close-button"></button></p>
              <div class="modal-card">
                  <img
                    class="modal-thumbnail"
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
                      <div class="user-score">
                          <div class="star-wrapper">
                          <p>내 별점</p> 
                              <span class="star">
                                  <img src="assets/star_empty.png" alt="별점" />
                                  <img src="assets/star_empty.png" alt="별점" />
                                  <img src="assets/star_empty.png" alt="별점" />
                                  <img src="assets/star_empty.png" alt="별점" />
                                  <img src="assets/star_empty.png" alt="별점" />
                                  <span>
                                      <img src="assets/star_filled.png" alt="별점" />
                                      <img src="assets/star_filled.png" alt="별점" />
                                      <img src="assets/star_filled.png" alt="별점" />
                                      <img src="assets/star_filled.png" alt="별점" />
                                      <img src="assets/star_filled.png" alt="별점" />
                                  </span>
                                  <input type="range" value="2" step="2" min="2" max="10">
                              </span>
                          </div>
                          <p class="rating-text"></p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      `;

  init() {
    this.render(this.movie);
    this.addEvent();
  }

  render(movie: Movie) {
    document.querySelector('main')?.insertAdjacentHTML('afterend', this.template(movie));
    this.renderStar();
  }

  renderStar() {
    if (this.rate) {
      (document.querySelector('.star span') as HTMLImageElement).style.width = `${
        Number(this.rate) * 10
      }%`;

      (document.querySelector('.rating-text') as HTMLParagraphElement).textContent =
        this.ratingText(this.rate);
    }
  }

  addEvent() {
    document.querySelector('.modal-backdrop')?.addEventListener('click', this.closeModal);
    document.querySelector('.modal-button')?.addEventListener('click', this.closeModal);
    const starInput = document.querySelector('.star input');
    const starSpan = document.querySelector('.star span');
    starInput?.addEventListener('input', () => {
      (starSpan as HTMLImageElement).style.width = `${
        Number((starInput as HTMLInputElement).value) * 10
      }%`;
      this.saveRate();
      (document.querySelector('.rating-text') as HTMLParagraphElement).textContent =
        this.ratingText((document.querySelector('.star input') as HTMLInputElement)?.value);
    });
  }

  closeModal = () => {
    const modal: HTMLDivElement = document.querySelector('.modal')!;
    modal.remove();
  };

  saveRate() {
    setLocalStorage(
      String(this.movie.id),
      JSON.stringify((document.querySelector('.star input') as HTMLInputElement)?.value),
    );
  }

  ratingText(rate: string) {
    return window.outerWidth > 480 ? rate + ' ' + ratingComment[Number(rate)] : rate;
  }
}

export default DetailModal;
