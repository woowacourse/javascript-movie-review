import { getSearchMovieResult } from "../api/movie/getSearchMovieResult";
import { MovieResultType } from "../types/movieResultType";
import infinityScrollObserver from "../util/infinityScrollObserver";
import SeacrhMovieListView from "../view/searchMovieListView";

class SearchMovieListController {
  searchText = "";
  page = 0;
  searchMovieListView;

  constructor(mainElement: HTMLElement) {
    this.searchMovieListView = new SeacrhMovieListView(mainElement);
  }

  async initialize(searchText: string) {
    this.searchMovieListView.clearMainElement();
    this.searchText = searchText;
    this.page = 0;

    const { movieList, hasMore } = await this.fetchMovies();
    this.searchMovieListView.renderMovieList(this.searchText, { movieList, hasMore });

    this.observeSeeMore();
  }

  async fetchMovies() {
    const {
      page: newPage,
      total_pages: totalPage,
      results: movieList,
    }: MovieResultType = await getSearchMovieResult(this.searchText, this.page + 1);
    this.page = newPage;

    return { movieList, hasMore: newPage !== totalPage };
  }

  async loadNextMoviePage() {
    const { movieList, hasMore } = await this.fetchMovies();

    this.searchMovieListView.appendMovieList(movieList);
    this.searchMovieListView.handleSeeMoreElement(hasMore);
  }

  observeSeeMore() {
    const seeMoreElement = this.searchMovieListView.getSeeMoreElement();
    infinityScrollObserver(seeMoreElement, this.loadNextMoviePage.bind(this));
  }
}

export default SearchMovieListController;
