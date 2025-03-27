export const MOVIE_API = {
  BaseUrl: "https://api.themoviedb.org/3",
  endPoints: {
    movies: {
      popular: "movie/popular",
      search: "search/movie",
    },
  },
} as const;

export const createMovieApiUrl = (
  endpoint: string,
  params: Record<string, string>
) => {
  const searchParams = new URLSearchParams(params);
  return `${MOVIE_API.BaseUrl}/${endpoint}?${searchParams.toString()}`;
};
