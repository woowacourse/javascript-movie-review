import { POPULAR_MOVIES_URL, MOVIE_SEARCH_URL } from '../../../constants/DTO';

async function fetchPopularMovies(page: number) {
  const KEY = process.env.API_KEY;
  const popularMovieUrl =
    POPULAR_MOVIES_URL +
    '?' +
    new URLSearchParams({
      api_key: KEY as string,
      language: 'ko-KR',
      page: `${page}`,
    });

  const response = await fetch(popularMovieUrl);
  const popularMovies = await response.json();

  return popularMovies;
}

async function fetchSearchMovies(page: number, userInput: string) {
  const KEY = process.env.API_KEY;
  const popularMovieUrl =
    MOVIE_SEARCH_URL +
    '?' +
    new URLSearchParams({
      api_key: KEY as string,
      query: userInput,
      language: 'ko-KR',
      page: `${page}`,
    });

  const response = await fetch(popularMovieUrl);
  const popularMovies = await response.json();

  return popularMovies;
}

export { fetchPopularMovies, fetchSearchMovies };
