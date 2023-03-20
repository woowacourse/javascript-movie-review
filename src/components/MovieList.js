import MovieCard from './MovieCard';

import errorImg from '../assets/error.jpg';

const headerTemplate = {
  popular() {
    return '지금 인기 있는 영화';
  },

  search(query) {
    return `"${query}" 검색 결과`;
  },
};

const errorTemplate = (statusCode, statusMessage) => {
  return `
  <div class="error-container">
    <h1 class="error-heading">죄송합니다. 영화 목록을 불러올 수 없습니다. 관리자에게 문의해주세요.</h1>
    <p class="error-code">error code: ${statusCode}</p>
    <p class="error-message">error message: ${statusMessage}</p>
    <img class="error-img" src=${errorImg} alt="error-img" />
  </div>`;
};

export default class MovieList {
  $element;
  #onClickMoreButton;

  constructor($parent, { onClickMoreButton }) {
    this.$element = document.createElement('section');
    this.$element.className = 'item-view';
    this.#onClickMoreButton = onClickMoreButton;

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

  setEvent() {
    this.$element.querySelector('#more-button').addEventListener('click', this.#onClickMoreButton.bind(this));
  }

  renderListContent(movieMetaData) {
    if (!movieMetaData.isOk) {
      const { statusCode, statusMessage } = movieMetaData;

      this.hideSkeletonList();
      this.renderErrorTemplate(statusCode, statusMessage);

      return;
    }

    const { movieList, page, totalPages } = movieMetaData;

    if (this.isLastPage(page, totalPages)) {
      this.hideMoreButton();
    }

    this.hideSkeletonList();
    this.renderMovieCards(movieList);
  }

  renderErrorTemplate(statusCode, statusMessage) {
    this.$element.innerHTML = errorTemplate(statusCode, statusMessage);
  }

  renderMovieCards(movieList) {
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

  isLastPage(page, totalPages) {
    return page === totalPages;
  }

  showSkeletonList() {
    this.$element.querySelector('.skeleton-item-list').classList.remove('hide');
  }

  hideSkeletonList() {
    this.$element.querySelector('.skeleton-item-list').classList.add('hide');
  }

  hideMoreButton() {
    this.$element.querySelector('#more-button').classList.add('hide');
  }
}
