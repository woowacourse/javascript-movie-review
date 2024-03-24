import { fetchPopularMovieList, fetchSearchMovieList } from '../../apis/fetchData';
import { LAST_PAGE } from '../../constants/constant';
import { completeMovieList, loadMovieList } from '../../domain/MovieService';

class MovieListWrapper {
  #currentPage
  #title
  #getName
  #inputValue

  constructor(title, getName, inputValue = '') {
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

    const showMoreButton = document.createElement('button');
    showMoreButton.className = 'btn primary full-width';
    showMoreButton.textContent = '더 보기';

    section.append(title, ul);

    await this.updateMovieList(showMoreButton);

    section.appendChild(showMoreButton);

    showMoreButton.addEventListener('click', async () => {
      await this.updateMovieList(showMoreButton);
    });
  }

  plusCurrentPage() {
    this.#currentPage += 1;
  }

  hasNextPage(lastPage) {
    if (this.#currentPage === (lastPage < LAST_PAGE ? lastPage : LAST_PAGE)) {
      return false;
    }
    return true;
  }

  async updateMovieList(showMoreButton) {
    switch (this.#getName) {
      case 'popular':
        {
          const liList = loadMovieList();
          const result = await fetchPopularMovieList(this.#currentPage);
          if (result) {
            const [movies, totalPages] = result;
            if (LAST_PAGE <= this.#currentPage) {
              showMoreButton.classList.add('none');
            }
            this.plusCurrentPage();
            completeMovieList(liList, movies);
          } else {
            showMoreButton.classList.add('none');
          }
        }
        return;
      case 'search':
        {
          const result = await fetchSearchMovieList(this.#inputValue, this.#currentPage);
          if (result) {
            const liList = loadMovieList();
            const [movies, totalPages] = result;
            if (Math.min(totalPages, LAST_PAGE) <= this.#currentPage) {
              showMoreButton.classList.add('none');
            }
            this.plusCurrentPage();
            completeMovieList(liList, movies);
          } else {
            showMoreButton.classList.add('none');
          }
        }
        return;
      default: {
        const liList = loadMovieList();
        const result = await fetchPopularMovieList(this.#currentPage);
        if (result) {
          const [movies, totalPages] = result;
          if (totalPages === this.#currentPage) {
            showMoreButton.classList.add('none');
          }
          this.plusCurrentPage();
          completeMovieList(liList, movies);
        } else {
          showMoreButton.classList.add('none');
        }
      }
    }
  }
}

export default MovieListWrapper
