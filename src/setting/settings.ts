export const URLS = {
  popularMovieUrl: "https://api.themoviedb.org/3/movie/popular",
  searchMovieUrl: "https://api.themoviedb.org/3/search/movie",
} as const;

export const defaultOptions = {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
} as const;
export const defaultQueryObject = {
  language: "ko-KR",
  include_adult: false,
} as const;

// 500이상 페이지를 불러오게 되면, 무의미 한 데이터들이 올라오기 때문에 limit를 뒀습니다.
export const TOTAL_PAGE = 500 as const;

export const paths = {
  logo: "./images/logo.png",
  search: "./images/Search.png",
  star_empty: "/images/star_empty.png",
} as const;
