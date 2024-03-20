import Header from '../src/components/Header/Header';
import MovieList from '../src/components/MovieList/MovieList';
import Button from './components/Button/Button';
import APIService from './domain/services/APIService';

class App {
  currentPage: number = 1;
  totalPage: number = 1;
  isLoading: boolean = false;
  movieListBox = document.createElement('ul');
  movieListInstance: MovieList;

  constructor() {
    this.init();
    this.movieListInstance = new MovieList({ isLoading: this.isLoading });
  }

  init() {
    new Header();

    this.movieListBox.classList.add('item-list');
    const itemViewBox = document.querySelector('.item-view');
    if (!itemViewBox) return;

    itemViewBox.append(this.movieListBox);

    this.render();
  }

  async render() {
    this.isLoading = true;

    try {
      const popularMovieResult = await APIService.delayedFetchPopularMovies({ pageNumber: this.currentPage });

      console.log('popularMovieResult', popularMovieResult);
      if (popularMovieResult) this.isLoading = false;

      this.totalPage = popularMovieResult.total_pages;
      const popularMovieList = popularMovieResult.results.map(movie => ({
        title: movie.title,
        posterPath: movie.poster_path,
        voteAverage: movie.vote_average,
      }));

      this.movieListInstance.newList = popularMovieList;
      this.movieListInstance.rerender();

      const moreButton = new Button({
        text: '더보기',
        clickEvent: () => {
          this.showNextPage();
        },
      }).render();

      const container = document.querySelector('.item-view');
      if (!container) return;
      container.append(moreButton);

      // new MovieList({ movieList: popularMovieList, isLoading: false });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log('An unknown error occurred');
      }
      // TODO: Error 처리
    }
  }

  async showNextPage() {
    const nextPage = this.currentPage + 1;
    if (nextPage > this.totalPage) return;
    const result = await APIService.fetchPopularMovies({ pageNumber: nextPage });

    //TODO: util 로 분리
    const popularMovieList = result.results.map(movie => ({
      title: movie.title,
      posterPath: movie.poster_path,
      voteAverage: movie.vote_average,
    }));

    new MovieList({ movieList: popularMovieList, isLoading: false });

    //TODO: button rerender로직으로 분리
    const existingButton = document.querySelector('.button');
    if (!existingButton) return;
    existingButton.remove();

    const moreButton = new Button({
      text: '더보기',
      clickEvent: () => {
        this.showNextPage();
      },
      id: 'more-button',
    }).render();

    const container = document.querySelector('.item-view');
    if (!container) return;
    container.append(moreButton);

    this.currentPage = nextPage;
  }
}

export default App;
