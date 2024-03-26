import Header from '../src/components/Header/Header';
import MovieList from '../src/components/MovieList/MovieList';
import Title from './components/Title/Title';
import { END_POINT } from './consts/URL';
import MovieDataLoader from './domain/services/MovieDataLoader';
import { setEndpoint } from './utils/queryString';

class App {
  movieDataLoader = new MovieDataLoader();
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
    await this.movieDataLoader.renderFirstPage();
  }

  async rerenderMovieList() {
    this.title.rerenderTitle();
    await this.movieDataLoader.renderFirstPage();
  }

  #renderHeader() {
    new Header(this.rerenderMovieList.bind(this));
  }
}

export default App;
