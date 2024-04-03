import { fetchPopularMovies, fetchSearchMovies } from '../../domain/Movies/Request/sendRequest';
import { CONTAINER_TITLE } from '../../constants/INFORMATION';
import MovieItems from '../MovieItems/MovieItems';
import ResponseData from '../../interfaces/ResponseData';
import MovieitemsSkeleton from '../Skeleton/MovieItemsSkeleton/MovieItemsSkeleton';
import SearchValidator from '../../domain/Validator/SearchValidator';
import ToastPopup from '../ToastPopup/ToastPopup';
import CONDITIONS from '../../constants/CONDITIONS';
import MovieItemDetailModalInstance from '../../typeAliases/MovieItemDetailModalInstance';
import throttle from '../../utils/throttle';
import './ItemView.css';

class ItemView {
  #page: number = 0;
  #totalPages: number = 1;
  #searchValue: string = '';
  #itemView = document.createElement('section');
  #itemList = document.createElement('ul');
  #moiveItemDetailModal: MovieItemDetailModalInstance;

  constructor(moiveItemDetailModal: MovieItemDetailModalInstance) {
    this.#itemView.classList.add('item-view');
    this.#itemList.classList.add('item-list');

    this.#moiveItemDetailModal = moiveItemDetailModal;

    this.createItemView(CONTAINER_TITLE.popular);
  }

  getItemView() {
    return this.#itemView;
  }

  createItemView(itemViewTitle: string) {
    this.#page = 0;
    this.#itemView.replaceChildren();
    this.#itemList.replaceChildren();

    this.#itemView.appendChild(this.createTitle(itemViewTitle));
    this.#itemView.appendChild(this.#itemList);

    this.createMovieItems();
    this.setScrollHandler();
  }

  setScrollHandler() {
    window.addEventListener(
      'scroll',
      throttle(() => {
        if (window.innerHeight + window.scrollY + CONDITIONS.supplement >= document.body.offsetHeight)
          this.createMovieItems();
      }, 1000),
    );
  }

  createTitle(containerTitle: string) {
    const title = document.createElement('h2');

    title.textContent = containerTitle;

    return title;
  }

  createSkeleton() {
    const skeleton = MovieitemsSkeleton.create();
    const skeletonList = skeleton.querySelectorAll('li');

    this.#itemList.appendChild(skeleton);

    return skeletonList;
  }

  async createMovieItems() {
    if (this.#page === this.#totalPages || this.#page === CONDITIONS.popularMoviesTotalPage) return;

    const skeletonList = this.createSkeleton();

    const moviesData: ResponseData = await this.getMoviesData();
    this.#totalPages = moviesData.total_pages;

    MovieItems.replaceSkeletons({
      skeletonList,
      moviesData,
      moiveItemDetailModal: this.#moiveItemDetailModal,
      itemList: this.#itemList,
    });
  }

  async getMoviesData() {
    this.#page++;

    if (this.#searchValue) {
      return await fetchSearchMovies(this.#page, this.#searchValue);
    }
    return await fetchPopularMovies(this.#page);
  }

  showPopularMovies() {
    this.#searchValue = '';

    const searchBoxInput = document.querySelector('input');
    if (searchBoxInput) searchBoxInput.value = this.#searchValue;

    this.createItemView(CONTAINER_TITLE.popular);
  }

  showSearchMovies() {
    try {
      const trimmedSearchInputText = document.querySelector('input')?.value.replace(/ +/g, ' ').trim();

      if (trimmedSearchInputText) {
        this.#searchValue = trimmedSearchInputText;

        this.createItemView(`"${trimmedSearchInputText}"${CONTAINER_TITLE.searchResult}`);
      }
      if (!trimmedSearchInputText) SearchValidator.validate();
    } catch (e) {
      if (e instanceof Error) ToastPopup(e.message);
    }
  }
}

export default ItemView;
