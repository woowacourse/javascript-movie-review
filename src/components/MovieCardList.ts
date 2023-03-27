import { TOGGLE_SKELETON } from '../constant/movie';
import { $ } from '../utils/Dom';
import SkeletonList from './SkeletonList';

export default class MovieCardList extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  get header() {
    return this.getAttribute('header');
  }

  render() {
    this.innerHTML = /*html*/ `
        <h1>${this.header}</h1>
        <ul id="movie-list" class="item-list">
        </ul>
        <skeleton-list class="hidden"></skeleton-list> 
        `;
  }

  setMovieList(movieList: MovieList) {
    const $movieList = $('#movie-list');
    if ($movieList instanceof HTMLElement)
      movieList.forEach((item: MovieInfo) => {
        $movieList.insertAdjacentHTML(
          'beforeend',
          `<movie-card movie-title='${item.title}' poster='${item.poster}' rating='${item.rating}' movie-id='${item.movieId}'>
          </movie-card>`,
        );
      });
  }

  toggleSkeletonList(method: ToggleSkeleton) {
    const $skeletonList = $('skeleton-list');
    if ($skeletonList instanceof SkeletonList)
      method === TOGGLE_SKELETON.HIDDEN
        ? $skeletonList.classList.add('hidden')
        : $skeletonList.classList.remove('hidden');
  }
}

customElements.define('card-list', MovieCardList);
