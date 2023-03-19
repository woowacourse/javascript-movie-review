import Header from './components/Header';
import MovieList from './components/MovieList';
import MovieFetcher from './domains/MovieFetcher';
import LoadMoreButton from './components/LoadMoreButton';

class App {
  #header = new Header();
  #movieList = new MovieList();
  #movieFetcher = new MovieFetcher();
  #loadMoreButton = new LoadMoreButton();
  #requestListType = 'popularity';
  #searchKeyword = '';

  constructor() {
    this.#header.render();
    this.#movieList.renderListTitle('Popular movies');
    this.fetchAndUpdateMovieList('popularity', 'overwrite');
    this.#loadMoreButton.render('Load More');

    this.#loadMoreButton.addClickEventHandler(this.onClickLoadMoreButton);
    this.#header.addClickEventHandler(this.onClickSearchButton);
  }

  async fetchAndUpdateMovieList(requestListType: string, updateType: string, keyword: string = '') {
    if (updateType === 'overwrite') this.#movieFetcher.resetPage();

    this.#movieList.renderSkeletonItems();

    const { result, movieList } =
      requestListType === 'popularity'
        ? await this.#movieFetcher.fetchMovieInfoByPopularity()
        : await this.#movieFetcher.fetchMovieInfoByKeyword(keyword);

    this.#movieList.removeSkeletonItems();

    if (result === 'PAGE_ERROR') {
      alert('페이지 에러');
    }

    if (result === 'CLIENT_ERROR') {
      alert('잘못된 요청입니다. 잠시 후 다시 시도해 주세요.');
    }

    if (result === 'SYSTEM_CRASHED') {
      alert(
        '죄송합니다. 알 수 없는 오류로 인해 영화 정보를 가져오는 데 실패하였습니다. 페이지 새로고침 후 다시 시도해 주세요.',
      );
      return;
    }

    if (result === 'SERVER_ERROR') {
      alert(
        '죄송합니다. 서버에 문제가 있어 현재 영화 정보를 가져올 수 없습니다. 잠시 후 다시 시도해 주세요.',
      );
      return;
    }

    if (result === 'EMPTY_LIST') {
      alert('검색 결과가 없습니다!');
    }

    if (!movieList) return;

    if (requestListType === 'keyword') this.#movieList.setTitle(`Search Results of "${keyword}"`);

    updateType === 'overwrite'
      ? this.#movieList.renderContents(movieList)
      : this.#movieList.renderNextContents(movieList);
  }

  onClickLoadMoreButton = () => {
    this.fetchAndUpdateMovieList(this.#requestListType, 'append', this.#searchKeyword);
  };

  onClickSearchButton = (keyword: string) => {
    this.#requestListType = 'keyword';
    this.#searchKeyword = keyword;
    this.fetchAndUpdateMovieList(this.#requestListType, 'overwrite', this.#searchKeyword);
  };
}

export default App;
