import { SKELETON_TEMPLATE } from '../constants';

import { $, dispatchCustomEvent } from '../utils/domUtils';

import { fetchMovieDetail, MovieDetailResponse } from '../domain/remotes/movieDetail';

class MovieListSection extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = /* html */ `
      <section class="item-view">
        <h2 id="movie-list-title">지금 인기 있는 영화</h2>
        <ul class="item-list"></ul>
        <ul class="item-list" id="skeleton-list">
        ${SKELETON_TEMPLATE}
        </ul>
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

  async handleListItemClick(e: Event) {
    e.preventDefault();

    const $target = e.target as HTMLElement;
    const $movieListItem = $target.closest('movie-list-item') as HTMLElement;

    if (!$movieListItem) return;

    const id = $movieListItem.dataset.id;
    const movieDetail = await fetchMovieDetail(Number(id));

    this.renderMovieDetailModal(movieDetail);
  }

  renderMovieDetailModal(movieDetail: MovieDetailResponse) {
    const { genres, overview } = movieDetail;
    // console.log(genres.map((genre) => genre.name).join(', '));
    // console.log(overview === '' ? '줄거리가 없습니다.' : overview);
  }
}

export default MovieListSection;
