// Import necessary dependencies and constants
import { fetchPopularMovieList, fetchSearchMovieList } from '../../apis/getMovieData';
import { SETTING, VIEW_TYPE } from '../../constants/constant';
import setupIntersectionObserver from '../../utils/setupIntersectionObserver';
import view from '../../view/view';
import Skeleton from '../skeleton/skeleton';

class MovieListWrapper {
  #currentPage;
  #isLoading;

  #title;
  #viewType;
  #inputValue;

  constructor(title, viewType, inputValue = '') {
    this.#currentPage = 1;
    this.#isLoading = false;
    this.#title = title;
    this.#viewType = viewType;
    this.#inputValue = inputValue;
  }

  async create() {
    const itemView = document.querySelector('.item-view');
    itemView.replaceChildren();

    const title = document.createElement('h2');
    title.textContent = this.#title;

    const itemList = document.createElement('ul');
    itemList.className = 'item-list';
    itemList.replaceChildren();
    itemList.innerHTML = Skeleton();

    const endList = document.createElement('div');
    endList.className = 'end-list';

    itemView.append(title, itemList, endList);

    this.infiniteScroll();
  }

  infiniteScroll() {
    const endList = document.querySelector('.end-list');

    const onIntersect = async (entries) => {
      entries.forEach(async entry => {
        if (entry.isIntersecting && !this.#isLoading) {
          this.#isLoading = true;
          view.showSkeleton();
          const result = await this.getMovieList();

          if (result) {
            const [movies, totalPages] = result;
            view.hideSkeleton();
            if (this.shouldStopObserving(movies, totalPages)) return;
            view.renderMovieCard(movies);
            this.#isLoading = false;
            this.plusPage();
          }
        }
      });
    };

    setupIntersectionObserver(onIntersect, endList)
  }

  async getMovieList() {
    switch (this.#viewType) {
      case VIEW_TYPE.POPULAR:
        return await fetchPopularMovieList(this.#currentPage);
      case VIEW_TYPE.SEARCH:
        return await fetchSearchMovieList(this.#inputValue, this.#currentPage);
      default:
        return;
    }
  }

  plusPage() {
    this.#currentPage++;
  }
  
  hasNextPage(totalPages) {
    return this.#currentPage <= Math.min(totalPages, SETTING.LAST_PAGE);
  }

  shouldStopObserving(movies, totalPages) {
    if (this.#viewType === VIEW_TYPE.SEARCH){
      if(this.#currentPage === 1 && !movies.length && totalPages == 1) {
        view.noMovieResult();
        return true
      }
    }
    return !this.hasNextPage(totalPages)
  }
}

export default MovieListWrapper;
