import { Movie } from "../../../types/responseType/responseType";
import { options, url } from "../config/config";

export interface MovieDetail extends Movie {
  overview: string;
  genres: { id: number; name: string }[];
  release_date: string;
}

const useGetMovieDetail = () => {
  const fetchMovieDetail = async (
    movieId: string
  ): Promise<MovieDetail | null> => {
    try {
      const response = await fetch(url.detail(movieId), options);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("영화 디테일을 불러오는데 실패", error);
      return null;
    }
  };

  return { fetchMovieDetail };
};

export default useGetMovieDetail;
