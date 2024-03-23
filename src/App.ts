import Header from '../src/components/Header/Header';
import MovieList from '../src/components/MovieList/MovieList';
import Title from './components/Title/Title';
import MovieDataLoader from './domain/services/MovieDataLoader';
import { setEndpoint } from './utils/queryString';

class App {
  movieDataLoader = new MovieDataLoader();
  itemViewBox = document.querySelector('.item-view');
  movieListBox = document.createElement('ul');
  movieListInstance: MovieList;
  title = new Title();

  constructor() {
    this.init();
    this.movieListBox.classList.add('item-list');
    this.movieListInstance = new MovieList({ isLoading: true, movieList: [] });
  }

  async init() {
    this.#renderHeader();
    this.title.renderTitle();

    if (!this.itemViewBox) return;
    this.itemViewBox.append(this.movieListBox);

    setEndpoint('popular');
    await this.renderMovieList();
  }

  async renderMovieList() {
    console.log('rear');
    this.title.rerenderTitle();
    await this.movieDataLoader.renderFirstPage();
  }

  #renderHeader() {
    new Header(this.renderMovieList.bind(this));
  }
}

export default App;
