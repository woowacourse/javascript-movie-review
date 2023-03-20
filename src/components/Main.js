import Movie from './Movie';
import MovieSkeleton from './MovieSkeleton';

const SKELETON_ITEM_COUNT = 20;
const skeleton = document.createDocumentFragment();
for (let i = 0; i < SKELETON_ITEM_COUNT; i += 1) {
  skeleton.appendChild(MovieSkeleton.makeNode());
}

class Main {
  #element;
  #manager;
  #title;
  #list;
  #button;

  constructor (element, manager) {
    this.#element = element;
    this.#manager = manager;

    this.#initializeElement();
    this.#requestMovieListEvent();
  }

  renderSkeleton () {
    const query = this.#manager.getQuery();

    this.#title.textContent = query ? `"${query}" 검색 결과` : '지금 인기 있는 영화';
    this.#list.appendChild(skeleton.cloneNode(true));
  }

  async render () {
    const movie = new Movie();
    const query = this.#manager.getQuery();

    if (query === '' && !this.#manager.getMovieList().length) {
      this.renderSkeleton();
      await this.#manager.searchMovieList('');
    } else if (this.#manager.getCurrentPage() === 1) {
      this.#list.replaceChildren();
      this.renderSkeleton();
      await this.#manager.searchMovieList(query);
    }

    this.#title.textContent = query ? `"${query}" 검색 결과` : '지금 인기 있는 영화';
    this.#list.replaceChildren();

    const movieListFragment = document.createDocumentFragment();
    const movieList = this.#manager.getMovieList();

    if (!movieList.length) {
      const noSearchResult = document.createElement('p');
      noSearchResult.textContent = '검색 결과가 없습니다.';

      movieListFragment.appendChild(noSearchResult);
    }

    movieList.forEach((movieInfo) => movieListFragment.appendChild(movie.makeNode(movieInfo)));

    this.#list.appendChild(movieListFragment);

    if (this.#manager.isLastPage()) {
      this.#button.dataset.hidden = 'true';
    } else {
      this.#button.dataset.hidden = 'false';
    }
  }

  #initializeElement () {
    const title = document.createElement('h2');

    const list = document.createElement('ul');
    list.setAttribute('class', 'item-list');

    const button = document.createElement('button');
    button.setAttribute('class', 'btn primary full-width');
    button.textContent = '더 보기';

    this.#title = title;
    this.#list = list;
    this.#button = button;

    this.#element.appendChild(title);
    this.#element.appendChild(list);
    this.#element.appendChild(button);
  }

  #requestMovieListEvent () {
    this.#element.addEventListener('click', async (e) => {
      if (e.target.tagName === 'BUTTON') {
        this.renderSkeleton();
        await this.#manager.getMoreMovieList();
        this.render();
      }
    });
  }
}

export default Main;
