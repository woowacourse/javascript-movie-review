import { API, TMDB_BASE_URL } from "../constant/api";

export const getPopularMovies = async (page: number) => {
  const response = await fetch(
    `${TMDB_BASE_URL}${API.GET_POPULAR}?api_key=${process.env.API_KEY}&language=ko-KR&page=${page}`,
    {
      method: "GET",
    }
  );

  return response.json();
};
