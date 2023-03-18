import { $ } from '../utils/domSelector';
import MovieListContent from './MovieListContent';

class MovieListContainer {
  private listContainer: HTMLDivElement;
  private movieTitle: HTMLHeadingElement;
  private moreButton: HTMLButtonElement;

  constructor() {
    $<HTMLElement>('main').insertAdjacentHTML('beforeend', this.template());
    this.listContainer = $<HTMLDivElement>('.item-view');
    this.movieTitle = $<HTMLHeadingElement>('#movie-list-title');
    this.moreButton = $<HTMLButtonElement>('#more-button');
    this.addEventToMoreButton();
  }

  template() {
    return `
      <section class="item-view">
        <h2 id="movie-list-title">지금 인기 있는 영화</h2>
        <ul class="item-list"></ul>
        <button id="more-button" class="btn primary full-width">더 보기</button>
      </section>
      <div class="error-message hide"></div>
    `;
  }

  addEventToMoreButton() {
    this.moreButton.addEventListener('click', () => {
      MovieListContent.loadMoreMovies();
    });
  }

  changeContainerTitle(title?: string) {
    this.movieTitle.textContent = title ? `"${title}" 검색 결과` : '지금 인기 있는 영화';
  }

  showListContainer() {
    this.listContainer.classList.remove('hide');
  }

  hideListContainer() {
    this.listContainer.classList.add('hide');
  }

  showMoreButton() {
    this.moreButton.classList.remove('hide');
  }

  hideMoreButton() {
    this.moreButton.classList.add('hide');
  }
}

export default new MovieListContainer();
