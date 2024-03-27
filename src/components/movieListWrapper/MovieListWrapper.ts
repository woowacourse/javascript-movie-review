import { fetchPopularMovieList, fetchSearchMovieList } from '../../apis/fetchData';
import PageService from '../../domain/PageService';
import { Movie, MovieAPIResponse } from '../../interface/Movie';
import InfiniteScroll from '../../utils/InfiniteScroll';
import { showSkeleton, updateCard } from '../movieCard/movieCard';

export class MovieListWrapper {
  #currentPage;
  #title;
  #getName;
  #inputValue;

  constructor(title: string, getName: string, inputValue = '') {
    this.#currentPage = new PageService();
    this.#title = title;
    this.#getName = getName;
    this.#inputValue = inputValue;
  }

  async create() {
    const section = document.querySelector('.item-view');
    if (!section) return;
    section.replaceChildren();

    const title = document.createElement('h2');
    title.textContent = this.#title;

    const ul = document.createElement('ul');
    ul.className = 'item-list';
    ul.replaceChildren();

    const addLayerDiv: HTMLElement = document.createElement('div');

    section.append(title, ul);
    section.appendChild(addLayerDiv);
    const observe = new InfiniteScroll(addLayerDiv, this.selectUpdatingMovieType.bind(this));
    observe.observeIntersection();

    await this.selectUpdatingMovieType(observe);
  }

  async selectUpdatingMovieType(observe: InfiniteScroll) {
    const liList = this.loadMovieList();
    if (!liList) return;
    switch (this.#getName) {
      case 'popular':
        {
          const result = await fetchPopularMovieList(this.#currentPage.getCurrentPage());
          if (!result) return;
          this.updateMoviesCardList(liList, result, observe);
          if (result[2] === 0) {
            this.displayNoResultsMessage();
          }
        }
        return;
      case 'search':
        {
          const result = await fetchSearchMovieList(this.#inputValue, this.#currentPage.getCurrentPage());
          if (!result) return;
          this.updateMoviesCardList(liList, result, observe);
          if (result[2] === 0) {
            this.displayNoResultsMessage();
          }
        }
        return;
      default: {
        const result: MovieAPIResponse = await fetchPopularMovieList(this.#currentPage.getCurrentPage());
        if (!result) return;
        this.updateMoviesCardList(liList, result, observe);
        if (result[2] === 0) {
          this.displayNoResultsMessage();
        }
      }
    }
  }
  updateMoviesCardList(liList: HTMLElement[], result: MovieAPIResponse, observe: InfiniteScroll) {
    const [movies, totalPages] = result;
    this.#currentPage.nextPage();
    this.completeMovieList(liList, movies);
    if (this.#currentPage.isPageInRange(totalPages)) {
      observe.unobserve();
    }
  }

  displayNoResultsMessage() {
    const section = document.querySelector('.item-view');
    if (!section) return;
    const ul = section?.querySelector('ul');
    const totalResult = document.createElement('h3');
    totalResult.className = 'no-result';
    totalResult.textContent = '현재 검색결과가 존재하지 않습니다.';
    section?.appendChild(totalResult);
    ul?.remove();
  }

  completeMovieList(liList: HTMLElement[], movies: Movie[]) {
    movies.forEach((movie: Movie, index) => {
      updateCard(liList[index], movie);
    });
    document.querySelectorAll('li.skeleton').forEach(element => {
      element.remove();
    });
  }

  loadMovieList() {
    const itemList = document.querySelector('.item-list');
    if (!itemList) return;
    const liList = Array.from({ length: 20 }, () => showSkeleton());
    itemList.append(...liList);
    return liList;
  }

  async updateView(title: string, getName: string, inputValue = '') {
    this.#title = title;
    this.#getName = getName;
    this.#inputValue = inputValue;
    this.#currentPage.resetPage();
    await this.create();
  }
}
