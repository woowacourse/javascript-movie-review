import Header from '../src/components/Header/Header';
import MovieList from '../src/components/MovieList/MovieList';
import Title from './components/Title/Title';
import TopButton from './components/TopButton/TopButton';
import { END_POINT } from './consts/URL';
import InfiniteScrollDataLoader from './domain/services/InfiniteScrollDataLoader';
import { getEndpoint, setEndpoint } from './utils/queryString';

class App {
  infiniteScrollDataLoader = new InfiniteScrollDataLoader();
  itemViewBox = document.querySelector('.item-view')!;
  movieListBox = document.createElement('ul');
  movieListInstance: MovieList;
  title = new Title();

  constructor() {
    this.movieListBox.classList.add('item-list');
    this.movieListBox.classList.add('grid');
    this.movieListInstance = new MovieList({ movieList: [] });
    this.itemViewBox.append(this.movieListBox);

    this.renderFirstPage();
    new TopButton();
  }

  async renderFirstPage() {
    this.renderHeader();

    this.title.renderTitle();
    this.movieListInstance.renderSkeleton();
    this.infiniteScrollDataLoader.renderTargetPage();
  }

  async rerenderMovieList() {
    this.title.renderTitle();
    this.removeExistedData();
    this.infiniteScrollDataLoader.resetPage();
    this.movieListInstance.renderSkeleton();
    this.infiniteScrollDataLoader.renderTargetPage();
  }

  renderHeader() {
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
