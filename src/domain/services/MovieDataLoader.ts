import MovieList from '../../components/MovieList/MovieList';
import { formatMovieList } from '../../utils/formatList';
import MoreButton, { APIType } from '../../components/MoreButton/MoreButton';
import movieAPI from '../../api/movie';
import { deleteParams, getUrlParams, setUrlParams } from '../../utils/queryString';

//쿼리스트링을 자동 인식해서 페이지와 쿼리를 바꿔주는 로직을 하는 클래스
class MovieDataLoader {
  currentPage: number = 1;
  totalPage: number = 1;
  itemViewBox = document.querySelector('.item-view');
  movieListBox = document.createElement('ul');
  movieListInstance: MovieList;
  moreButton = new MoreButton({
    showNextPage: () => this.showNextPage(),
    apiType: { apiType: 'popular' },
  });
  query?: string;

  constructor() {
    this.movieListInstance = new MovieList({ isLoading: true, movieList: [] });
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

    this.movieListInstance.renderSkeleton();
  }
  //   //TODO: 도메인 객체 분리해서 formatMovieList 를 만들기: this.currentPage, ...params });
  async renderFirstPage() {
    this.removeExistedList();
    this.currentPage = 1;
    setUrlParams('page', String(this.currentPage));

    const movieResult = await this.selectAPIAndFetch();
    const formattedMovieList = formatMovieList(movieResult);

    this.totalPage = movieResult.total_pages;
    this.movieListInstance.newList = formattedMovieList;
    this.movieListInstance.rerender();
    this.moreButton.render();
  }

  async showNextPage() {
    MoreButton.removeExistedButton();
    this.currentPage++;
    setUrlParams('page', String(this.currentPage));

    this.movieListInstance.renderSkeleton();

    const movieResult = await this.selectAPIAndFetch();

    const popularMovieList = formatMovieList(movieResult);
    this.movieListInstance.newList = popularMovieList;
    this.movieListInstance.rerender();

    if (this.currentPage === this.totalPage) return;
    this.moreButton.render();
  }

  async selectAPIAndFetch() {
    // try {
    const query = getUrlParams('query');
    if (query) {
      return movieAPI.fetchSearchMovies({ pageNumber: this.currentPage, query });
    }
    return movieAPI.fetchPopularMovies({ pageNumber: this.currentPage });

    //TODO: 에러 처리 필요
    // } catch (error: unknown) {
    //   if (error instanceof Error) {
    //     if (error.message === ERROR_MESSAGE.RESULTS_NOT_FOUND) {
    //       return NotFound();
    //     }
    //     new Toast(error.message);
    //   }
    // }
  }
}

export default MovieDataLoader;
