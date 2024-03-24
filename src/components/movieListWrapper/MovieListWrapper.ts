import { fetchPopularMovieList, fetchSearchMovieList } from '../../apis/fetchData';
import { LAST_PAGE } from '../../constants/constant';
import { showSkeleton, updateCard } from '../movieCard/movieCard';

export class MovieListWrapper {
  #currentPage;
  #title;
  #getName;
  #inputValue;

  constructor(title: string, getName: string, inputValue = '') {
    this.#currentPage = 1;
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

    const addButton: HTMLButtonElement = document.createElement('button');
    addButton.className = 'btn primary full-width';
    addButton.textContent = '더 보기';

    section.append(title, ul);

    await this.selectUpdatingMovieType(addButton);

    section.appendChild(addButton);

    addButton.addEventListener('click', async () => {
      await this.selectUpdatingMovieType(addButton);
    });
  }

  plusCurrentPage() {
    this.#currentPage += 1;
  }

  async selectUpdatingMovieType(addButton: HTMLButtonElement) {
    const liList = this.loadMovieList();
    switch (this.#getName) {
      case 'popular':
        {
          const result = await fetchPopularMovieList(this.#currentPage);
          if (!result) return;
          this.updateMoviesCardList(liList, result, addButton);
          if (result[2] === 0) {
            this.displayNoResultsMessage();
          }
        }
        return;
      case 'search':
        {
          const result = await fetchSearchMovieList(this.#inputValue, this.#currentPage);
          if (!result) return;
          this.updateMoviesCardList(liList, result, addButton);
          if (result[2] === 0) {
            this.displayNoResultsMessage();
          }
        }
        return;
      default: {
        const result = await fetchPopularMovieList(this.#currentPage);
        if (!result) return;
        this.updateMoviesCardList(liList, result, addButton);
        if (result[2] === 0) {
          this.displayNoResultsMessage();
        }
      }
    }
  }
  updateMoviesCardList(liList: any, result: any, addButton: HTMLButtonElement) {
    const [movies, totalPages] = result;
    if (Math.min(totalPages, LAST_PAGE) <= this.#currentPage) {
      addButton.classList.add('none');
    }
    this.plusCurrentPage();
    this.completeMovieList(liList, movies);
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

  completeMovieList(liList: any, movies: any) {
    movies.forEach((movie: any, index: any) => {
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
    this.#currentPage = 1;
    await this.create();
  }
}
