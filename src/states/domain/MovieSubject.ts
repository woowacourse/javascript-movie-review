import { Movie } from '../../domain/movie.type';
import { PromiseStateSubject } from '../PromiseStateSubject';
import { PaginatedMoviesSubject } from './PaginatedMoviesSubject';

export class MovieSubject extends PromiseStateSubject<Movie | null> {
  static fromMovies$(movies$: PaginatedMoviesSubject, index: number) {
    const movie$ = new MovieSubject();

    movies$.subscribe(({ label, value: movies }) => {
      if (label === 'pending') {
        movie$.next({ label: 'pending', value: undefined });
        return;
      }

      if (label === 'fulfilled') {
        movie$.next({ label: 'fulfilled', value: movies[index] ?? null });
      }
    });

    movies$.subscribeError((error) => movie$.error(error));

    return movie$;
  }
}
