import './index.css';
import template from './index.html';
import { $ } from '../../utils/dom';
import { DetailMovie } from '../../types';

class MovieModal extends HTMLElement {
  movieId: number;
  rating: number;

  constructor() {
    super();
    this.movieId = 0;
    this.rating = 0;
  }

  connectedCallback() {
    this.innerHTML = template;
  }

  render(movie: DetailMovie) {
    const { id, title, voteAverage, overview, genres, posterPath } = movie;
    const genre = genres.map((genre) => genre.name).join(', ');
    this.movieId = id;
    this.innerHTML = template
      .replace('{title}', title)
      .replace('{genre}', genre)
      .replace('{overview}', overview)
      .replace('{voteAverage}', String(voteAverage))
      .replace('{posterPath}', posterPath);

    this.initModal();
    this.rateMovie();
    this.close();
  }

  initModal() {
    this.rating = Number(localStorage.getItem(String(this.movieId)));
    if (this.rating !== 0) {
      const input = $<HTMLInputElement>(`input[id=star${this.rating}]`, this);
      input.checked = true;
      this.creatRatingTemplate();
    }
  }

  rateMovie() {
    const ratingWrapper = $<HTMLDivElement>('.rating-item-wrapper', this);
    ratingWrapper.addEventListener('click', (e: Event) => {
      if (!(e.target instanceof HTMLInputElement)) return;
      this.rating = Number(e.target.value);
      this.creatRatingTemplate();
    });
  }

  creatRatingTemplate() {
    const mark = $(`label[for=star${this.rating}`, this).getAttribute('title');
    $('.my-rating', this).textContent = `${this.rating * 2}점 - ${mark}`;
  }

  close() {
    const $modalContainer = $<HTMLDivElement>('.modal-container', this);

    window.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        $modalContainer.classList.add('hidden');
      }
    });

    $modalContainer.addEventListener('click', (e) => {
      if (!(e.target instanceof HTMLElement)) return;
      const target = e.target.closest('div');
      if (!target) return;
      if (target.className === 'modal-close-button' || target.className === 'modal-container') {
        $modalContainer.classList.add('hidden');
      }
    });
  }

  open() {
    $<HTMLDivElement>('.modal-container', this).classList.remove('hidden');
  }
}
export default MovieModal;
