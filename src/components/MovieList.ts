import MovieCard from './MovieCard';
import errorImg from '../assets/error.jpg';
import { Movie } from '../type/Movie';
import { Component } from '../type/Component';
import { popularMovieDataFetchFuncGenerator, searchedMovieDataFetchFuncGenerator } from '../api/get';

const HEADER_TEMPLATE = {
  POPULAR: '지금 인기 있는 영화',
  SEARCH: (query: string) => `"${query}" 검색 결과`,
};

const ERROR_TEMPLATE = (errorCode: number) => /* html */ `
  <div class="error-container">
    <h1>죄송합니다. 영화 목록을 불러올 수 없습니다. 관리자에게 문의하세요. (error code: ${errorCode})</h1>
    <img class="error-img" src=${errorImg} >
  </div>`;

const NO_RESULT_TEMPLATE = /* html */ `
  <div>
    <p>검색 결과를 찾을 수 없습니다.</p>
  </div>
`;

export default class MovieList implements Component {
  $element;
  #getMovieMetaData;
  #renderModal;
  #isLastPage;
  #observer;

  constructor($parent: Element, renderModal: (movie: Movie) => void) {
    this.$element = document.createElement('section');
    this.$element.className = 'item-view';
    this.#getMovieMetaData = popularMovieDataFetchFuncGenerator();
    this.#renderModal = renderModal;
    this.#isLastPage = false;
    this.#observer = new IntersectionObserver(this.infiniteScroll.bind(this), { threshold: 1 });

    $parent.insertAdjacentElement('beforeend', this.$element);
  }

  setPopularMovieDataFetchFunc() {
    this.#getMovieMetaData = popularMovieDataFetchFuncGenerator();

    this.#isLastPage = false;
  }

  setSearchedMovieDataFetchFunc(query: string) {
    this.#getMovieMetaData = searchedMovieDataFetchFuncGenerator(query);

    this.#isLastPage = false;
  }

  render(query?: string) {
    this.$element.innerHTML = this.template(query);

    this.load();

    this.observeLastItem(this.#observer);
  }

  template(query?: string) {
    return /* html */ `
    <h2>${query ? HEADER_TEMPLATE.SEARCH(query) : HEADER_TEMPLATE.POPULAR}</h2>     
    <ul class="item-list"></ul> 
    <ul class="skeleton-item-list item-list hide">
      ${this.getSkeletonCardsHTML(20)}
    </ul>
    <div id="end-list"></div>`;
  }

  renderMovieCards(movieList: Movie[]) {
    if (!movieList.length) {
      (<HTMLUListElement>this.$element.querySelector('.item-list')).innerHTML = NO_RESULT_TEMPLATE;
      return;
    }

    const $itemList = <HTMLUListElement>this.$element.querySelector('.item-list');
    const $tempList = document.createElement('ul');
    $tempList.replaceChildren(...$itemList.childNodes);

    const fragment = new DocumentFragment();
    fragment.appendChild($tempList);

    movieList.forEach((movie) => {
      new MovieCard($tempList, movie, this.#renderModal).render();
    });

    (<HTMLUListElement>this.$element.querySelector('.item-list')).replaceChildren(...$tempList.childNodes);
  }

  getSkeletonCardsHTML(count: number) {
    const skeletonCardHTML = `
    <li>
      <div class="item-card">
        <div class="item-thumbnail skeleton"></div>
        <div class="item-title skeleton"></div>
        <div class="item-score skeleton"></div>
      </div>
    </li>`;

    return skeletonCardHTML.repeat(count);
  }

  showSkeletonList() {
    (<HTMLUListElement>this.$element.querySelector('.skeleton-item-list')).classList.remove('hide');
  }

  hideSkeletonList() {
    (<HTMLUListElement>this.$element.querySelector('.skeleton-item-list')).classList.add('hide');
  }

  async load() {
    if (this.#isLastPage) return;

    this.showSkeletonList();
    const data = await this.#getMovieMetaData();

    if (!data.isSuccess) {
      this.hideSkeletonList();
      this.$element.innerHTML = ERROR_TEMPLATE(data.errorCode);

      return;
    }

    this.#isLastPage = data.page === data.totalPages;

    this.hideSkeletonList();

    this.renderMovieCards(data.movieList);
  }

  observeLastItem(observer: IntersectionObserver) {
    const lastItem = <Element>this.$element.querySelector('#end-list');

    observer.observe(lastItem);
  }

  infiniteScroll(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);

        this.load();

        this.observeLastItem(observer);
      }
    });
  }
}
