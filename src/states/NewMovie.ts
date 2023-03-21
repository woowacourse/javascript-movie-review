import { MoviesResponse } from '../api/interfaces/MoviesAPI';
import { Movie } from '../domain/movie.type';
import { OfPromise, Subject } from './Subject';

export type MoviesFetchFn = (page: number) => Promise<MoviesResponse>;

export class NewMovie extends Subject<Subject<OfPromise<Movie | null>>> {
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
          promise.then((response) => resolve(response.movies[index] ?? null));
        }),
    );

    promises.forEach((_promise) => {
      const movieSubject = Subject.ofPromise<Movie | null>(_promise);
      this.next(movieSubject);
    });

    const { totalPages } = await promise;
    if (page >= totalPages) {
      this.isFinished = true;
    }
  }
}
