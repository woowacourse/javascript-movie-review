import { getPopularMovieResult } from "../api/getPopularMovieResult";
import Observable from "../core/Observable";
import { IMovieItem, IMovieResult } from "../types/movieResultType";

interface MovieListState {
  movieList: IMovieItem[];
  page: number;
  maxPage: number;
}

class MovieListModel extends Observable<MovieListState> {
  constructor() {
    super({ movieList: [], page: 0, maxPage: 0 });
  }

  async fetchMovies(page: number): Promise<void> {
    const {
      page: newPage,
      total_pages: totalPage,
      results: movieList,
    }: IMovieResult = await getPopularMovieResult(page);

    const current = this.getValue();

    this.setValue({
      movieList: [...current.movieList, ...movieList],
      page: newPage,
      maxPage: totalPage,
    });
  }

  getCurrentPage(): number {
    return this.getValue().page;
  }

  getMovieList(): IMovieItem[] {
    return this.getValue().movieList;
  }

  hasMore() {
    const { page, maxPage } = this.getValue();

    return page !== maxPage;
  }
}

export default MovieListModel;
