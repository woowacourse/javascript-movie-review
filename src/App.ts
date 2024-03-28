import Header from '../src/components/Header/Header';
import MovieList from '../src/components/MovieList/MovieList';
import MovieInfoModal from './components/MovieInfoModal/MovieInfoModal';
import Title from './components/Title/Title';
import { END_POINT } from './consts/URL';
import MovieDomain from './domain/entity/Movie';
import InfiniteScrollDataLoader from './domain/services/InfiniteScrollDataLoader';
import { getEndpoint, setEndpoint } from './utils/queryString';

class App {
  infiniteScrollDataLoader = new InfiniteScrollDataLoader();
  itemViewBox = document.querySelector('.item-view');
  movieListBox = document.createElement('ul');
  movieListInstance: MovieList;
  title = new Title();

  constructor() {
    this.movieListBox.classList.add('item-list');
    this.movieListBox.classList.add('grid');
    this.render();
    this.movieListInstance = new MovieList({ isLoading: true, movieList: [] });
  }

  async render() {
    this.#renderHeader();
    this.title.renderTitle();

    if (!this.itemViewBox) return;
    this.itemViewBox.append(this.movieListBox);

    setEndpoint(END_POINT.POPULAR);
    this.infiniteScrollDataLoader.renderTargetPage();
  }

  async rerenderMovieList() {
    this.title.rerenderTitle();
    this.removeExistedData();
    this.infiniteScrollDataLoader.resetPage();
    this.infiniteScrollDataLoader.renderTargetPage();
  }

  #renderHeader() {
    new Header(this.rerenderMovieList.bind(this));
  }

  removeExistedData() {
    const notFoundBox = document.querySelector('#not-found');
    if (notFoundBox) {
      notFoundBox.remove();
    }

    const itemList = document.querySelector('.item-list');
    if (!itemList) return;
    itemList.replaceChildren();

    this.resetSearchInput();
  }

  resetSearchInput() {
    const endpoint = getEndpoint();
    if (endpoint !== END_POINT.SEARCH) {
      const searchInput = document.querySelector('.search-box input') as HTMLInputElement;
      if (!searchInput) return;
      searchInput.value = '';
    }
  }
}

export default App;
