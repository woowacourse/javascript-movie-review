import { popularUrl, searchUrl } from "../constants/urls";
import fetchApi from "../utils/fetchApi";
import { IMoviesResponseData } from "../types/IMovieResponseData";

type TFetchMovieListWithKeyword = (
  pageNumber: number,
  keyword: string
) => Promise<IMoviesResponseData>;
type TFetchPopularMovieList = (pageNumber: number) => Promise<IMoviesResponseData>;

export const fetchMovieListWithKeyword: TFetchMovieListWithKeyword = async (
  pageNumber,
  keyword
) => {
  const url = `${searchUrl}?api_key=${process.env.WEBPACK_API_KEY}&query=${keyword}&language=ko&page=${pageNumber}`;

  return await fetchApi(url);
};

export const fetchPopularMovieList: TFetchPopularMovieList = async (pageNumber) => {
  const url = `${popularUrl}?api_key=${process.env.WEBPACK_API_KEY}&language=ko&page=${pageNumber}`;

  return await fetchApi(url);
};
