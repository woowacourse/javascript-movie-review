import MovieList from '../../components/MovieList/MovieList';
import { formatMovieList } from '../../utils/formatList';
import MoreButton, { APIType } from '../../components/MoreButton/MoreButton';
import movieAPI from '../../api/movie';

class MovieDataLoader {
  currentPage: number = 1;
  totalPage: number = 1;
  itemViewBox = document.querySelector('.item-view');
  movieListBox = document.createElement('ul');
  movieListInstance: MovieList;
  moreButton = new MoreButton({
    showNextPage: (apiType: APIType) => this.showNextPage(apiType),
    apiType: { apiType: 'popular' },
  });

  constructor() {
    this.movieListInstance = new MovieList({ isLoading: true, movieList: [] });
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
  async renderFirstPage(props: APIType) {
    // try {
    this.removeExistedList();

    this.currentPage = 1;
    const movieResult = await this.selectAPIAndFetch(props);
    const formattedMovieList = formatMovieList(movieResult);

    this.totalPage = movieResult.total_pages;
    this.movieListInstance.newList = formattedMovieList;
    this.movieListInstance.rerender();

    this.moreButton.render();
  }

  async showNextPage(apiType: APIType) {
    MoreButton.removeExistedButton();
    this.currentPage++;

    this.movieListInstance.renderSkeleton();

    const movieResult = await this.selectAPIAndFetch(apiType);

    const popularMovieList = formatMovieList(movieResult);
    this.movieListInstance.newList = popularMovieList;
    this.movieListInstance.rerender();

    if (this.currentPage === this.totalPage) return;
    this.moreButton.render();
  }

  async selectAPIAndFetch(props: APIType) {
    // try {
    if (props.apiType === 'popular') {
      return movieAPI.fetchPopularMovies({ pageNumber: this.currentPage });
    }
    return movieAPI.fetchSearchMovies({ pageNumber: this.currentPage, query: props.query });
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
