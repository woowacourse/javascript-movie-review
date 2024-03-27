import { apiClient } from '../model';

import ErrorViewController from './ErrorViewController';

interface SkeletonHandler {
  show: () => void;
  hide: () => void;
}

class DataFetcher {
  #skeletonHandler: SkeletonHandler;

  constructor(skeletonHandler: SkeletonHandler) {
    this.#skeletonHandler = skeletonHandler;
  }

  async fetchDataWidthSkeleton(apiFun: () => Promise<void>) {
    try {
      this.#skeletonHandler.show();
      await apiFun();
      ErrorViewController.removeErrorView();
    } catch (error) {
      ErrorViewController.showErrorView(error, 'error-box-api');
    }
    this.#skeletonHandler.hide();
  }

  async handleGetPopularMovieData(isResetCurrentPage: boolean = false) {
    await this.fetchDataWidthSkeleton(() =>
      apiClient.getPopularMovieData(isResetCurrentPage),
    );
  }

  async handleGetSearchMovieData(title: string, isResetCurrentPage: boolean) {
    await this.fetchDataWidthSkeleton(() =>
      apiClient.getSearchMovieData(isResetCurrentPage, title),
    );
  }

  async handleGetMovieInfo(id: number) {
    await this.fetchDataWidthSkeleton(() => apiClient.getMovieInfo(id));
  }
}
export default DataFetcher;
