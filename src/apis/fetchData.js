const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const POPULAR_MOVIES_URL = `${BASE_URL}/movie/popular`;
const MOVIE_SEARCH_URL = `${BASE_URL}/search/movie`;

export async function fetchPopularMovieList(pageNumber) {
  try {
    const popularMovieUrl =
      POPULAR_MOVIES_URL +
      '?' +
      new URLSearchParams({
        api_key: API_KEY,
        language: 'ko-KR',
        page: pageNumber.toString(),
      });

    const response = await fetch(popularMovieUrl);
    const popularMovies = await response.json();

    return popularMovies;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export async function fetchSearchMovieList(inputValue, pageNumber) {
  try {
    const searchMovieUrl =
      MOVIE_SEARCH_URL +
      '?' +
      new URLSearchParams({
        query: inputValue,
        api_key: API_KEY,
        language: 'ko-KR',
        page: pageNumber.toString(),
      });

    const response = await fetch(searchMovieUrl);
    const searchMovies = await response.json();

    return searchMovies;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
