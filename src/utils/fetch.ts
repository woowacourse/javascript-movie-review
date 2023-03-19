import { API, TMDB_BASE_URL } from "../constant/api";

const fetchAPI = async (url: string) => {
  const response = await fetch(url, { method: "GET" });
  if (response.status === 200) {
    return await response.json();
  }
  if (response.status === 401) {
    throw new Error(`${response.status} API KEY가 잘못되었습니다.`);
  }
  if (response.status === 422) {
    throw new Error(`${response.status} Page가 잘못되었습니다.`);
  }
  if (response.status === 404) {
    throw new Error(`${response.status} 페이지를 찾을 수 없습니다.`);
  }
  throw new Error(`${response.status}`);
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
