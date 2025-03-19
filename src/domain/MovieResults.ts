import { MovieList } from "../types/movieResultType";

const MovieResults = () => {
  const movieList: MovieList[] = [];
  let page = 0;

  const addMovieList = (page: number, list: MovieList[]) => {
    movieList.push(...list);
    page = page;
  };

  return {
    movieList: movieList,
    page: page,
    addMovieList: addMovieList,
  };
};
