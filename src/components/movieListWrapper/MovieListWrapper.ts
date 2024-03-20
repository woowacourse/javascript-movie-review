import { fetchPopularMovieList, fetchSearchMovieList } from '../../apis/fetchData';
import { LAST_PAGE } from '../../constants/constant';
import { completeMovieList, loadMovieList } from '../../domain/MovieService';

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

    const addButton = document.createElement('button');
    addButton.className = 'btn primary full-width';
    addButton.textContent = '더 보기';

    section.append(title, ul, addButton);

    await this.updateMovieList(addButton);

    addButton.addEventListener('click', async () => {
      await this.updateMovieList(addButton);
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

  async updateMovieList(addButton: any) {
    switch (this.#getName) {
      case 'popular':
        {
          const liList = loadMovieList();

          const result = await fetchPopularMovieList(this.#currentPage);
          if (result) {
            const [movies, totalPages] = result;
            if (totalPages === this.#currentPage) {
              addButton.classList.add('none');
            }
            this.plusCurrentPage();
            completeMovieList(liList, movies);
          }
        }
        return;
      case 'search':
        {
          const liList = loadMovieList();
          const result = await fetchSearchMovieList(this.#inputValue, this.#currentPage);
          if (result) {
            const [movies, totalPages] = result;
            if (totalPages === this.#currentPage) {
              addButton.classList.add('none');
            }
            this.plusCurrentPage();
            completeMovieList(liList, movies);
          }
        }
        return;
      default: {
        const liList = loadMovieList();

        const result = await fetchPopularMovieList(this.#currentPage);
        if (result) {
          const [movies, totalPages] = result;
          if (totalPages === this.#currentPage) {
            addButton.classList.add('none');
          }
          this.plusCurrentPage();
          completeMovieList(liList, movies);
        }
      }
    }
  }
}
