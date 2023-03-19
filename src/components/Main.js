import { $ } from '../util/querySelector';
import Movie from './Movie';
import MovieSkeleton from './MovieSkeleton';

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
    const skeleton = new MovieSkeleton();

    $('h2', element).innerHTML =
      query === '' ? '지금 인기 있는 영화' : `"${query}" 검색 결과`;
    $('ul', element).appendChild(document.createElement('div'));

    const skeletonElement = $('ul', element).lastElementChild;
    skeletonElement.outerHTML = skeleton.template().repeat(SKELETON_ITEM_COUNT);
  }

  async render() {
    const movie = new Movie();
    const query = this.#manager.getQuery();

    if (query === '' && !this.#manager.getMovieList().length) {
      this.renderSkeleton(this.#element);
      await this.#manager.searchMovieList('');
    } else if (this.#manager.getCurrentPage() === 1) {
      this.renderSkeleton(this.#element);
      await this.#manager.searchMovieList(query);
    }

    this.#element.innerHTML = `
    <h2>${query === '' ? '지금 인기 있는 영화' : `"${query}" 검색 결과`}</h2>
    <ul class="item-list">
    ${
      this.#manager.getMovieList().length
        ? this.#manager
            .getMovieList()
            .map((movieInfo) => movie.template(movieInfo))
            .join('\n')
        : '<p>검색 결과가 없습니다.</p>'
    }
    </ul>
    ${
      this.#manager.isLastPage()
        ? ''
        : '<button class="btn primary full-width">더 보기</button>'
    }
    `;
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
