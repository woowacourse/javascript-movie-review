import validateResponse from "./validateResponse";

const getPopularMovieList = async ({
  page,
}: {
  page: number;
}): Promise<PopularMovieResponse> => {
  const url = "https://api.themoviedb.org/3/movie/popular";
  const queryParams = `language=ko-KR&page=${page}&api_key=${process.env.API_KEY}`;
  const popularMoviesUrl = `${url}?${queryParams}`;

  const res = await fetch(popularMoviesUrl);
  validateResponse(res.status);

  const popularMovieList = await res.json();

  return popularMovieList;
};

export default getPopularMovieList;

export interface PopularMovieResult {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface PopularMovieResponse {
  page: number;
  results: PopularMovieResult[];
  total_pages: number;
  total_results: number;
}
