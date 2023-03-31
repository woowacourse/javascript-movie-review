import { detailUrl, popularUrl, searchUrl } from "../constants/urls";
import fetchApi from "../utils/fetchApi";

export const fetchMovieListWithKeyword = async (pageNumber, keyword) => {
  const url = `${searchUrl}?api_key=${process.env.WEBPACK_API_KEY}&query=${keyword}&language=ko&page=${pageNumber}`;

  return await fetchApi(url);
};

export const fetchPopularMovieList = async (pageNumber) => {
  const url = `${popularUrl}?api_key=${process.env.WEBPACK_API_KEY}&language=ko&page=${pageNumber}`;

  return await fetchApi(url);
};

export const fetchMovieDetail = async (id) => {
  const url = `${detailUrl}/${id}?api_key=${process.env.WEBPACK_API_KEY}&language=ko`;

  return await fetchApi(url);
};
