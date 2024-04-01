import validateResponse from "./validateResponse";

const getMovieListByQuery = async ({
  page,
  query,
}: {
  page: number;
  query: string;
}): Promise<SearchMovieResponse> => {
  const url = "https://api.themoviedb.org/3/search/movie";
  const queryParams = `language=ko-KR&page=${page}&query=${query}&api_key=${process.env.API_KEY}`;
  const moviesUrl = `${url}?${queryParams}`;

  const res = await fetch(moviesUrl);
  validateResponse(res.status);

  const movieList = await res.json();

  return movieList;
};

export default getMovieListByQuery;

export interface SearchMovieResult {
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

export interface SearchMovieResponse {
  page: number;
  results: SearchMovieResult[];
  total_pages: number;
  total_results: number;
}
