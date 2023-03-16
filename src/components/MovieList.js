import MovieCard from './MovieCard';

import MovieHandler from '../domain/MovieHandler';

import errorImg from '../assets/error.jpg';

const headerTemplate = {
  popular() {
    return '지금 인기 있는 영화';
  },

  search(query) {
    return `"${query}" 검색 결과`;
  },
};

const errorTemplate = (errorCode) => {
  return `
  <div class="error-container">
    <h1>죄송합니다. 영화 목록을 불러올 수 없습니다. 관리자에게 문의하세요. (error code: ${errorCode})</h1>
    <img src=${errorImg} class="error-img" />
  </div>`;
};

export default class MovieList {
  $element;
  #getMovieMetaData;

  constructor($parent, { getMovieMetaData }) {
    this.$element = document.createElement('section');
    this.$element.className = 'item-view';
    this.#getMovieMetaData = getMovieMetaData;

    $parent.insertAdjacentElement('beforeend', this.$element);
  }

  render(option, query) {
    this.$element.innerHTML = this.template(option, query);
    this.setEvent();
  }

  template(option, query) {
    return /* html */ `
    <h2>${headerTemplate[option](query)}</h2>     
    <ul class="item-list"></ul> 
    <ul class="skeleton-item-list item-list hide">
      ${this.getSkeletonCardsHTML(20)}
    </ul>
    <button id="more-button" class="btn primary full-width">더 보기</button>`;
  }

  async renderMovieCards(movieListPromise) {
    const movieList = await movieListPromise;

    const movieCardsHTML = movieList.reduce((html, movie) => {
      const movieCard = MovieCard(movie);

      return html + movieCard;
    }, '');

    this.$element.querySelector('.item-list').insertAdjacentHTML('beforeend', movieCardsHTML);
  }

  getSkeletonCardsHTML(count) {
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
    this.$element.querySelector('.skeleton-item-list').classList.remove('hide');
  }

  hideSkeletonList() {
    this.$element.querySelector('.skeleton-item-list').classList.add('hide');
  }

  setEvent() {
    this.$element.querySelector('#more-button').addEventListener('click', this.load.bind(this));
  }

  async load() {
    this.showSkeletonList();
    const { moviesData, page, totalPages, errorCode } = await this.#getMovieMetaData();

    if (errorCode) {
      this.hideSkeletonList();
      this.$element.innerHTML = errorTemplate(errorCode);

      return;
    }

    const movieList = MovieHandler.convertMovieList(moviesData);

    this.judgeButtonState(page, totalPages);

    this.hideSkeletonList();

    this.renderMovieCards(movieList);
  }

  judgeButtonState(page, totalPages) {
    page === totalPages && this.hideMoreButton();
  }

  hideMoreButton() {
    this.$element.querySelector('#more-button').classList.add('hide');
  }
}
