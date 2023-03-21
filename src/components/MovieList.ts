import MovieCard from './MovieCard';

import MovieHandler from '../domain/MovieHandler';

import errorImg from '../assets/error.jpg';
import { Movie } from '../type/Movie';

type options = 'popular' | 'search';

const HEADER_TEMPLATE = {
  POPULAR: '지금 인기 있는 영화',
  SEARCH: (query: string) => `"${query}" 검색 결과`,
};

const ERROR_TEMPLATE = (errorCode: number) => {
  return `
  <div class="error-container">
    <h1>죄송합니다. 영화 목록을 불러올 수 없습니다. 관리자에게 문의하세요. (error code: ${errorCode})</h1>
    <img class="error-img" src=${errorImg} />
  </div>`;
};

export default class MovieList {
  $element;
  #getMovieMetaData;

  constructor($parent: Element, getMovieMetaData: () => Promise<any>) {
    this.$element = document.createElement('section');
    this.$element.className = 'item-view';
    this.#getMovieMetaData = getMovieMetaData;

    $parent.insertAdjacentElement('beforeend', this.$element);
  }

  render(option: options, query: string) {
    this.$element.innerHTML = this.template(option, query);
    this.setEvent();
  }

  template(option: options, query: string) {
    return /* html */ `
    <h2>${option === 'popular' ? HEADER_TEMPLATE.POPULAR : HEADER_TEMPLATE.SEARCH(query)}</h2>     
    <ul class="item-list"></ul> 
    <ul class="skeleton-item-list item-list hide">
      ${this.getSkeletonCardsHTML(20)}
    </ul>
    <button id="more-button" class="btn primary full-width">더 보기</button>`;
  }

  async renderMovieCards(movieListPromise: Movie[]) {
    const movieList = await movieListPromise;

    const movieCardsHTML = movieList.reduce((html: string, movie: Movie) => {
      const movieCard = MovieCard(movie);

      return html + movieCard;
    }, '');

    (<HTMLUListElement>this.$element.querySelector('.item-list')).insertAdjacentHTML('beforeend', movieCardsHTML);
  }

  getSkeletonCardsHTML(count: number) {
    const skeletonCardHTML = `
    <li>
      <a href="#">
        <div class="item-card">
          <div class="item-thumbnail skeleton"></div>
          <div class="item-title skeleton"></div>
          <div class="item-score skeleton"></div>
        </div>
      </a>
    </li>`;

    return skeletonCardHTML.repeat(count);
  }

  showSkeletonList() {
    (<HTMLUListElement>this.$element.querySelector('.skeleton-item-list')).classList.remove('hide');
  }

  hideSkeletonList() {
    (<HTMLUListElement>this.$element.querySelector('.skeleton-item-list')).classList.add('hide');
  }

  setEvent() {
    (<HTMLButtonElement>this.$element.querySelector('#more-button')).addEventListener('click', this.load.bind(this));
  }

  async load() {
    this.showSkeletonList();
    const { moviesData, page, totalPages, errorCode } = await this.#getMovieMetaData();

    if (errorCode) {
      this.hideSkeletonList();
      this.$element.innerHTML = ERROR_TEMPLATE(errorCode);

      return;
    }

    const movieList = MovieHandler.convertMovieList(moviesData);

    this.judgeButtonState(page, totalPages);

    this.hideSkeletonList();

    this.renderMovieCards(movieList);
  }

  judgeButtonState(page: number, totalPages: number) {
    page === totalPages && this.hideMoreButton();
  }

  hideMoreButton() {
    (<HTMLButtonElement>this.$element.querySelector('#more-button')).classList.add('hide');
  }
}
