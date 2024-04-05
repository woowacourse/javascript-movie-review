import SearchBox from '../SearchBox/SearchBox';
import { logo } from '../../resources';
import MovieList from '../MovieList/MovieList';
import { getDomElement } from '../../util/DOM';

const MovieHeader = {
  create() {
    const header = document.createElement('header');
    const logoImgContainer = this.createLogoImgContainer();

    header.appendChild(logoImgContainer);
    getDomElement('#app').appendChild(header);

    const searchBox = SearchBox.create();
    header.appendChild(searchBox);

    this.setHandle(logoImgContainer);
  },

  createLogoImgContainer() {
    const logoImgContainer = document.createElement('h1');
    const logoImg = document.createElement('img');

    logoImg.setAttribute('src', logo);
    logoImg.setAttribute('alt', 'MovieList 로고');

    logoImgContainer.appendChild(logoImg);

    return logoImgContainer;
  },

  setHandle(logoImgContainer: HTMLElement) {
    logoImgContainer.addEventListener('click', () => this.showPopularMovies());
  },

  createMovieList(inputText?: string) {
    const oldMovieList = getDomElement('.item-view');
    oldMovieList.replaceChildren();

    new MovieList(inputText);
  },

  showPopularMovies() {
    const searchBox = getDomElement('.search-box');
    const searchBoxInput = getDomElement<HTMLInputElement>('input', searchBox);
    searchBoxInput.value = '';

    this.createMovieList();
  },
};

export default MovieHeader;
