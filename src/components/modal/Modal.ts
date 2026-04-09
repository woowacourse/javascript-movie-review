import { getOriginalImageUrl } from '../../api/renderImage';
import { MovieDetail } from '../../api/types';
import LocalStorage from '../../storage/LocalStorage';
import { $ } from '../../utils/dom';
import { Rate } from '../common/Rate';
import SubmitRate from './SubmitRate';

export default class Modal {
  #$modal: HTMLElement;
  #$body: HTMLElement;

  constructor($body: HTMLElement) {
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
          <div class="modal-image"><img /><img /></div>
          <div class="modal-description">
            <h2></h2>
            <p class="category"></p>
            <p class="rate"></p>
            <hr />
            <div class="modal-submit-star">
              <h3>내 별점</h3>
            </div>
            <hr />
            <p class="detail"></p>
          </div>
        </div>
      </div>
    `;

    $(this.#$modal, 'button').addEventListener('click', () => this.close());
  }

  get $element() {
    return this.#$modal;
  }

  #update(movie: MovieDetail) {
    const { title, release_date, overview, poster_path, genres, vote_average } = movie;

    $<HTMLImageElement>(this.#$modal, '.modal-image img').src = getOriginalImageUrl(poster_path);
    $<HTMLImageElement>(this.#$modal, '.modal-image img').alt = title;

    const $modalDesc = $(this.#$modal, '.modal-description');
    $($modalDesc, 'h2').textContent = title;

    const releaseYear = new Date(release_date).getFullYear();
    const categoryString = genres.map(({ name }) => name).join(' ');
    $($modalDesc, '.category').textContent = releaseYear + '·' + categoryString;
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

    const { id } = movie;
    const movieRate = Number(LocalStorage.getRate(`${id}`)) || 0;

    const $submitRate = new SubmitRate(movieRate, (rate) => {
      LocalStorage.saveRate(`${id}`, String(rate));
    }).$element;

    const $container = $(this.#$modal, '.modal-submit-star');
    const $oldCon = $container.querySelector('.submit-rate-container');
    if ($oldCon) $oldCon.remove();
    $container.append($submitRate);
  }

  close() {
    console.log('object');
    this.#$body.classList.remove('modal-open');
    this.#$modal.classList.remove('active');
  }
}
