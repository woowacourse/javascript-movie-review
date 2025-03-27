export const URLS = {
  config: "https://api.themoviedb.org/3/configuration",
  popularMovieUrl: "https://api.themoviedb.org/3/movie/popular",
  searchMovieUrl: "https://api.themoviedb.org/3/search/movie",
  detailsMovieUrl: "https://api.themoviedb.org/3/movie",
} as const;

export const defaultOptions = {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
} as const;
export const defaultQueryObject = {
  language: "ko-KR",
  include_adult: "false",
} as const;

// 500이상 페이지를 불러오게 되면, 무의미 한 데이터들이 올라오기 때문에 limit를 뒀습니다.
export const TOTAL_PAGE = 500 as const;

export const paths = {
  logo: "./images/logo.png",
  search: "./images/Search.png",
  star_empty: "./images/star_empty.png",
} as const;
export const ratingMessages = {
  "1": "최악이예요",
  "2": "별로예요",
  "3": "보통이에요",
  "4": "재미있어요",
  "5": "명작이에요",
} as const;
export const ratingNumbers = {
  "1": "(2/10)",
  "2": "(4/10)",
  "3": "(6/10)",
  "4": "(8/10)",
  "5": "(10/10)",
} as const;

export const defaultRating = 3 as const;
