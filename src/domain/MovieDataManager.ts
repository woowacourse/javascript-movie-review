import { TotalMovieInfoType } from "../@types/movieType";
import { MovieItem } from "../components/MovieItem";

export const convertMovieData = (movieItems: TotalMovieInfoType[]) => {
  return movieItems.map((item) => {
    const id = item.id;
    const title = item.title;
    const posterPath = item.poster_path;
    const voteAverage = item.vote_average;
    return { id, title, posterPath, voteAverage };
  });
};

export const convertToMovieDetailData = (movieItem: TotalMovieInfoType) => {
  const id = movieItem.id;
  const title = movieItem.title;
  const posterPath = movieItem.poster_path;
  const voteAverage = movieItem.vote_average;
  const genres = movieItem.genres?.map(genre => genre.name);
  const overview = movieItem.overview;

  return { id, title, posterPath, voteAverage, genres, overview };
};

export const generateElement = (movieData: TotalMovieInfoType[]) => {
  const movieElement = convertMovieData(movieData)
    .map((item) => MovieItem(item))
    .join("");

  return movieElement;
};
