import { fetchPopularMovieList, fetchSearchMovieList } from '../../apis/fetchData';
import { LAST_PAGE, VIEW_TYPE } from '../../constants/constant';
import movieList from '../../view/movieList';

class MovieListWrapper {
  #currentPage
  #title
  #viewType
  #inputValue

  constructor(title, viewType, inputValue = '') {
    this.#currentPage = 1;
    this.#title = title;
    this.#viewType = viewType;
    this.#inputValue = inputValue;
  }

  async create() {
    const section = document.querySelector('.item-view');
    section.replaceChildren();

    const title = document.createElement('h2');
    title.textContent = this.#title;

    const ul = document.createElement('ul');
    ul.className = 'item-list';
    ul.replaceChildren();

    const showMoreButton = document.createElement('button');
    showMoreButton.className = 'show-more-btn btn primary full-width';
    showMoreButton.textContent = '더 보기';

    section.append(title, ul);

    await this.updateMovieList(showMoreButton);

    section.appendChild(showMoreButton);

    showMoreButton.addEventListener('click', async () => {
      this.#currentPage += 1;
      await this.updateMovieList(showMoreButton);
    });
  }

  async updateMovieList(showMoreButton) {
    switch (this.#viewType) {
      case VIEW_TYPE.POPULAR:
        await this.updatePopularMovieList(showMoreButton);
        break;
      case VIEW_TYPE.SEARCH:
        await this.updateSearchMovieList(showMoreButton);
        break;
    }
  }

  async updatePopularMovieList(showMoreButton) {
    const liList = movieList.loading();
    const result = await fetchPopularMovieList(this.#currentPage);
    if (result) {
      const [movies, totalPages] = result;
      if (LAST_PAGE <= this.#currentPage) {
        showMoreButton.classList.add('none');
      }
      movieList.completed(liList, movies);
    }
  }

  async updateSearchMovieList(showMoreButton) {
    const liList = movieList.loading();
    const result = await fetchSearchMovieList(this.#inputValue, this.#currentPage);
    if (result) {
      const [movies, totalPages] = result;
      if (!movies.length && totalPages == 1) {
        movieList.none()
      }
      if (Math.min(totalPages, LAST_PAGE) <= this.#currentPage) {
        showMoreButton.classList.add('none');
      }
      movieList.completed(liList, movies);
    }
  }
}

export default MovieListWrapper;