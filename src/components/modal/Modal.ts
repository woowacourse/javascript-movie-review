import { getOriginalImageUrl } from '../../api/renderImage';
import { MovieDetail } from '../../api/types';
import { $ } from '../../utils/dom';
import { Rate } from '../common/Rate';
import { Star } from '../common/Star';
import SubmitRate from './SubmitRate';

export default class Modal {
  #$modal: HTMLElement;
  #$body: HTMLElement;

  #$submitRate: HTMLElement;

  constructor($body: HTMLElement) {
    this.#$body = $body;

    this.#$modal = document.createElement('div');
    this.#$modal.id = 'modalBackground';
    this.#$modal.className = 'modal-background';
    this.#$modal.innerHTML = /*html*/ `
      <div class="modal">
        <button class="close-modal" id="closeModal">
          <img src="./images/modal_button_close.png" />
        </button>
        <div class="modal-container">
          <div class="modal-image"><img><img/></div>
          <div class="modal-submit-star"></div>
          <div class="modal-description">
            <h2></h2>
            <p class="category"></p>
            <p class="rate">
            </p>
            <hr />
            <p class="detail"></p>
          </div>
        </div>
      </div>
    `;

    this.#$submitRate = new SubmitRate().$element;
    $(this.#$modal, '.modal-description .rate').after(this.#$submitRate);
    $(this.#$modal, 'button').addEventListener('click', () => this.close());
  }

  get $element() {
    return this.#$modal;
  }

  #update(movie: MovieDetail) {
    const { title, overview, poster_path, genres, vote_average } = movie;

    $<HTMLImageElement>(this.#$modal, '.modal-image img').src = getOriginalImageUrl(poster_path);
    $<HTMLImageElement>(this.#$modal, '.modal-image img').alt = title;

    const $modalDesc = $(this.#$modal, '.modal-description');
    $($modalDesc, 'h2').textContent = title;

    $($modalDesc, '.category').textContent = genres.map(({ name }) => name).join(' ');
    const $rate = $($modalDesc, '.rate');
    const $newRate = Rate(vote_average, true);

    const $average = document.createElement('span');
    $average.className = 'average-info';
    $average.textContent = '평균';
    $newRate.prepend($average);

    $modalDesc.replaceChild($newRate, $rate);

    $($modalDesc, '.detail').textContent = overview;
  }

  open(movie: MovieDetail) {
    this.#$body.className = 'modal-open';
    this.#$modal.classList.add('active');
    this.#update(movie);
  }

  close() {
    console.log('object');
    this.#$body.classList.remove('modal-open');
    this.#$modal.classList.remove('active');
  }
}
