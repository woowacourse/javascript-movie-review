import { KEY, MOVIE_SEARCH_BASE_URL, POPULAR_MOVIES_BASE_URL } from '../../../constants/DTO';

async function fetchPopularMovies(page: number) {
  const searchParamsURL = new URLSearchParams({
    api_key: KEY as string,
    language: 'ko-KR',
    page: String(page),
  });

  const popularMoviesURL = POPULAR_MOVIES_BASE_URL + searchParamsURL;
  const response = await fetch(popularMoviesURL);

  return await response.json();
}

async function fetchSearchMovies(page: number, userInput: string) {
  const searchParamsURL = new URLSearchParams({
    api_key: KEY as string,
    query: userInput,
    language: 'ko-KR',
    page: String(page),
  });

  const movieSearchUrl = MOVIE_SEARCH_BASE_URL + searchParamsURL;
  const response = await fetch(movieSearchUrl);

  return await response.json();
}

export { fetchPopularMovies, fetchSearchMovies };
