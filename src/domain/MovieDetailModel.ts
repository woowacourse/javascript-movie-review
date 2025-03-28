import { IMovieDetail } from "./../types/movieResultType";
import { getMovieDetailResult } from "../api/getMovieDetailResult";
import LocalStorage from "../util/LocalStorage";

const MovieDetailModel = () => {
  let movieDetails: IMovieDetail[] = [];

  const localStorage = LocalStorage<IMovieDetail[]>();

  const storedMovieResults = localStorage.getItem("storedMovieResults");
  if (storedMovieResults) {
    movieDetails = storedMovieResults;
  }

  const getMovieDetailById = async (movieId: number) => {
    const movieItem = movieDetails.find((movie: IMovieDetail) => movie.id === movieId);
    if (movieItem) {
      return movieItem;
    } else {
      const movieItem = await getMovieDetailResult(movieId);
      const addMovieItem = {
        id: movieItem.id,
        poster_path: movieItem.poster_path,
        title: movieItem.title,
        release_date: movieItem.release_date,
        genres: movieItem.genres,
        overview: movieItem.overview,
        vote_average: movieItem.vote_average,
        starScore: 0,
      } as IMovieDetail;
      addDetailMovieResult(addMovieItem);
      return addMovieItem;
    }
  };

  const addDetailMovieResult = (movieItem: IMovieDetail) => {
    movieDetails.push(movieItem);
    updateLocalStorage();
  };

  const updateStarScore = (movieId: number, score: number) => {
    const targetMovie = movieDetails.find((movie) => movie.id === movieId);
    if (targetMovie) {
      targetMovie.starScore = score;
    }

    updateLocalStorage();
  };

  const updateLocalStorage = () => {
    localStorage.setItem("storedMovieResults", movieDetails);
  };

  return {
    getMovieDetailById,
    updateStarScore,
  };
};

export default MovieDetailModel;
