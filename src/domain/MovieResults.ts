import { IMovieItem } from "../types/movieResultType";

const MovieResults = () => {
  const movieList: IMovieItem[] = [];
  let page = 0;

  const addMovieList = (newPage: number, list: IMovieItem[]) => {
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
