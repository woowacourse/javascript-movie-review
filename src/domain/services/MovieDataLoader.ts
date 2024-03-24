import MovieList from '../../components/MovieList/MovieList';
import { formatMovieList } from '../../utils/formatList';
import MoreButton from '../../components/MoreButton/MoreButton';
import movieAPI from '../../api/movie';
import { getEndpoint, getUrlParams, setUrlParams } from '../../utils/queryString';

class MovieDataLoader {
  currentPage: number = 1;
  totalPage: number = 1;
  itemViewBox = document.querySelector('.item-view');
  movieListBox = document.createElement('ul');
  movieList: MovieList;
  moreButton = new MoreButton({
    showNextPage: () => this.showNextPage(),
    apiType: { apiType: 'popular' },
  });
  query?: string;

  constructor() {
    this.movieList = new MovieList({ isLoading: true, movieList: [] });
    this.currentPage = Number(getUrlParams('page'));
    this.query = getUrlParams('query') ?? undefined;
  }

  removeExistedList() {
    MoreButton.removeExistedButton();

    const notFoundBox = document.querySelector('#not-found');
    if (notFoundBox) {
      notFoundBox.remove();
    }

    const itemList = document.querySelector('.item-list');
    if (!itemList) return;
    itemList.replaceChildren();
  }
  //   //TODO: 도메인 객체 분리해서 formatMovieList 를 만들기: this.currentPage, ...params });
  async renderFirstPage() {
    this.removeExistedList();

    this.movieList.renderSkeleton();
    this.currentPage = 1;
    setUrlParams('page', String(this.currentPage));

    const movieResult = await this.selectAPIAndFetch();
    const formattedMovieList = formatMovieList(movieResult);

    this.totalPage = movieResult.total_pages;
    this.movieList.newList = formattedMovieList;
    this.movieList.render();

    if (this.totalPage === 1) return;
    this.moreButton.render();
  }

  async showNextPage() {
    MoreButton.removeExistedButton();
    this.currentPage++;
    setUrlParams('page', String(this.currentPage));

    this.movieList.renderSkeleton();

    const movieResult = await this.selectAPIAndFetch();

    const popularMovieList = formatMovieList(movieResult);
    this.movieList.newList = popularMovieList;
    this.movieList.render();

    if (this.currentPage !== this.totalPage) {
      this.moreButton.render();
    }
  }

  async selectAPIAndFetch() {
    const endpoint = getEndpoint();
    const query = getUrlParams('query'); //TODO: constatn
    if (endpoint === 'search' && query) {
      return movieAPI.fetchSearchMovies({ pageNumber: this.currentPage, query });
    }
    return movieAPI.fetchPopularMovies({ pageNumber: this.currentPage });
  }
}

export default MovieDataLoader;
