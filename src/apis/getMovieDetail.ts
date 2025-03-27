import { MovieDetail, TmdbMovieDetail } from "../../types/type";
import { tmdbClient } from "./api";

const transformMovieDetail = (tmdbDetail: TmdbMovieDetail): MovieDetail => {
  const safeParseDate = (dateString: string): number => {
    try {
      const date = new Date(dateString).getFullYear();
      return isNaN(date) ? 0 : date;
    } catch (error) {
      return 0;
    }
  };

  return {
    id: tmdbDetail.id,
    title: tmdbDetail.title,
    overview: tmdbDetail.overview,
    poster_path: tmdbDetail.poster_path,
    backdrop_path: tmdbDetail.backdrop_path,
    vote_average: tmdbDetail.vote_average,
    genres: tmdbDetail.genres.map((genre) => genre.name),
    release_year: safeParseDate(tmdbDetail.release_date),
  };
};

const getMovieDetail = async (movieId: number): Promise<MovieDetail> => {
  const response = await tmdbClient.get(`/movie/${movieId}?language=ko-KR`);

  if ("status_message" in response) {
    throw new Error(response.status_message);
  }

  return transformMovieDetail(response);
};

export default getMovieDetail;
