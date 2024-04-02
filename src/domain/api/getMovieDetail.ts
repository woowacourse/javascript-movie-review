import movieFetcher, { PATH } from "./movieFetcher";

const getMovieDetail = async ({
  movieId,
}: {
  movieId: number;
}): Promise<MovieDetailResult> => {
  const path = PATH.MOVIE_DETAIL;
  const queryParams = {
    language: "ko-KR",
  };

  return movieFetcher(`${path}/${movieId}`, queryParams);
};

export interface MovieDetailResult {
  id: number;
  title: string;
  genres: { id: number; name: string }[];
  overview: string;
  poster_path: string;
  vote_average: number;
}

export default getMovieDetail;
