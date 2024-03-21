import Button from '../../components/Button/Button';
import MovieList from '../../components/MovieList/MovieList';
import { NotFound } from '../../components/NotFound/NotFound';
import Toast from '../../components/Toast/Toast';
import { ERROR_MESSAGE } from '../../consts/error';
import { formatMovieList } from '../../utils/formatList';
import MovieFetchAPI from './MovieFetchAPI';

type PopularAPIType = {
  apiType: 'popular';
};

type SearchAPIType = {
  apiType: 'search';
  query: string;
};

type APIType = PopularAPIType | SearchAPIType;

class MovieDataLoader {
  currentPage: number = 1;
  totalPage: number = 1;
  itemViewBox = document.querySelector('.item-view');
  movieListBox = document.createElement('ul');
  movieListInstance: MovieList;

  constructor() {
    this.movieListInstance = new MovieList({ isLoading: true });
  }

  removeExistedList() {
    const notFoundBox = document.querySelector('#not-found');
    if (notFoundBox) {
      notFoundBox.remove();
    }

    const itemList = document.querySelector('.item-list');
    if (!itemList) return;
    itemList.replaceChildren();

    const existingButton = document.querySelector('.button');
    if (!existingButton) return;
    existingButton.remove();

    this.movieListInstance.renderSkeleton();
  }

  async renderFirstPage(props: APIType) {
    try {
      this.removeExistedList();

      this.currentPage = 1;
      const movieResult = await this.fetchMovies(props);
      const formattedMovieList = formatMovieList(movieResult);

      this.totalPage = movieResult.total_pages;
      this.movieListInstance.newList = formattedMovieList;
      this.movieListInstance.rerender();

      this.renderMoreButton(props);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === ERROR_MESSAGE.RESULTS_NOT_FOUND) {
          return NotFound();
        }
        new Toast(error.message);
      }
    }
  }

  async showNextPage(props: APIType) {
    this.currentPage++;

    const existingButton = document.querySelector('.button');
    if (!existingButton) return;
    existingButton.remove();

    this.movieListInstance.renderSkeleton();
    const movieResult = await this.fetchMovies(props);

    const popularMovieList = formatMovieList(movieResult);
    this.movieListInstance.newList = popularMovieList;
    this.movieListInstance.rerender();

    if (this.currentPage === this.totalPage) return;
    this.renderMoreButton(props);
  }

  fetchMovies(props: APIType) {
    if (props.apiType === 'popular') {
      return MovieFetchAPI.fetchPopularMovies({ pageNumber: this.currentPage });
    }
    return MovieFetchAPI.fetchSearchMovies({ pageNumber: this.currentPage, query: props.query });
  }

  renderMoreButton(props: APIType) {
    const moreButton = new Button({
      text: '더보기',
      clickEvent: () => {
        this.showNextPage(props);
      },
      id: 'more-button',
    }).render();

    const container = document.querySelector('.item-view');
    if (!container) return;
    container.append(moreButton);
  }
}

export default MovieDataLoader;
