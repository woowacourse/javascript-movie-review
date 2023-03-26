import { Movie } from '../../domain/movie.type';
import { PromiseStateSubject } from '../PromiseStateSubject';

export class PaginatedMoviesSubject extends PromiseStateSubject<Movie[]> {}
