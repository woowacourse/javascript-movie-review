import Header from '../src/components/Header/Header';
import MovieList from '../src/components/MovieList/MovieList';
import Button from './components/Button/Button';
import Toast from './components/Toast/Toast';
import { URL } from './consts/common';
import { TITLE } from './consts/message';
import MovieListFetcher from './domain/services/MovieListFetcher';
import { formatMovieList } from './utils/formatList';
import { setUrlParams } from './utils/queryString';
import { getCurrentMode, getCurrentPage, getCurrentQuery, increaseUrlPage, setDefaultPageUrl } from './utils/urlHelper';
import './App.css';

class App {
  movieListInstance: MovieList;
  itemViewBox = document.querySelector('.item-view');
  title = document.createElement('h2');
  moreButton;

  constructor() {
    this.browserLoadHandler();
    this.renderHeader();
    this.initTitle();

    this.movieListInstance = new MovieList();
    this.renderMoreButton();

    this.moreButton = document.querySelector('#more-button');
    if (!this.moreButton) return;
    this.moreButton.classList.add('hidden');

    this.observeInfinityScroll();
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
    if (currentPage === 1) {
      const itemList = document.querySelector('.item-list');
      if (!itemList) return;
      itemList.replaceChildren();
    }
  }

  async renderPage() {
    try {
      if (!this.moreButton) return;
      this.moreButton.classList.add('hidden');

      this.updateTitle();
      const movieResult = await this.fetchMovies();
      const formattedMovieList = formatMovieList(movieResult);

      const currentPage = getCurrentPage();
      const totalPage = movieResult.total_pages;
      this.removeExistingItems(currentPage);

      this.movieListInstance.renderMovieList(formattedMovieList);

      if (currentPage >= totalPage) this.moreButton.classList.add('hidden');
      else this.moreButton.classList.remove('hidden');
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

  observeInfinityScroll() {
    if (!this.moreButton) return;

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!this.moreButton) return;

          this.moreButton.classList.add('hidden');
          increaseUrlPage();
          this.renderPage();
        }
      });
    });

    io.observe(this.moreButton);
  }
}

export default App;
