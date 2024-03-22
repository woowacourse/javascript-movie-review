import Header from '../src/components/Header/Header';
import MovieList from '../src/components/MovieList/MovieList';
import { TITLE } from './consts/message';
import MovieDataLoader from './domain/services/MovieDataLoader';

class App {
  movieDataLoader = new MovieDataLoader();
  itemViewBox = document.querySelector('.item-view');
  movieListBox = document.createElement('ul');
  title = document.createElement('h2');
  movieListInstance: MovieList;

  constructor() {
    this.init();
    this.movieListBox.classList.add('item-list');
    this.movieListInstance = new MovieList({ isLoading: true, movieList: [] });
  }

  async init() {
    this.renderHeader();
    this.renderTitle();

    if (!this.itemViewBox) return;
    this.itemViewBox.append(this.movieListBox);

    await this.renderMovieList();
  }

  async renderMovieList() {
    this.removeTitle();
    this.renderTitle();
    await this.movieDataLoader.renderFirstPage();
  }

  renderHeader() {
    new Header(this.renderMovieList.bind(this));
  }

  renderTitle(query?: string) {
    this.title.id = 'list-title';
    if (!query) this.title.textContent = TITLE.POPULER;
    else this.title.textContent = TITLE.SEARCH_RESULT(query);

    if (!this.itemViewBox) return;
    this.itemViewBox.append(this.title);
  }

  removeTitle() {
    this.title.remove();
  }
}

export default App;
