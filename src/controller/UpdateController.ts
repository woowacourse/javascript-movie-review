import MovieStorage from '../domains/MovieStorage';
import { GenreFetchResponseType, MovieFetchResponseType, ViewBundleType } from '../types';
import { FOOTER_MESSAGE, ERROR_IMAGE_PATH, ERROR_LAYOUT_MESSAGE } from '../../src/constants';

class UpdateController {
  private movieList;
  private movieFetcher;
  private footerMessage;

  constructor({ movieList, movieFetcher, footerMessage }: ViewBundleType) {
    this.movieList = movieList;
    this.movieFetcher = movieFetcher;
    this.footerMessage = footerMessage;

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
    if (this.movieFetcher.getFailedToFetchStatus()) {
      return;
    }

    const randomFetchId = crypto.randomUUID();
    this.footerMessage.showLoadingMessage(FOOTER_MESSAGE.loading);

    if (updateMode === 'overwrite') {
      this.movieList.clearItems();
      this.movieFetcher.resetPage();
    }

    this.movieList.renderSkeletonItems(randomFetchId);

    const { result, errorMessage, fetchedData }: MovieFetchResponseType =
      await this.movieFetcher.getMovieData<MovieFetchResponseType>(keyword);

    if (result === 'FAILED' || result === 'FETCH_CRASHED') {
      if (updateMode === 'overwrite') {
        this.movieList.showErrorMessage({
          image: ERROR_IMAGE_PATH.error,
          title: ERROR_LAYOUT_MESSAGE.errorTitle,
          message: errorMessage!,
        });

        this.footerMessage.hideMessage();
      } else {
        this.footerMessage.showErrorMessage(errorMessage!);
      }
    }

    if (result === 'NO_RESULT') {
      if (updateMode === 'overwrite') {
        this.movieList.showErrorMessage({
          image: ERROR_IMAGE_PATH.noSearchResults,
          title: ERROR_LAYOUT_MESSAGE.noResultTitle,
          message: ERROR_LAYOUT_MESSAGE.noResultContent,
        });

        this.footerMessage.hideMessage();
      } else {
        this.footerMessage.showErrorMessage(FOOTER_MESSAGE.noMoreMovies);
      }
    }

    if (fetchedData) {
      MovieStorage.addMovies(fetchedData);
      this.movieList.renderContents(fetchedData, randomFetchId);
      this.footerMessage.hideMessage();
    }

    this.movieList.removeSkeletonItemsByFetchId(randomFetchId);
  }
}

export default UpdateController;
