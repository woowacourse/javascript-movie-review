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
  skeletonLoading: boolean = false;

  constructor() {
    this.movieList = new MovieList({ movieList: [] });
    this.oberveScrollAndRenderNextPage();
  }

  resetPage() {
    this.currentPage = 1;
  }

  oberveScrollAndRenderNextPage() {
    let scrollCheck: NodeJS.Timeout | null;

    window.addEventListener('scroll', () => {
      if (scrollCheck) {
        return;
      }

      scrollCheck = setTimeout(() => {
        const isScrollEnded = window.innerHeight + window.scrollY + 150 >= document.body.offsetHeight;
        if (isScrollEnded && this.currentPage < this.totalPage) {
          this.currentPage += 1;
          this.renderSkeleton();
          this.renderTargetPage();
          this.skeletonLoading = false;
        }
        scrollCheck = null;
      }, 1000);
    });
  }

  renderSkeleton() {
    if (!this.skeletonLoading) {
      this.movieList.renderSkeleton();
      this.skeletonLoading = true;
    }
  }

  async renderTargetPage() {
    const movieResult = await this.selectAPIAndFetch();

    const formattedMovieList = movieResult.results.map(movie => {
      return MovieDomain.formatMovieItem(movie);
    });

    this.totalPage = movieResult.total_pages;
    this.movieList.newList = formattedMovieList;
    this.movieList.render();

    if (this.totalPage === 1) return;
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
