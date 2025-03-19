export const URLS = {
  popularMovieUrl: "https://api.themoviedb.org/3/movie/popular",
  searchMovieUrl: "https://api.themoviedb.org/3/search/movie",
};

export const ERROR_MESSAGE = {
  FETCH_ERROR: "API 서버 상태가 좋지 않아 데이터를 가져오는데 실패했습니다.",
};
export const defaultOptions = {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
};
export const defaultQueryObject = {
  language: "ko-KR",
};

export const TOTAL_PAGE = 500;
