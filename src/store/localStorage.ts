import { RATING_MESSAGES } from '../constants/tmdbConstants';

const LOCAL_KEY = 'moviesScore';

export function getLocalStorageScore(id: number): keyof typeof RATING_MESSAGES | undefined {
  const movieData = localStorage.getItem(LOCAL_KEY);
  if (!movieData) return;
  const score = JSON.parse(movieData)[id];
  // eslint-disable-next-line consistent-return
  if (score) return score;
}

export function setLocalStorageScore(id: number, score: number) {
  const movieData = JSON.parse(localStorage.getItem(LOCAL_KEY) ?? '{}');
  movieData[id] = score;
  localStorage.setItem(LOCAL_KEY, JSON.stringify(movieData));
}
