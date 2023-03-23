import { Movie } from '../types/movie';
import { getLocalStorage } from '../utils/localStorage';

const userMovies: Movie[] = getLocalStorage() ?? [];

export { userMovies };
