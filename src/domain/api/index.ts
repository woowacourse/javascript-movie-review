import { FetchingMovieType } from '../../type/movie';

const API_KEY = process.env.API_KEY;
const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`;
const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US`;
const detailUrl = `https://api.themoviedb.org/3/movie`;

export const getApiPopularMovie = async (
  page: number
): Promise<FetchingMovieType> => {
  const fetchingData = await fetch(`${popularUrl}&page=${page}`);

  const status = fetchingData.status;
  const movieList = await fetchingData.json();

  return { movieList, status };
};

export const getApiSearchMovie = async (
  query: string,
  page: number
): Promise<FetchingMovieType> => {
  const fetchingData = await fetch(
    `${searchUrl}&query=${query}&page=${page}&include_adult=false`
  );

  const status = fetchingData.status;
  const movieList = await fetchingData.json();

  return { movieList, status };
};

export const getApiDetailMovie = async (id: number): Promise<any> => {
  const fetchingData = await fetch(
    `${detailUrl}/${id}?api_key=${API_KEY}&language=en-US`
  );

  const status = fetchingData.status;
  const movieItem = await fetchingData.json();

  return { movieItem, status };
};
