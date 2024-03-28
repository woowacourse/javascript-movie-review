import MovieList from '../../components/MovieList/MovieList';
import movieAPI from '../../api/movie';
import { getEndpoint, getUrlParams } from '../../utils/queryString';
import MovieDomain from '../entity/Movie';
import { END_POINT, QUERY_STRING_KEYS } from '../../consts/URL';

class InfiniteScrollDataLoader {
  currentPage: number = 1;
  totalPage: number = 1;
  itemViewBox = document.querySelector('.item-view');
  movieListBox = document.createElement('ul');
  movieList: MovieList;
  renderComplete: boolean;

  constructor() {
    this.movieList = new MovieList({ isLoading: true, movieList: [] });
    this.renderComplete = false;
    this.oberveScrollAndRenderNextPage();
  }

  resetPage() {
    this.currentPage = 1;
  }

  oberveScrollAndRenderNextPage() {
    window.addEventListener('scroll', async () => {
      const isScrollEnded = window.innerHeight + window.scrollY + 100 >= document.body.offsetHeight;

      if (isScrollEnded && this.currentPage < this.totalPage) {
        this.currentPage += 1;
        await this.renderTargetPage();
      }
    });
  }

  async renderTargetPage() {
    this.movieList.renderSkeleton();

    const movieResult = await this.selectAPIAndFetch();

    const formattedMovieList = movieResult.results.map(movie => {
      return MovieDomain.formatMovieItem(movie);
    });

    this.totalPage = movieResult.total_pages;
    this.movieList.newList = formattedMovieList;
    this.movieList.render();

    if (this.totalPage === 1) return;
    this.renderComplete = false;
  }

  async selectAPIAndFetch() {
    const endpoint = getEndpoint();
    const query = getUrlParams(QUERY_STRING_KEYS.QUERY);
    if (endpoint === END_POINT.SEARCH && query) {
      return movieAPI.fetchSearchMovies({ pageNumber: this.currentPage, query });
    }
    return movieAPI.fetchPopularMovies({ pageNumber: this.currentPage });
  }
}

export default InfiniteScrollDataLoader;
