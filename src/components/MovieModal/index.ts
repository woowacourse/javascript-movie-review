import './index.css';
import template from './index.html';
import { $ } from '../../utils/dom';

class MovieModal extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = template;
    const ratingWrapper = $('.rating-item-wrapper', this);
    ratingWrapper.addEventListener('click', (e: Event) => {
      if (!(e.target instanceof HTMLInputElement)) return;
      const rating = Number(e.target.value);
      const mark = $(`label[for=star${rating}`, this).getAttribute('title');
      $('.my-rating', this).textContent = `${rating * 2}점 - ${mark}`;
    });
  }
}
export default MovieModal;
