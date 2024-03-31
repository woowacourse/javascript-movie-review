import { API_ENDPOINT, API_OPTION } from '../constants/api/api';
import { MovieGenre } from '../types/movie';
import { api } from '../api';

const getAllGenres = async () => {
  const res = await api.sendRequest(API_ENDPOINT.GENRE, {
    headers: API_OPTION.headers,
  });

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
