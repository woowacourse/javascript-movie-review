import { API, TMDB_BASE_URL } from "../constant/api";
import { RESPONSE_ERROR } from "../constant/error";

const fetchAPI = async (url: string): Promise<any> => {
  const response = await fetch(url, { method: "GET" });

  const { status } = response;
  if (status === 200) return await response.json();

  const responseError = RESPONSE_ERROR[status];
  if (!responseError) throw new Error(`${status}`);
  throw new Error(responseError);
};

export const getPopularMovies = async (
  page: number
): Promise<movieListResponse> => {
  const url = `${TMDB_BASE_URL}${API.GET_POPULAR}?api_key=${process.env.API_KEY}&language=ko-KR&page=${page}`;
  const response = await fetchAPI(url);

  return response;
};

export const getSearchedMovies = async (
  movieName: string,
  page: number
): Promise<movieListResponse> => {
  const url = `${TMDB_BASE_URL}${API.SEARCH_MOVIES}?api_key=${process.env.API_KEY}&language=ko-KR&query=${movieName}&page=${page}&include_adult=false`;
  const response = await fetchAPI(url);

  return response;
};

export const getMovieDetail = async (
  movieId: number
): Promise<movieDetailResponse> => {
  const url = `${TMDB_BASE_URL}${API.SEARCH_MOVIE_DETAIL}/${movieId}?api_key=${process.env.API_KEY}&language=ko-KR`;
  const response = await fetchAPI(url);

  return response;
};
