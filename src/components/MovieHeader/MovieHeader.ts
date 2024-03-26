import SearchBox from '../SearchBox/SearchBox';
import { logo } from '../../resources';
import MovieList from '../MovieList/MovieList';
import SearchValidator from '../../domain/Validator/SearchValidator';
import ToastPopup from '../ToastPopup/ToastPopup';
import { getDomElement } from '../../util/DOM';

const MovieHeader = {
  create() {
    const header = document.createElement('header');
    const logoImgContainer = this.createLogoImgContainer();
    const searchBox = SearchBox.create();

    header.appendChild(logoImgContainer);
    header.appendChild(searchBox);

    this.setHandle(logoImgContainer, searchBox);

    getDomElement('#app').appendChild(header);
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
    logoImgContainer.addEventListener('click', () => this.showPopularMovies(searchBox));
    const searchButton = getDomElement('button', searchBox);
    searchButton.addEventListener('click', () => this.showSearchMovies(searchBox));
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
      if (e instanceof Error) ToastPopup(e.message);
    }
  },
};

export default MovieHeader;
