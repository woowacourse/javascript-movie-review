import EventBus from '../EventBus';
import { ViewBundleType } from '../types';

class ButtonController {
  private header;
  private movieList;
  private movieFetcher;
  private footerMessage;
  private onFetchAndUpdateMovieList;

  constructor(
    { header, movieList, movieFetcher, footerMessage }: ViewBundleType,
    onFetchAndUpdateMovieList: (updateMode: string, keyword?: string) => void,
  ) {
    EventBus.setEvent('loadMoreItems', this.onClickLoadMoreButton);

    this.header = header;
    this.movieList = movieList;
    this.movieFetcher = movieFetcher;
    this.footerMessage = footerMessage;

    this.footerMessage.addClickEventHandler(this.onClickLoadMoreButton);
    this.header.addClickEventHandler(this.onClickSearchButton);
    this.onFetchAndUpdateMovieList = onFetchAndUpdateMovieList;
  }

  onClickLoadMoreButton = () => {
    this.onFetchAndUpdateMovieList('append');
  };

  onClickSearchButton = (keyword: string) => {
    this.movieList.setTitle(`"${keyword}" 검색 결과 🔍`);
    this.movieFetcher.setRequestMode('search');
    this.movieFetcher.resetFailedToFetchStatus();
    this.onFetchAndUpdateMovieList('overwrite', keyword);
  };
}

export default ButtonController;
