import { MovieItemType } from "../types/movieResultType";

class PopularMovieResults {
  movieList: MovieItemType[] = [];
  page: number = 0;
  maxPage: number = 0;

  addMovieList(newPage: number, list: MovieItemType[]) {
    this.movieList.push(...list);
    this.page = newPage;
  }

  initialTotalPage(totalPage: number) {
    this.maxPage = totalPage;
  }

  getMovieList(): MovieItemType[] {
    return [...this.movieList];
  }

  getFirstMovieItem(): MovieItemType {
    return this.movieList[0];
  }

  getPage(): number {
    return this.page;
  }

  hasMore(): boolean {
    return this.page !== this.maxPage;
  }

  hasMovieList(): boolean {
    return this.movieList.length > 0;
  }
}

export default PopularMovieResults;
