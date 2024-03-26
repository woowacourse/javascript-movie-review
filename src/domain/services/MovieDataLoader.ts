import Button from '../../components/Button/Button';
import MovieList from '../../components/MovieList/MovieList';
import { NotFound } from '../../components/NotFound/NotFound';
import Toast from '../../components/Toast/Toast';
import { URL } from '../../consts/common';
import { ERROR_MESSAGE } from '../../consts/error';
import { formatMovieList } from '../../utils/formatList';
import { getUrlParams } from '../../utils/queryString';
import { getCurrentPage, increaseUrlPage } from '../../utils/urlHelper';
import MovieFetchAPI from './MovieFetchAPI';

class MovieDataLoader {
  itemViewBox = document.querySelector('.item-view');
  movieListBox = document.createElement('ul');
  movieListInstance: MovieList;

  constructor() {
    this.movieListInstance = new MovieList({ isLoading: true });
  }

  removeExistedItems(currentPage: number) {
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
      const movieResult = await this.fetchMovies();
      const formattedMovieList = formatMovieList(movieResult);

      const currentPage = getCurrentPage();
      const totalPage = movieResult.total_pages;
      this.removeExistedItems(currentPage);
      console.log(currentPage, totalPage);

      this.movieListInstance.newList = formattedMovieList;
      this.movieListInstance.rerender();

      if (currentPage < totalPage) this.renderMoreButton();
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === ERROR_MESSAGE.RESULTS_NOT_FOUND) {
          return NotFound();
        }
        new Toast(error.message);
      }
    }
  }

  fetchMovies() {
    if (getUrlParams(URL.MODE) === 'popular') {
      return MovieFetchAPI.fetchPopularMovies();
    }
    return MovieFetchAPI.fetchSearchMovies();
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

export default MovieDataLoader;
