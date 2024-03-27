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

    const movie = {
      adult: false,
      backdrop_path: '/deLWkOLZmBNkm8p16igfapQyqeq.jpg',
      genre_ids: [14, 12, 28],
      id: 763215,
      original_language: 'en',
      original_title: 'Damsel',
      overview:
        '매력적인 왕자와 결혼하게 된 젊은 여성. 그런데 신부가 아니라 불을 내뿜는 용에게 바칠 제물이 되면서, 꿈꿔왔던 결혼이 순식간에 치열한 생존 싸움으로 변한다.',
      popularity: 3001.85,
      poster_path: '/1Ku5QqFIsn9UQaD72hdlJVeIC57.jpg',
      release_date: '2024-03-08',
      title: '댐즐',
      video: false,
      vote_average: 7.266,
      vote_count: 858,
    };

    new MovieInfoModal(new MovieDomain(movie).formatMovieList());

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
