import { FetchingDetailOfMovieType, FetchingMovieType } from '../../type/movie';

const API_KEY = process.env.API_KEY;
const BASE_URL = `https://api.themoviedb.org/3/`;

export const getApiPopularMovie = async (
  page: number
): Promise<FetchingMovieType> => {
  const fetchingData = await fetch(
    `${BASE_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
  );

  const status = fetchingData.status;
  const movieList = await fetchingData.json();

  return { movieList, status };
};

export const getApiSearchMovie = async (
  query: string,
  page: number
): Promise<FetchingMovieType> => {
  const fetchingData = await fetch(
    `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`
  );

  const status = fetchingData.status;
  const movieList = await fetchingData.json();

  return { movieList, status };
};

export const getApiDetailMovie = async (
  id: number
): Promise<FetchingDetailOfMovieType> => {
  const fetchingData = await fetch(
    `${BASE_URL}movie/${id}?api_key=${API_KEY}&language=en-US`
  );

  const status = fetchingData.status;
  const movieItem = await fetchingData.json();

  return { movieItem, status };
};
