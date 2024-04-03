import { MOVIE_DETAIL_URL } from '../constants/tmdbConstants';
import fetchErrorCheck from './fetchErrorCheck';

export type genre = {
  id: number;
  name: string;
};

export interface IMovieDetailResponse {
  id: number;
  title: string;
  genres: genre[];
  overview: string;
  vote_average: number;
  poster_path: string;
}

// eslint-disable-next-line max-lines-per-function
function movieDetailFetcher(movieId: number) {
  const searchParams = new URLSearchParams({
    api_key: process.env.TMDB_API_KEY,
    language: 'ko-KR',
  });
  return fetch(`${MOVIE_DETAIL_URL}/${movieId}?${searchParams}`);
}

async function fetchMovieDetail(movieId: number) {
  const response = await movieDetailFetcher(movieId);
  fetchErrorCheck(response.status);
  return response.json();
}

export default fetchMovieDetail;
