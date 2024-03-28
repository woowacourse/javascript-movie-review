import Header from '../src/components/Header/Header';
import MovieList from '../src/components/MovieList/MovieList';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import Toast from './components/Toast/Toast';
import { URL } from './consts/common';
import { TITLE } from './consts/message';
import MovieListFetcher from './domain/services/MovieListFetcher';
import { formatMovieList } from './utils/formatList';
import { setUrlParams } from './utils/queryString';
import { getCurrentMode, getCurrentPage, getCurrentQuery, increaseUrlPage, setDefaultPageUrl } from './utils/urlHelper';

class App {
  movieListInstance: MovieList;
  itemViewBox = document.querySelector('.item-view');
  movieListBox = document.createElement('ul');
  title = document.createElement('h2');

  constructor() {
    this.init();
    this.movieListBox.classList.add('item-list');
    this.movieListInstance = new MovieList({ movieList: [], isLoading: true });
  }

  async init() {
    this.browserLoadHandler();
    this.renderHeader();
    this.initTitle();

    if (!this.itemViewBox) return;
    this.itemViewBox.append(this.movieListBox);
  }

  browserLoadHandler() {
    window.addEventListener('load', async () => {
      const previousMode = getCurrentMode();
      const previousQuery = getCurrentQuery();

      setUrlParams(URL.MODE, previousMode);
      setUrlParams(URL.QUERY, previousQuery);
      setUrlParams(URL.PAGES, '1');

      await this.renderPage();
    });
  }

  renderHeader() {
    new Header({
      onSearch: () => this.renderPage(),
      onLogoClick: async () => {
        setDefaultPageUrl();
        this.initSearchInput();

        return await this.renderPage();
      },
    });
  }

  initTitle() {
    this.title.setAttribute('id', 'list-title');

    if (!this.itemViewBox) return;
    this.itemViewBox.prepend(this.title);

    this.updateTitle();
  }

  updateTitle() {
    if (getCurrentMode() === 'popular') this.title.textContent = TITLE.POPULAR;
    else this.title.textContent = TITLE.SEARCH_RESULT(getCurrentQuery());
  }

  initSearchInput() {
    const searchInput = document.querySelector<HTMLInputElement>('.search-box>input');
    if (!searchInput) return;

    searchInput.value = '';
  }

  removeExistingItems(currentPage: number) {
    const notFoundBox = document.querySelector('#not-found');
    if (notFoundBox) notFoundBox.remove();

    if (currentPage === 1) {
      const itemList = document.querySelector('.item-list');
      if (!itemList) return;
      itemList.replaceChildren();
    }

    const existingButton = document.querySelector('.button');
    if (!existingButton) return;
    existingButton.remove();

    this.movieListInstance.renderSkeleton();
  }

  async renderPage() {
    try {
      this.updateTitle();
      const movieResult = await this.fetchMovies();
      const formattedMovieList = formatMovieList(movieResult);

      const currentPage = getCurrentPage();
      const totalPage = movieResult.total_pages;
      this.removeExistingItems(currentPage);

      this.movieListInstance.newList = formattedMovieList;
      this.movieListInstance.rerender();

      if (currentPage >= totalPage) return;
      this.renderMoreButton();
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.errorHandler(error);
        new Toast(error.message);
      }
    }
  }

  errorHandler(error: Error) {
    // TODO: 각 status code 별 예외 처리 예정
  }

  fetchMovies() {
    if (getCurrentMode() === 'popular') {
      return MovieListFetcher.fetchPopularMovies();
    }
    return MovieListFetcher.fetchSearchMovies();
  }

  renderMoreButton() {
    const moreButton = new Button({
      text: '더보기',
      onClick: () => {
        increaseUrlPage();
        this.renderPage();
      },
      id: 'more-button',
    }).render();

    const container = document.querySelector('.item-view');
    if (!container) return;
    container.append(moreButton);
  }
}

export default App;
