import { API_ENDPOINT, API_OPTION } from '../constants/api/api';
import { MovieGenre } from '../types/movie';
import HttpError from '../error/HttpError';
import ERROR_MESSAGE from '../constants/api/messages';

const getAllGenres = async () => {
  const res = await fetch(API_ENDPOINT.GENRE, {
    headers: API_OPTION.headers,
  });

  if (!res.ok) {
    const error = new HttpError(ERROR_MESSAGE.FAIL_GET_ALL_GENRE, res.status);

    throw error;
  }

  const data = res.json();

  return data;
};

/*eslint-disable max-lines-per-function */
const getTargetMovieAllGenres = async (genreIds: number[]) => {
  const allGenres = await getAllGenres();

  const targetGenres = genreIds
    .map((id) => {
      const genre = allGenres.genres.find((genre: MovieGenre) => genre.id === id);
      return genre ? genre.name : null;
    })
    .filter((name) => name !== null);

  return targetGenres;
};

export default getTargetMovieAllGenres;
