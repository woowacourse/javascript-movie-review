import { BUTTON } from '../../constants/INFORMATION';
import SearchValidator from '../../domain/Validator/SearchValidator';
import { getDomElement } from '../../util/DOM';
import ResizeHandler from '../../util/ResizeHandler';
import Button from '../Button/Button';
import MovieHeader from '../MovieHeader/MovieHeader';
import ToastPopup from '../ToastPopup/ToastPopup';

const SearchBox = {
  create() {
    const searchBox = document.createElement('div');
    const searchInput = this.createSearchInput();
    const searchButton = this.createSearchButton();
    searchBox.classList.add('search-box');

    searchBox.appendChild(searchInput);
    searchBox.appendChild(searchButton);

    ResizeHandler.mobileViewAddClass(getDomElement('input', searchBox), 'hidden');

    this.setHandle(searchBox);

    return searchBox;
  },

  createSearchInput() {
    const searchInput = document.createElement('input');

    searchInput.setAttribute('type', 'text');
    searchInput.setAttribute('placeholder', '검색');

    return searchInput;
  },

  createSearchButton() {
    return Button.create(BUTTON.search);
  },

  setHandle(searchBox: HTMLElement) {
    const searchButton = getDomElement('button', searchBox);
    const searchInput = getDomElement('input', searchBox);
    const computedStyles = window.getComputedStyle(searchInput);
    const headerLogo = getDomElement('h1');

    window.addEventListener('resize', () => {
      ResizeHandler.mobileViewAddClass(searchInput, 'hidden');
      ResizeHandler.mobileViewRemoveClass(searchInput, 'hidden');
    });

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

  showSearchMovies(searchBox: HTMLElement) {
    try {
      const trimmedSearchInputText = getDomElement<HTMLInputElement>('input', searchBox).value.replace(/ +/g, ' ');
      SearchValidator.validate(trimmedSearchInputText.trim());
      MovieHeader.createMovieList(trimmedSearchInputText);
    } catch (e) {
      if (e instanceof Error) ToastPopup(e.message, 2500);
    }
  },
};

export default SearchBox;
