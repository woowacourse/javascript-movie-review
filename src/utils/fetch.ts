import { API, TMDB_BASE_URL } from "../constant/api";

export const getPopularMovies = async (page: number) => {
  const response = await fetch(
    `${TMDB_BASE_URL}${API.GET_POPULAR}?api_key=${process.env.API_KEY}&language=ko-KR&page=${page}`,
    {
      method: "GET",
    }
  );

  if (response.ok) return response.json();
  else {
    const errorMessage = `인기 영화 가져오기, 페이지: ${page}\n\n서버에서 오류가 발생했습니다.`;
    alert(errorMessage);
    throw new Error(errorMessage);
  }
};

export const getSearchedMovies = async (movieName: string, page: number) => {
  const response = await fetch(
    `${TMDB_BASE_URL}${API.SEARCH_MOVIES}?api_key=${process.env.API_KEY}&language=ko-KR&query=${movieName}&page=${page}&include_adult=false`,
    {
      method: "GET",
    }
  );

  if (response.ok) return response.json();
  else {
    const errorMessage = `검색어: ${movieName}, 페이지: ${page}\n\n서버에서 오류가 발생했습니다.`;
    alert(errorMessage);
    throw new Error(errorMessage);
  }
};
