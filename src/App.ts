import Header from './components/Header';
import MovieList from './components/MovieList';
import MovieFetcher from './domains/MovieFetcher';
import LoadMoreButton from './components/LoadMoreButton';

class App {
  #header = new Header();
  #movieList = new MovieList();
  #movieFetcher = new MovieFetcher();
  #loadMoreButton = new LoadMoreButton();
  #searchKeyword = '';

  constructor() {
    this.#header.render();
    this.#movieList.renderListTitle('Popular movies');
    this.fetchAndUpdateMovieList('overwrite');
    this.#loadMoreButton.render('Load More');

    this.#loadMoreButton.addClickEventHandler(this.onClickLoadMoreButton);
    this.#header.addClickEventHandler(this.onClickSearchButton);
  }

  async fetchAndUpdateMovieList(updateMode: string, keyword: string = '') {
    if (updateMode === 'overwrite') {
      this.#movieList.clearItems();
      this.#movieFetcher.resetPage();
    }

    this.#movieList.renderSkeletonItems();

    const { result, errorMessage, movies } = await this.#movieFetcher.fetchMovies(keyword);

    if (result === 'FAILED' || result === 'FETCH_CRASHED') {
      if (updateMode === 'overwrite') {
        this.#movieList.showErrorMessage({
          image: ERROR_IMAGE_PATH.error,
          title: '앗! 문제가 발생했습니다.',
          message: errorMessage!,
        });

        this.#loadMoreButton.disableButtonWithErrorMessage('');
      } else {
        this.#loadMoreButton.disableButtonWithErrorMessage(errorMessage!);
      }
    }

    if (result === 'NO_MORE_MOVIES') {
      if (updateMode === 'overwrite') {
        this.#movieList.showErrorMessage({
          image: ERROR_IMAGE_PATH.noSearchResults,
          title: '구석구석 뒤져봤지만, 영화를 못 찾았어요.',
          message: '혹시 오타가 있지는 않나요?',
        });

        this.#loadMoreButton.disableButtonWithErrorMessage('');
      } else {
        this.#loadMoreButton.disableButtonWithErrorMessage('더 이상 불러올 영화가 없어요. 😞');
      }
    }

    if (movies) {
      console.log(movies);
      this.#movieList.renderContents(movies);
    }

    this.#movieList.removeSkeletonItems();
  }

  onClickLoadMoreButton = () => {
    this.fetchAndUpdateMovieList('append');
  };

  onClickSearchButton = (keyword: string) => {
    this.#movieList.setTitle(`Search Results of "${keyword}"`);
    this.#movieFetcher.setRequestMode('search');
    this.fetchAndUpdateMovieList('overwrite', keyword);
  };
}

export default App;
