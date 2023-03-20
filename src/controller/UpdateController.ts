import { ViewBundleType } from '../types';
import { ERROR_IMAGE_PATH } from '../constants';

class UpdateController {
  #movieList;
  #movieFetcher;
  #loadMoreButton;

  constructor({ movieList, movieFetcher, loadMoreButton }: ViewBundleType) {
    this.#movieList = movieList;
    this.#movieFetcher = movieFetcher;
    this.#loadMoreButton = loadMoreButton;

    this.fetchAndUpdateMovieList('overwrite');
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
}

export default UpdateController;
