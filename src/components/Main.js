import { $ } from '../util/querySelector';
import { MovieItem } from './MovieItem';
import movieSkeleton from './MovieSkeleton';

const SKELETON_ITEM_COUNT = 20;

class Main {
  #element;
  #manager;

  constructor(element, manager) {
    this.#element = element;
    this.#manager = manager;

    this.#requestMovieListEvent();

    this.#element.innerHTML = `
    <h2></h2>
    <ul class="item-list"></ul>
    `;
  }

  renderSkeleton(element) {
    const query = this.#manager.getQuery();

    $('h2', element).innerHTML =
      query === '' ? '지금 인기 있는 영화' : `"${query}" 검색 결과`;
    $('ul', element).appendChild(document.createElement('div'));

    const skeletonElement = $('ul', element).lastElementChild;
    skeletonElement.outerHTML = movieSkeleton().repeat(SKELETON_ITEM_COUNT);
  }

  async render() {
    const query = this.#manager.getQuery();

    if (query === '' && !this.#manager.getMovieList().length) {
      this.renderSkeleton(this.#element);
      await this.#manager.searchMovieList('');
    } else if (this.#manager.getCurrentPage() === 1) {
      this.renderSkeleton(this.#element);
      await this.#manager.searchMovieList(query);
    }

    const movieListData = this.#manager.getMovieList();

    this.#element.innerHTML = `
    <h2>${query === '' ? '지금 인기 있는 영화' : `"${query}" 검색 결과`}</h2>
    <ul class="item-list"> </ul>
    ${
      this.#manager.isLastPage()
        ? ''
        : '<button class="btn primary full-width">더 보기</button>'
    }
    `;

    if (movieListData.length) {
      movieListData.forEach((data) => {
        MovieItem($('ul', this.#element), data);
      });
    } else {
      const tempElement = document.createElement('div');
      tempElement.className = 'temp';
      $('ul.item-list').appendChild(tempElement);
      $('.temp').outerHTML = '<p>검색 결과가 없습니다.</p>';
    }
  }

  #requestMovieListEvent() {
    this.#element.addEventListener('click', async (e) => {
      if (e.target.tagName === 'BUTTON') {
        this.renderSkeleton(this.#element);
        await this.#manager.getMoreMovieList();
        this.render();
      }
    });
  }
}

export default Main;
