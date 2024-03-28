import { fetchPopularMovies, fetchSearchMovies } from '../../domain/Movies/Request/sendRequest';
import { CONTAINER_TITLE } from '../../constants/INFORMATION';
import MovieItems from '../MovieItems/MovieItems';
import ResponseData from '../../interfaces/ResponseData';
import MovieitemsSkeleton from '../MovieItems/MovieItemsSkeleton';
import SearchValidator from '../../domain/Validator/SearchValidator';
import ToastPopup from '../ToastPopup/ToastPopup';
import CONDITIONS from '../../constants/CONDITIONS';
import MovieItemDetailModalInstance from '../../typeAliases/MovieItemDetailModalInstance';

class ItemView {
  #page: number = 0;
  #totalPages: number = 1;
  #searchValue: string = '';
  #itemView = document.createElement('section');
  #moiveItemDetailModal: MovieItemDetailModalInstance;

  constructor(moiveItemDetailModal: MovieItemDetailModalInstance) {
    this.#itemView.classList.add('item-view');
    this.#moiveItemDetailModal = moiveItemDetailModal;

    this.createItemView(CONTAINER_TITLE.popular);
  }

  getItemView() {
    return this.#itemView;
  }

  createItemView(itemViewTitle: string) {
    this.#page = 0;
    this.#itemView.replaceChildren();

    this.#itemView.appendChild(this.createTitle(itemViewTitle));

    this.mountItems();
  }

  createTitle(containerTitle: string) {
    const title = document.createElement('h2');

    title.textContent = containerTitle;

    return title;
  }

  async mountItems() {
    if (this.#page === this.#totalPages || this.#page === CONDITIONS.popularMoviesTotalPage) return;

    this.#page++;

    const skeleton = MovieitemsSkeleton.create();
    this.#itemView.appendChild(skeleton);

    const movieListData: ResponseData = await this.getMovieListData();
    this.#totalPages = movieListData.total_pages;

    MovieItems.replaceSkeletons({
      movieItems: skeleton,
      responseData: movieListData,
      moiveItemDetailModal: this.#moiveItemDetailModal,
    });
  }

  async getMovieListData() {
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
