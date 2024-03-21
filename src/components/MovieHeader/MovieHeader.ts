import SearchBox from '../SearchBox/SearchBox';
import { logo } from '../../resources';
import ItemView from '../ItemView/ItemView';
import SearchValidator from '../../domain/Validator/SearchValidator';

const MovieHeader = {
  create() {
    const header = document.createElement('header');
    const logoImgContainer = this.createLogoImgContainer();
    const searchBox = SearchBox.create();

    header.appendChild(logoImgContainer);
    header.appendChild(searchBox);

    this.setHandle(logoImgContainer, searchBox);

    document.getElementById('app')?.appendChild(header);
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
    const searchButton = searchBox.querySelector('button');
    if (searchButton) searchButton.addEventListener('click', () => this.showSearchMovies(searchBox));
    searchBox.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') this.showSearchMovies(searchBox);
    });
  },

  createItemView(inputText?: string) {
    const itemView = document.querySelector('.item-view');
    itemView?.replaceChildren();

    new ItemView(inputText);
  },

  showPopularMovies(searchBox: HTMLElement) {
    const searchBoxInput = searchBox.querySelector('input');
    if (searchBoxInput) searchBoxInput.value = '';

    this.createItemView();
  },

  showSearchMovies(searchBox: HTMLElement) {
    try {
      const trimmedSearchInputText = searchBox?.querySelector('input')?.value.replace(/ +/g, ' ').trim();
      if (trimmedSearchInputText) {
        SearchValidator.validate(trimmedSearchInputText);
      }
      this.createItemView(trimmedSearchInputText);
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
    }
  },
};

export default MovieHeader;
