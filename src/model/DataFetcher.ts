import ErrorViewController from '../components/error/controller/ErrorViewController';
import SkeletonController from '../components/skeleton/controller/SkeletonController';

import apiClient from './APIClient';

export interface DataFetcherSkeletonController {
  show: () => void;
  remove: () => void;
}

export interface DataFetcherErrorViewController {
  show: (error: unknown) => void;
  remove: () => void;
}

class DataFetcher {
  #skeletonController: DataFetcherSkeletonController;
  #errorViewController: DataFetcherErrorViewController;

  constructor(
    skeletonController: DataFetcherSkeletonController,
    errorViewController: DataFetcherErrorViewController,
  ) {
    this.#skeletonController = skeletonController;
    this.#errorViewController = errorViewController;
  }

  async fetchDataWidthSkeleton(apiFun: () => Promise<void>) {
    try {
      this.#skeletonController.show();
      await apiFun();
      this.#errorViewController.remove();
    } catch (error) {
      this.#errorViewController.show(error);
    }
    this.#skeletonController.remove();
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

const movieListSkeletonController: DataFetcherSkeletonController = {
  show: SkeletonController.showSkeletonListContainer,
  remove: SkeletonController.hideSkeletonListContainer,
};

const movieListErrorViewController: DataFetcherErrorViewController = {
  show: (error) =>
    ErrorViewController.showErrorViewInMain(error, 'error-box-api'),
  remove: ErrorViewController.removeErrorViewInMain,
};

export const movieListDataFetcher = new DataFetcher(
  movieListSkeletonController,
  movieListErrorViewController,
);

const movieInfoSkeletonController: DataFetcherSkeletonController = {
  show: SkeletonController.showSkeletonInfo,
  remove: SkeletonController.removeSkeletonInfo,
};

const movieInfoErrorViewController: DataFetcherErrorViewController = {
  show: (error) => ErrorViewController.showErrorViewInModal(error),
  remove: ErrorViewController.removeErrorViewInModal,
};

export const movieInfoDataFetcher = new DataFetcher(
  movieInfoSkeletonController,
  movieInfoErrorViewController,
);
