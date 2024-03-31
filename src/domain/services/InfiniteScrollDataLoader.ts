import MovieList from '../../components/MovieList/MovieList';
import movieAPI from '../../api/movie';
import { getEndpoint, getUrlParams } from '../../utils/queryString';
import MovieDomain from '../entity/Movie';
import { END_POINT, QUERY_STRING_KEYS } from '../../consts/URL';
import { MovieListAPIReturnType } from '../../api/movieAPI.type';

class InfiniteScrollDataLoader {
  currentPage: number = 1;
  totalPage: number = 1;
  itemViewBox = document.querySelector('.item-view');
  movieListBox = document.createElement('ul');
  movieList: MovieList;

  constructor() {
    this.movieList = new MovieList({ movieList: [] });
    this.movieList.renderSkeleton();
    this.oberveScrollAndRenderNextPage();
    // this.renderTargetPage();
    // this.oberveScrollAndRenderNextPage();
  }

  resetPage() {
    this.currentPage = 1;
  }

  oberveScrollAndRenderNextPage() {
    let scrollCheck: NodeJS.Timeout | null;

    window.addEventListener('scroll', () => {
      clearTimeout(scrollCheck!);

      const isScrollEnded = window.innerHeight + window.scrollY + 100 >= document.body.offsetHeight;

      scrollCheck = setTimeout(async () => {
        scrollCheck = null;

        if (isScrollEnded && this.currentPage < this.totalPage) {
          this.movieList.renderSkeleton();
          this.currentPage += 1;
          await this.renderTargetPage();
        }
      }, 1000);
    });
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

    // }, 300);
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
