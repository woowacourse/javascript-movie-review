import { ITEMS } from "../constants/movie";

const calculatePageNumber = (totalMovies: number) => {
  return totalMovies / ITEMS.perPage + 1;
};

export default calculatePageNumber;
