export const URLS = {
  popularMovieUrl: "https://api.themoviedb.org/3/movie/popular",
  searchMovieUrl: "https://api.themoviedb.org/3/search/movie",
};

export const defaultOptions = {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
};
export const defaultQueryObject = new URLSearchParams({
  language: "ko-KR",
  include_adult: String(false),
});

export const TOTAL_PAGE = 500;
