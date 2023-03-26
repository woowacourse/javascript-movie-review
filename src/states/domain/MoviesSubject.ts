import { MoviesResponse } from '../../api/interfaces/MoviesAPI';
import { Subject } from '../Subject';
import { PaginatedMoviesSubject } from './PaginatedMoviesSubject';

export class MoviesSubject extends Subject<PaginatedMoviesSubject> {
  private page = 1;

  private totalPage: number | null = null;

  private isFinished = false;

  constructor(private readonly fetchFn: (page: number) => Promise<MoviesResponse>) {
    super();
  }

  async fetchNextPage() {
    if (this.isFinished) return;

    const page = this.page;
    this.page += 1;

    if (this.totalPage !== null && this.page > this.totalPage) {
      this.isFinished = true;
    }

    const paginatedMovies$ = new PaginatedMoviesSubject();
    paginatedMovies$.fetch(
      () =>
        this.fetchFn(page).then((response) => {
          this.totalPage = response.totalPages;
          return response.movies;
        }),
      undefined,
    );

    paginatedMovies$.subscribeError((error) => this.error(error));

    this.next(paginatedMovies$);
  }
}
