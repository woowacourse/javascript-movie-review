import movieFetcher, { PATH } from "./movieFetcher";

const getMovieListByQuery = async ({
  page,
  query,
}: {
  page: number;
  query: string;
}): Promise<SearchMovieResponse> => {
  const path = PATH.SEARCHED_MOVIE;
  const queryParams = {
    language: "ko-KR",
    page: page,
    query: query,
  };

  return movieFetcher(path, queryParams);
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
