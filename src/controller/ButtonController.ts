import { ViewBundleType } from '../types';

class ButtonController {
  #header;
  #movieList;
  #movieFetcher;
  #loadMoreButton;
  #onFetchAndUpdateMovieList;

  constructor(
    { header, movieList, movieFetcher, loadMoreButton }: ViewBundleType,
    onFetchAndUpdateMovieList: (updateMode: string, keyword?: string) => void,
  ) {
    this.#header = header;
    this.#movieList = movieList;
    this.#movieFetcher = movieFetcher;
    this.#loadMoreButton = loadMoreButton;

    this.#loadMoreButton.addClickEventHandler(this.onClickLoadMoreButton);
    this.#header.addClickEventHandler(this.onClickSearchButton);
    this.#onFetchAndUpdateMovieList = onFetchAndUpdateMovieList;
  }

  onClickLoadMoreButton = () => {
    this.#onFetchAndUpdateMovieList('append');
  };

  onClickSearchButton = (keyword: string) => {
    this.#movieList.setTitle(`"${keyword}" 검색 결과 🔍`);
    this.#movieFetcher.setRequestMode('search');
    this.#loadMoreButton.enableButton();
    this.#onFetchAndUpdateMovieList('overwrite', keyword);
  };
}

export default ButtonController;
