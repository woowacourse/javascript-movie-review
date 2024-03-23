import SearchBox from '../SearchBox/SearchBox';
import { logo } from '../../resources';
import ItemView from '../ItemView/ItemView';
import SearchValidator from '../../domain/Validator/SearchValidator';
import ToastPopup from '../ToastPopup/ToastPopup';

const MovieHeader = {
  create() {
    const header = document.createElement('header');
    const logoImgContainer = this.createLogoImgContainer();
    const searchBox = SearchBox.create(() => this.showSearchMovies());

    header.appendChild(logoImgContainer);
    header.appendChild(searchBox);

    return header;
  },

  createLogoImgContainer() {
    const logoImgContainer = document.createElement('h1');
    const logoImg = document.createElement('img');

    logoImg.setAttribute('src', logo);
    logoImg.setAttribute('alt', 'MovieList 로고');

    logoImgContainer.appendChild(logoImg);
    logoImgContainer.addEventListener('click', () => this.showPopularMovies());

    return logoImgContainer;
  },

  createItemView(inputText?: string) {
    const itemView = document.querySelector('.item-view');
    itemView?.replaceChildren();

    new ItemView(inputText);
  },

  showPopularMovies() {
    const searchBoxInput = document.querySelector('input');
    if (searchBoxInput) searchBoxInput.value = '';

    this.createItemView();
  },

  showSearchMovies() {
    const searchBox = document.querySelector('.search-box');
    try {
      const trimmedSearchInputText = searchBox?.querySelector('input')?.value.replace(/ +/g, ' ').trim();

      if (trimmedSearchInputText) this.createItemView(trimmedSearchInputText);
      if (!trimmedSearchInputText) SearchValidator.validate();
    } catch (e) {
      if (e instanceof Error) ToastPopup(e.message);
    }
  },
};

export default MovieHeader;
