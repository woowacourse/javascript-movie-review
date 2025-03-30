import { ITEMS } from "../constants/movie";

const calculatePageNumber = (totalMovies: number) => {
  return Math.ceil(totalMovies / ITEMS.perPage) + 1;
};

export default calculatePageNumber;
