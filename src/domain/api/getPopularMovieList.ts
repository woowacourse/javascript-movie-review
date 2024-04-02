import movieFetcher, { PATH } from "./movieFetcher";

const getPopularMovieList = async ({
  page,
}: {
  page: number;
}): Promise<PopularMovieResponse> => {
  const path = PATH.POPULAR_MOVIE;
  const queryParams = {
    language: "ko-KR",
    page: page,
  };

  return movieFetcher(path, queryParams);
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
