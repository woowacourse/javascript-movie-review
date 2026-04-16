import { bannerView } from "../view/bannerView";
import { movieListView } from "../view/movieListView";

export const errorMovieList = {
  handleHomeError: (errorMessage: string) => {
    console.error("에러 원인:", errorMessage);
    bannerView.renderErrorBanner();
    movieListView.renderErrorList();
  },

  handleLoadMoreError: (errorMessage: string) => {
    console.error("에러 원인:", errorMessage);
    movieListView.renderErrorList();
  },

  handleSearchError: (errorMessage: string) => {
    console.error("에러 원인:", errorMessage);
    movieListView.renderErrorList();
  },
}
