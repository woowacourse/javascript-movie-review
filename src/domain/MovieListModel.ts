import { IMovieItem } from "../types/movieResultType";

const MovieListModel = () => {
  const movieList: IMovieItem[] = [];
  let page = 0;
  let maxPage = 0;

  const addMovieList = (newPage: number, list: IMovieItem[]) => {
    movieList.push(...list);
    page = newPage;
  };

  const initializeTotalPage = (totalPage: number) => {
    maxPage = totalPage;
  };

  return {
    getMovieList: () => [...movieList],
    getPage: () => page,
    hasMore: () => page !== maxPage,
    addMovieList,
    initializeTotalPage,
  };
};

export default MovieListModel;
