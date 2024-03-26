import Header from '../src/components/Header/Header';
import MovieList from '../src/components/MovieList/MovieList';
import { URL } from './consts/common';
import { TITLE } from './consts/message';
import MovieDataLoader from './domain/services/MovieDataLoader';
import { getUrlParams, setUrlParams } from './utils/queryString';
import { getCurrentMode, getCurrentQuery, setDefaultPageUrl } from './utils/urlHelper';

class App {
  movieDataLoader = new MovieDataLoader();
  movieListInstance: MovieList;
  itemViewBox = document.querySelector('.item-view');
  movieListBox = document.createElement('ul');
  title = document.createElement('h2');

  constructor() {
    this.init();
    this.movieListBox.classList.add('item-list');
    this.movieListInstance = new MovieList({ isLoading: true });
  }

  async init() {
    this.browserReloadHandler();
    this.renderHeader();

    if (!this.itemViewBox) return;
    this.itemViewBox.append(this.movieListBox);

    await this.render();
  }

  async render() {
    this.removeTitle();
    this.renderTitle();
    await this.movieDataLoader.renderPage();
  }

  browserReloadHandler() {
    window.onload = () => {
      const previousMode = getCurrentMode();
      const previousQuery = getCurrentQuery();

      setUrlParams(URL.MODE, previousMode);
      setUrlParams(URL.QUERY, previousQuery);
      setUrlParams(URL.PAGES, '1');

      this.render();
    };
  }

  renderHeader() {
    new Header({
      onSearch: () => this.render(),
      onLogoClick: () => {
        setDefaultPageUrl();
        this.initSearchInput();

        return this.render();
      },
    });
  }

  initSearchInput() {
    const searchInput = document.querySelector<HTMLInputElement>('.search-box>input');
    if (!searchInput) return;

    searchInput.value = '';
  }

  renderTitle() {
    this.title.id = 'list-title';
    if (getUrlParams(URL.MODE) === 'popular') this.title.textContent = TITLE.POPULAR;
    else this.title.textContent = TITLE.SEARCH_RESULT(getCurrentQuery());

    if (!this.itemViewBox) return;
    this.itemViewBox.append(this.title);
  }

  removeTitle() {
    this.title.remove();
  }
}

export default App;
