import fetchWrapper from '../utils/fetchWrapper';
import { MOVIE_GENRES } from '../constants/url';
import { ResponseMovieGenres } from '../types/ResponseMovieGenres';

const MovieGenres = {
  async list() {
    const params = new URLSearchParams({ language: 'ko-kr' });
    const movieGenres = await fetchWrapper<ResponseMovieGenres>({
      url: `${MOVIE_GENRES}?${params}`,
      accessToken: process.env.ACCESS_TOKEN,
    });
    return movieGenres;
  },
};

export default MovieGenres;
