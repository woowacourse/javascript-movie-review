import { MovieInfoType, TotalMovieInfoType } from "../@types/movieType";
import { MovieItem } from "../components/MovieItem";

export const convertMovieData = (movieItems: MovieInfoType[]) => {
  return movieItems?.map((item) => {
    const title = item?.title;
    const posterPath = item?.poster_path;
    const voteAverage = item?.vote_average;
    return { title, posterPath, voteAverage };
  });
};

export const generateElement = (movieData: MovieInfoType[]) => {
  const movieElement = convertMovieData(movieData)
    .map((item) => MovieItem(item))
    .join("");

  return movieElement;
};
