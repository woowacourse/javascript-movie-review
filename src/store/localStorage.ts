import { IMovieDetailResponse } from '../api/fetchMovieDetail';
import { RATING_MESSAGES } from '../constants/tmdbConstants';

const LOCAL_KEY = 'moviesScore';

export function getLocalStorageScore(id: number): keyof typeof RATING_MESSAGES | undefined {
  const movieData = localStorage.getItem(LOCAL_KEY);
  if (!movieData) return;
  const score = JSON.parse(movieData)[id].score;
  // eslint-disable-next-line consistent-return
  if (score) return score;
}

export function setLocalStorageScore(id: number, score: number) {
  const movieData = JSON.parse(localStorage.getItem(LOCAL_KEY)!);
  movieData[id].score = score;
  localStorage.setItem(LOCAL_KEY, JSON.stringify(movieData));
}

export function cacheingMovieDetailInLocalStorage(movieResponse: IMovieDetailResponse) {
  const movieData = JSON.parse(localStorage.getItem(LOCAL_KEY) ?? '{}');
  movieData[movieResponse.id] = {};
  movieData[movieResponse.id].data = movieResponse;
  movieData[movieResponse.id].score = undefined;
  localStorage.setItem(LOCAL_KEY, JSON.stringify(movieData));
}

export function getCachedMovieDetail(id: number) {
  const movieData = JSON.parse(localStorage.getItem(LOCAL_KEY) ?? '{}');
  if (!movieData || !movieData[id]) return { data: undefined };
  return { data: movieData[id].data as IMovieDetailResponse };
}
