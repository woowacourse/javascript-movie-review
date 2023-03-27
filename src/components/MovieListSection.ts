import MovieDetailModal from './MovieDetailModal';

import CustomModal from './common/CustomModal';

import { $, dispatchCustomEvent } from '../utils/domUtils';

import { fetchMovieDetail } from '../domain/remotes/movieDetail';

class MovieListSection extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = /* html */ `
      <section class="item-view">
        <h2 id="movie-list-title">지금 인기 있는 영화</h2>
        <ul class="item-list"></ul>
        <div id="scroll-observer"></div>
      </section>
    `;
  }

  connectedCallback() {
    $('#load-more')?.addEventListener('click', () => dispatchCustomEvent(this, 'loadMore'));
    $('.item-list')?.addEventListener('click', (e) => {
      this.handleListItemClick(e);
    });
  }

  handleListItemClick(e: Event) {
    e.preventDefault();

    const $target = e.target as HTMLElement;
    const $movieListItem = $target.closest('movie-list-item') as HTMLElement;

    if (!$movieListItem) return;

    const id = $movieListItem.dataset.id;

    this.renderMovieDetailModal(Number(id));
  }

  renderMovieDetailModal(movieId: number) {
    const $modalContainer = $('.modal-container');
    if (!$modalContainer) return;
    $modalContainer.innerHTML = `<movie-detail-modal></movie-detail-modal>`;

    const $customModal = $('custom-modal') as CustomModal;
    $customModal.openModal();

    this.fetchMovieDetail(movieId);
  }

  async fetchMovieDetail(movieId: number) {
    const $movieDetailModal = $('movie-detail-modal') as MovieDetailModal;
    $movieDetailModal.showSkeleton();
    const movieDetail = await fetchMovieDetail(movieId);
    $movieDetailModal.render(movieDetail);
  }
}

export default MovieListSection;
