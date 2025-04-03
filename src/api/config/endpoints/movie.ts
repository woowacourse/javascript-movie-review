export const MOVIE_API = {
  BaseUrl: "https://api.themoviedb.org/3",
  endPoints: {
    movies: {
      popular: "movie/popular",
      search: "search/movie",
      genre: "genre/movie/list",
    },
  },
  defaultParams: {
    language: "ko-KR",
  },
} as const;

export const createMovieApiUrl = (
  endpoint: string,
  params?: Record<string, string>
) => {
  const searchParams = new URLSearchParams({
    ...MOVIE_API.defaultParams,
    ...params,
  });
  return `${MOVIE_API.BaseUrl}/${endpoint}?${searchParams.toString()}`;
};
