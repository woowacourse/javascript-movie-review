import RatedMovies from '../domain/RatedMovies';
import { MOVIE_STORAGE_ID } from '../constants';

const initialState = JSON.parse(localStorage.getItem(MOVIE_STORAGE_ID) ?? '[]');
const ratedMovieStates = new RatedMovies(initialState);

export default ratedMovieStates;
