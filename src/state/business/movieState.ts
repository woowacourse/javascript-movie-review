import { nextPageNum, nextSearchPageNum } from "../domain/moviePage";
import { requestMovieCount } from "../domain/requestMovieCount";

const getNextPageNum = nextPageNum[0];
const setNextPageNum = nextPageNum[1];

const getNextSearchPageNum = nextSearchPageNum[0];
const setNextSearchPageNum = nextSearchPageNum[1];

const getRequestMovieCount = requestMovieCount[0];
const setRequestMovieCount = requestMovieCount[1];

const MovieState = {
  getNextPageNum,
  setNextPageNum,
  getNextSearchPageNum,
  setNextSearchPageNum,
  getRequestMovieCount,
  setRequestMovieCount,
};

export default MovieState;
