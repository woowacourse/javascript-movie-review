import MovieStorage from '../domains/MovieStorage';
import { GenreFetchResponseType, MovieFetchResponseType, ViewBundleType } from '../types';
import { ERROR_IMAGE_PATH } from '../constants';

class UpdateController {
  private movieList;
  private movieFetcher;
  private loadMoreButton;

  constructor({ movieList, movieFetcher, loadMoreButton }: ViewBundleType) {
    this.movieList = movieList;
    this.movieFetcher = movieFetcher;
    this.loadMoreButton = loadMoreButton;

    this.initMovies();
  }

  private async initMovies() {
    this.movieFetcher.setRequestMode('genre');
    const genres = await this.movieFetcher.getMovieData<GenreFetchResponseType>();

    if (genres.fetchedData) {
      MovieStorage.setGenres(genres.fetchedData);
    } else {
      console.warn(
        '장르를 불러오는 데 실패했습니다. 장르가 제대로 표시되지 않을 것입니다. 새로고침을 해 주세요.',
      );
    }

    this.movieFetcher.setRequestMode('popularity');
    this.fetchAndUpdateMovieList('overwrite');
  }

  async fetchAndUpdateMovieList(updateMode: string, keyword: string = '') {
    if (updateMode === 'overwrite') {
      this.movieList.clearItems();
      this.movieFetcher.resetPage();
    }

    this.movieList.renderSkeletonItems();

    const { result, errorMessage, fetchedData }: MovieFetchResponseType =
      await this.movieFetcher.getMovieData<MovieFetchResponseType>(keyword);

    if (result === 'FAILED' || result === 'FETCH_CRASHED') {
      if (updateMode === 'overwrite') {
        this.movieList.showErrorMessage({
          image: ERROR_IMAGE_PATH.error,
          title: '앗! 문제가 발생했습니다.',
          message: errorMessage!,
        });

        this.loadMoreButton.disableButtonWithErrorMessage('');
      } else {
        this.loadMoreButton.disableButtonWithErrorMessage(errorMessage!);
      }
    }

    if (result === 'NO_RESULT') {
      if (updateMode === 'overwrite') {
        this.movieList.showErrorMessage({
          image: ERROR_IMAGE_PATH.noSearchResults,
          title: '구석구석 뒤져봤지만, 영화를 못 찾았어요.',
          message: '혹시 오타가 있지는 않나요?',
        });

        this.loadMoreButton.disableButtonWithErrorMessage('');
      } else {
        this.loadMoreButton.disableButtonWithErrorMessage('더 이상 불러올 영화가 없어요. 😞');
      }
    }

    if (fetchedData) {
      MovieStorage.addMovies(fetchedData);
      this.movieList.renderContents(fetchedData);
    }

    this.movieList.removeSkeletonItems();
  }
}

export default UpdateController;
