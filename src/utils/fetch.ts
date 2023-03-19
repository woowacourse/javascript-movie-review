import { API, TMDB_BASE_URL } from "../constant/api";

const fetchAPI = async (url: string) => {
  const response = await fetch(url, { method: "GET" });
  if (response.status === 200) {
    return await response.json();
  }
  throw new Error("통신오류가 발생하였습니다.");
};

export const getPopularMovies = async (page: number): Promise<parsedJson> => {
  const url = `${TMDB_BASE_URL}${API.GET_POPULAR}?api_key=${process.env.API_KEY}&language=ko-KR&page=${page}`;
  const response = await fetchAPI(url);

  return response;
};

export const getSearchedMovies = async (
  movieName: string,
  page: number
): Promise<parsedJson> => {
  const url = `${TMDB_BASE_URL}${API.SEARCH_MOVIES}?api_key=${process.env.API_KEY}&language=ko-KR&query=${movieName}&page=${page}&include_adult=false`;
  const response = await fetchAPI(url);

  return response;
};
