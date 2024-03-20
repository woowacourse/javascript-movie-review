import { fetchPopularMovieList, fetchSearchMovieList } from '../../AppController';
import { LAST_PAGE } from '../../constants/constant';

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
    const title = document.querySelector('h2')!;
    if (!title) return;
    title.textContent = this.#title;

    const ul = document.querySelector('.item-list')!;
    if (!ul) return;
    ul.replaceChildren();

    const lastPage = await this.updateMovieList();
    const addButton = document.querySelector('.btn.primary.full-width')!;

    addButton.addEventListener('click', async () => {
      if (this.hasNextPage(lastPage)) {
        this.plusCurrentPage();
        await this.updateMovieList();
      } else {
        addButton.classList.add('none');
      }
    });
  }

  plusCurrentPage() {
    this.#currentPage += 1;
  }

  hasNextPage(lastPage: number) {
    if (this.#currentPage === (lastPage < LAST_PAGE ? lastPage : LAST_PAGE)) {
      return false;
    }
    return true;
  }

  async updateMovieList() {
    switch (this.#getName) {
      case 'popular':
        console.log(this.#currentPage);
        return await fetchPopularMovieList(this.#currentPage);
      case 'search':
        return await fetchSearchMovieList(this.#inputValue, this.#currentPage);
      default:
        return await fetchPopularMovieList(this.#currentPage);
    }
  }
}
