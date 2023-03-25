import { MoviesResponse } from '../../api/interfaces/MoviesAPI';
import { Movie } from '../../domain/movie.type';
import { PromiseStateSubject } from '../PromiseStateSubject';
import { Subject } from '../Subject';

export type MoviesFetchFn = (page: number) => Promise<MoviesResponse>;

export class NewMovieSubject extends Subject<PromiseStateSubject<Movie | null>> {
  private page = 1;

  private isFinished = false;

  constructor(private readonly fetchFn: MoviesFetchFn) {
    super();
  }

  async fetchNextPage() {
    if (this.isFinished) return;

    const page = this.page;
    this.page += 1;

    const promise = this.fetchFn(page);
    const promises = [...Array(20)].map(
      (_, index) =>
        new Promise<Movie | null>((resolve) => {
          promise
            .then((response) => resolve(response.movies[index] ?? null))
            .catch(() => {
              /* Supress Exception */
            });
        }),
    );

    promises.forEach((_promise) => {
      const movie$ = new PromiseStateSubject<Movie | null>();
      movie$.nextPromise(_promise);

      this.next(movie$);
    });

    try {
      const { totalPages } = await promise;

      if (page >= totalPages) {
        this.isFinished = true;
      }
    } catch (e) {
      const error = e as Error;
      this.error(error);
    }
  }
}
