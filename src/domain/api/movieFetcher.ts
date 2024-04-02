import validateResponse from "./validateResponse";

const API_URL = "https://api.themoviedb.org/3/";

type PathType = "POPULAR_MOVIE" | "SEARCHED_MOVIE" | "MOVIE_DETAIL";

export const PATH: Record<PathType, string> = {
  POPULAR_MOVIE: "movie/popular",
  SEARCHED_MOVIE: "search/movie",
  MOVIE_DETAIL: "movie",
};

const movieFetcher = async (path: string, queryParams: object = {}) => {
  if (process.env.API_KEY === undefined) {
    throw new Error("api key가 등록되어 있지 않습니다.");
  }

  const url = `${API_URL}${path}?${new URLSearchParams({
    api_key: process.env.API_KEY,
    ...queryParams,
  })}`;

  const res = await fetch(url);

  validateResponse(res.status);

  return await res.json();
};

export default movieFetcher;
