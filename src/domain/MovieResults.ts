import { MovieItemType } from "../types/movieResultType";

class MovieResults {
  movieList: MovieItemType[] = [];
  page: number = 0;
  maxPage: number = 0;

  addMovieList(newPage: number, list: MovieItemType[]) {
    list.forEach((movie) => {
      this.movieList.push({ ...movie, star: 0 });
    });
    this.page = newPage;
  }

  initialTotalPage(totalPage: number) {
    this.maxPage = totalPage;
  }

  getMovieList(): MovieItemType[] {
    return [...this.movieList];
  }

  getPage(): number {
    return this.page;
  }

  hasMore(): boolean {
    return this.page !== this.maxPage;
  }
}

export default MovieResults;
