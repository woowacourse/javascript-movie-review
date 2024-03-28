import { API_URL } from '../../consts/Api';
import { generateMovieApiUrl } from '../../utils/urlHelper';
import { MovieDetailAPI } from './API.type';

const MovieDetailFetcher = {
  async fetchMovieDetail(movieId: number): Promise<MovieDetailAPI> {
    const movieDetailUrl = generateMovieApiUrl(API_URL.MOVIES + String(movieId));

    const response = await fetch(movieDetailUrl);

    const movieDetailResult = await response.json();
    return movieDetailResult;
  },
};

export default MovieDetailFetcher;
