import { MovieList } from "../types/movieResultType";

const MovieResults = () => {
  const movieList: MovieList[] = [];
  let page = 0;

  const addMovieList = (newPage: number, list: MovieList[]) => {
    movieList.push(...list);
    page = newPage;
  };

  return {
    getMovieList: () => [...movieList],
    getPage: () => page,
    addMovieList: addMovieList,
  };
};

export default MovieResults;
