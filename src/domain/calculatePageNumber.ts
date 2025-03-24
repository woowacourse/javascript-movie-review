import { ITEMS } from "../constants/movie";

function calculatePageNumber(totalMovies: number) {
  return totalMovies / ITEMS.perPage + 1;
}

export default calculatePageNumber;
