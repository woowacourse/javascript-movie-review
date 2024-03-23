import { fetchPopularMovies, fetchSearchMovies } from '../../domain/DTO/Request/sendRequest';
import { BUTTONS, CONTAINER_TITLE } from '../../constants/INFORMATION';
import Button from '../Button/Button';
import MovieItems from '../MovieItems/MovieItems';
import ResponseData from '../../interfaces/ResponseData';
import MovieitemsSkeleton from '../MovieItems/MovieItemsSkeleton';
import SearchValidator from '../../domain/Validator/SearchValidator';
import ToastPopup from '../ToastPopup/ToastPopup';

class ItemView {
  #page: number;
  #itemView = document.createElement('section');

  constructor() {
    this.#page = 0;
    this.#itemView.classList.add('item-view');

    this.createItemView(CONTAINER_TITLE.popular);
  }

  getItemView() {
    return this.#itemView;
  }

  createItemView(itemViewTitle: string, search?: string) {
    this.#page = 0;
    this.#itemView.replaceChildren();

    const button = Button.create(BUTTONS.showMore, () => this.mountItems(button, search));

    this.#itemView.appendChild(this.createTitle(itemViewTitle));
    this.#itemView.appendChild(button);

    this.mountItems(button, search);
  }

  createTitle(containerTitle: string) {
    const title = document.createElement('h2');

    title.textContent = containerTitle;

    return title;
  }

  async mountItems(button: HTMLElement, search?: string) {
    const skeleton = MovieitemsSkeleton.create();
    button.insertAdjacentElement('beforebegin', skeleton);

    const movieListData: ResponseData = await this.getMovieListData(search);
    MovieItems.replaceSkeletons(skeleton, movieListData);

    if (this.#page === movieListData.total_pages || this.#page === 500) {
      button.remove();
    }
  }

  async getMovieListData(search?: string) {
    if (search) {
      return await fetchSearchMovies(++this.#page, search);
    }
    return await fetchPopularMovies(++this.#page);
  }

  showPopularMovies() {
    const searchBoxInput = document.querySelector('input');
    if (searchBoxInput) searchBoxInput.value = '';

    this.createItemView(CONTAINER_TITLE.popular);
  }

  showSearchMovies() {
    try {
      const trimmedSearchInputText = document.querySelector('input')?.value.replace(/ +/g, ' ').trim();

      if (trimmedSearchInputText)
        this.createItemView(`"${trimmedSearchInputText}"${CONTAINER_TITLE.searchResult}`, trimmedSearchInputText);
      if (!trimmedSearchInputText) SearchValidator.validate();
    } catch (e) {
      if (e instanceof Error) ToastPopup(e.message);
    }
  }
}

export default ItemView;
