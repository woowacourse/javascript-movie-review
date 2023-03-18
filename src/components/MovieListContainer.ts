import { $ } from '../utils/domSelector';
import MovieListContent from './MovieListContent';

const MovieListContainer = {
  template() {
    return `
      <section class="item-view">
        <h2 id="movie-list-title">지금 인기 있는 영화</h2>
        <ul class="item-list"></ul>
        <button id="more-button" class="btn primary full-width">더 보기</button>
      </section>
      <div class="error-message hide"></div>
    `;
  },

  addEventToMoreButton() {
    $<HTMLButtonElement>('#more-button').addEventListener('click', () => {
      MovieListContent.loadMoreMovies();
    });
  },

  changeContainerTitle(title?: string) {
    $<HTMLHeadingElement>('#movie-list-title').textContent = title
      ? `"${title}" 검색 결과`
      : '지금 인기 있는 영화';
  },

  showListContainer() {
    $<HTMLDivElement>('.item-view').classList.remove('hide');
  },

  hideListContainer() {
    $<HTMLDivElement>('.item-view').classList.add('hide');
  },

  showMoreButton() {
    $<HTMLButtonElement>('#more-button').classList.remove('hide');
  },

  hideMoreButton() {
    $<HTMLButtonElement>('#more-button').classList.add('hide');
  },

  clearInvalidMessageContainer() {
    $<HTMLDivElement>('.error-message').textContent = '';
  },
};

export default MovieListContainer;
