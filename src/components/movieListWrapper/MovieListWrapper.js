import { fetchPopularMovieList, fetchSearchMovieList } from '../../apis/fetchData';
import { LAST_PAGE, VIEW_TYPE } from '../../constants/constant';
import view from '../../view/view';
import { createSkeleton } from '../skeleton/skeleton';

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
    const itemView = document.querySelector('.item-view');
    itemView.replaceChildren()

    const title = document.createElement('h2');
    title.textContent = this.#title;

    const itemList = document.createElement('ul')
    itemList.className = 'item-list';
    itemList.replaceChildren();
    itemList.innerHTML = (createSkeleton());

    const showMoreButton = document.createElement('button');
    showMoreButton.className = 'show-more-btn btn primary full-width';
    showMoreButton.textContent = '더 보기';

    itemView.append(title, itemList, showMoreButton)

    await this.updateMovieList(showMoreButton);
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
    view.showSkeleton()
    const result = await fetchPopularMovieList(this.#currentPage);
    if (result) {
      console.log(result)
      view.hideSkeleton()
      const [movies, totalPages] = result;
      if (LAST_PAGE <= this.#currentPage) {
        showMoreButton.classList.add('none');
      }
      view.renderMovieCard(movies);
    }
  }

  async updateSearchMovieList(showMoreButton) {
    view.showSkeleton()
    const result = await fetchSearchMovieList(this.#inputValue, this.#currentPage);
    if (result) {
      view.hideSkeleton()
      const [movies, totalPages] = result;
      if (!movies.length && totalPages == 1) {
        view.noMovieResult()
      }
      if (Math.min(totalPages, LAST_PAGE) <= this.#currentPage) {
        showMoreButton.classList.add('none');
      }
      view.renderMovieCard(movies);
    }
  }
}

export default MovieListWrapper;