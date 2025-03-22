export const URLS = {
  popularMovieUrl: "https://api.themoviedb.org/3/movie/popular",
  searchMovieUrl: "https://api.themoviedb.org/3/search/movie",
};

export const defaultOptions = {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
};
export const defaultQueryObject = {
  language: "ko-KR",
  include_adult: false,
};

// 500이상 페이지를 불러오게 되면, 무의미 한 데이터들이 올라오기 때문에 limit를 뒀습니다.
export const TOTAL_PAGE = 500;
