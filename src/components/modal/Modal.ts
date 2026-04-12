import { getOriginalImageUrl } from '../../api/renderImage';
import { MovieDetail } from '../../api/types';
import { MovieStore } from '../../storage/types';
import { $ } from '../../utils/dom';
import { Star } from '../common/Star';
import SubmitRate from './SubmitRate';

export default class Modal {
  #movieStore: MovieStore;

  #$modal: HTMLElement;
  #$body: HTMLElement;

  constructor(movieRepo: MovieStore, $body: HTMLElement) {
    this.#movieStore = movieRepo;
    this.#$body = $body;

    this.#$modal = document.createElement('div');
    this.#$modal.id = 'modalBackground';
    this.#$modal.className = 'modal-background';
    this.#$modal.innerHTML = /*html */ `
      <div class="modal">
        <button class="close-modal" id="closeModal">
          <img src="./images/modal_button_close.png" />
        </button>
        <div class="modal-container">
          <div class="modal-image"><img /></div>
          <div class="modal-description">
            <h2></h2>
            <p class="category"></p>
            <div class="rate"></div>
            <hr />
            <div class="modal-submit-star">
              <h3>내 별점</h3>
            </div>
            <hr />
            <div>
              <h3>줄거리</h3>
              <p class="detail"></p>
            </div>
          </div>
        </div>
      </div>
    `;

    $(this.#$modal, 'button').addEventListener('click', () => this.close());
    window.addEventListener('keydown', (e) => {
      if ((e as KeyboardEvent).key === 'Escape') {
        this.close();
      }
    });
  }

  get $element() {
    return this.#$modal;
  }

  #update(movie: MovieDetail) {
    const { title, release_date, overview, poster_path, genres, vote_average } = movie;

    $<HTMLImageElement>(this.#$modal, '.modal-image img').src = getOriginalImageUrl(poster_path);
    $(this.#$modal, 'h2').textContent = title;

    const overViewString = overview ? overview : '줄거리 데이터가 없습니다';
    $(this.#$modal, '.detail').textContent = overViewString;

    const releaseYear = new Date(release_date).getFullYear();
    const category = genres.map((g) => g.name).join(' ');
    $(this.#$modal, '.category').textContent = `${releaseYear} · ${category}`;

    const $rateContainer = $(this.#$modal, '.rate');
    $rateContainer.innerHTML = '';

    const $starIcon = Star(true);
    const $score = document.createElement('span');
    $score.textContent = `평균 ${Number(vote_average).toFixed(1)}`;

    $rateContainer.append($starIcon, $score);
  }

  async open(movie: MovieDetail) {
    this.#$body.className = 'modal-open';
    this.#$modal.classList.add('active');
    this.#update(movie);

    const { id } = movie;
    const movieRate = Number(await this.#movieStore.get(`${id}`)) || 0;

    const $submitRate = new SubmitRate(movieRate, async (rate) => {
      await this.#movieStore.save(`${id}`, String(rate));
    }).$element;

    const $container = $(this.#$modal, '.modal-submit-star');
    const $oldCon = $container.querySelector('.submit-rate-container');
    if ($oldCon) $oldCon.remove();
    $container.append($submitRate);
  }

  close() {
    this.#$body.classList.remove('modal-open');
    this.#$modal.classList.remove('active');
  }
}
