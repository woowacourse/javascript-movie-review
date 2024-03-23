import { apiClient } from '../model';

import ErrorViewController from './ErrorViewController';
import SkeletonController from './SkeletonController';

const DataFetcher = {
  async fetchDataWidthSkeleton(apiFun: () => Promise<void>) {
    try {
      SkeletonController.showSkeleton();
      await apiFun();
      ErrorViewController.removeErrorView();
    } catch (error) {
      ErrorViewController.showErrorView(error);
    }
    SkeletonController.hideSkeleton();
  },

  async handleGetPopularMovieData(isResetCurrentPage: boolean = false) {
    await this.fetchDataWidthSkeleton(() =>
      apiClient.getPopularMovieData(isResetCurrentPage),
    );
  },

  async handleGetSearchMovieData(title: string, isResetCurrentPage: boolean) {
    await this.fetchDataWidthSkeleton(() =>
      apiClient.getSearchMovieData(isResetCurrentPage, title),
    );
  },
};

export default DataFetcher;
