import { IMovieItem } from "../types/movieResultType";

const MovieResults = () => {
  const movieList: IMovieItem[] = [];
  let page = 0;
  let maxPage = 0;

  const addMovieList = (newPage: number, list: IMovieItem[]) => {
    movieList.push(...list);
    page = newPage;
  };

  const initialTotalPage = (totalPage: number) => {
    maxPage = totalPage;
  };

  return {
    getMovieList: () => [...movieList],
    getPage: () => page,
    hasMore: () => page !== maxPage,
    addMovieList: addMovieList,
    initialTotalPage: initialTotalPage,
  };
};

export default MovieResults;
