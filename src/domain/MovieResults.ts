import { MovieItemType } from "../types/movieResultType";

const MovieResults = () => {
  const movieList: MovieItemType[] = [];
  let page = 0;
  let maxPage = 0;

  const addMovieList = (newPage: number, list: MovieItemType[]) => {
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
    addMovieList,
    initialTotalPage,
  };
};

export default MovieResults;
