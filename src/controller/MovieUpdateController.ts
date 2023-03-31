import MovieStorage from '../domains/MovieStorage';
import EventDispatcher from '../EventDispatcher';
import { ViewBundleType } from '../types';
import {
  FOOTER_MESSAGE,
  ERROR_IMAGE_PATH,
  ERROR_LAYOUT_MESSAGE,
  NO_RESULT_MESSAGE,
} from '../constants';

class MovieUpdateController {
  private header;
  private movieList;
  private movieFetcher;
  private footerMessage;

  constructor({ header, movieList, movieFetcher, footerMessage }: ViewBundleType) {
    EventDispatcher.setEvent('loadMoreItems', this.onClickLoadMoreButton);

    this.header = header;
    this.movieList = movieList;
    this.movieFetcher = movieFetcher;
    this.footerMessage = footerMessage;

    this.footerMessage.addClickEventHandler(this.onClickLoadMoreButton);
    this.header.addClickEventHandler(this.onClickSearchButton);

    this.loadGenresAndMoviesWhenStart();
  }

  private async loadGenresAndMoviesWhenStart() {
    await this.loadMovieGenres();

    this.movieFetcher.setRequestMode('popularity');
    this.fetchAndUpdateMovieList('overwrite');
  }

  private async loadMovieGenres() {
    this.movieFetcher.setRequestMode('genre');
    const response = await this.movieFetcher.fetchGenreData();

    if (response.isSuccess) {
      MovieStorage.setGenres(response.fetchedData);
    } else {
      alert(
        '장르를 불러오는 데 실패했습니다. 장르가 제대로 표시되지 않을 것입니다. 새로고침을 해 주세요.',
      );
    }
  }

  onClickLoadMoreButton = () => {
    this.fetchAndUpdateMovieList('append');
  };

  onClickSearchButton = (keyword: string) => {
    this.movieList.setTitle(`"${keyword}" 검색 결과 🔍`);
    this.movieFetcher.setRequestMode('search');
    this.movieFetcher.resetFailedToFetchStatus();
    this.fetchAndUpdateMovieList('overwrite', keyword);
  };

  async fetchAndUpdateMovieList(updateMode: 'overwrite' | 'append', keyword: string = '') {
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

    const response = await this.movieFetcher.fetchMovieData(keyword);

    if (response.isSuccess) {
      MovieStorage.addMovies(response.fetchedData);
      this.movieList.renderContents(response.fetchedData, randomFetchId);
      this.footerMessage.hideMessage();
    } else {
      if (response.errorMessage === NO_RESULT_MESSAGE) {
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
      } else {
        if (updateMode === 'overwrite') {
          this.movieList.showErrorMessage({
            image: ERROR_IMAGE_PATH.error,
            title: ERROR_LAYOUT_MESSAGE.errorTitle,
            message: response.errorMessage,
          });

          this.footerMessage.hideMessage();
        } else {
          this.footerMessage.showErrorMessage(response.errorMessage);
        }
      }
    }

    this.movieList.removeSkeletonItemsByFetchId(randomFetchId);
  }
}

export default MovieUpdateController;
