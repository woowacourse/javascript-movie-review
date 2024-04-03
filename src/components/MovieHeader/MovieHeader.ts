import SearchBox from '../SearchBox/SearchBox';
import { logo } from '../../resources';
import MovieList from '../MovieList/MovieList';
import SearchValidator from '../../domain/Validator/SearchValidator';
import ToastPopup from '../ToastPopup/ToastPopup';
import { getDomElement } from '../../util/DOM';
import ResizeHandler from '../../util/ResizeHandler';

const MovieHeader = {
  create() {
    const header = document.createElement('header');
    const logoImgContainer = this.createLogoImgContainer();
    const searchBox = SearchBox.create();

    header.appendChild(logoImgContainer);
    header.appendChild(searchBox);
    ResizeHandler.mobileViewAddClass(getDomElement('input', searchBox), 'hidden');
    getDomElement('#app').appendChild(header);

    this.setHandle(logoImgContainer, searchBox);
  },

  createLogoImgContainer() {
    const logoImgContainer = document.createElement('h1');
    const logoImg = document.createElement('img');

    logoImg.setAttribute('src', logo);
    logoImg.setAttribute('alt', 'MovieList 로고');

    logoImgContainer.appendChild(logoImg);

    return logoImgContainer;
  },

  setHandle(logoImgContainer: HTMLElement, searchBox: HTMLElement) {
    const headerLogo = getDomElement('h1');
    const searchButton = getDomElement('button', searchBox);
    const searchInput = getDomElement('input', searchBox);
    const computedStyles = window.getComputedStyle(searchInput);

    window.addEventListener('resize', () => {
      ResizeHandler.mobileViewAddClass(searchInput, 'hidden');
      ResizeHandler.mobileViewRemoveClass(searchInput, 'hidden');
    });
    logoImgContainer.addEventListener('click', () => this.showPopularMovies(searchBox));

    searchButton.addEventListener('click', () => {
      if (computedStyles.display === 'none') {
        ResizeHandler.mobileViewRemoveClass(searchInput, 'hidden');
        ResizeHandler.mobileViewAddClass(headerLogo, 'hidden');
        searchInput.focus();
      } else {
        this.showSearchMovies(searchBox);
      }
    });

    searchInput.addEventListener('blur', () => {
      const computedStyles = window.getComputedStyle(headerLogo);
      if (computedStyles.display === 'none') {
        setTimeout(() => {
          ResizeHandler.mobileViewAddClass(searchInput, 'hidden');
          ResizeHandler.mobileViewRemoveClass(headerLogo, 'hidden');
        }, 300);
      }
    });

    searchBox.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.showSearchMovies(searchBox);
      }
    });
  },

  createMovieList(inputText?: string) {
    const oldMovieList = getDomElement('.item-view');
    oldMovieList.replaceChildren();

    new MovieList(inputText);
  },

  showPopularMovies(searchBox: HTMLElement) {
    const searchBoxInput = getDomElement<HTMLInputElement>('input', searchBox);
    searchBoxInput.value = '';

    this.createMovieList();
  },

  showSearchMovies(searchBox: HTMLElement) {
    try {
      const trimmedSearchInputText = getDomElement<HTMLInputElement>('input', searchBox).value.replace(/ +/g, ' ');
      SearchValidator.validate(trimmedSearchInputText.trim());
      this.createMovieList(trimmedSearchInputText);
    } catch (e) {
      if (e instanceof Error) ToastPopup(e.message, 2500);
    }
  },
};

export default MovieHeader;
