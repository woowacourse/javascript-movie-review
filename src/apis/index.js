import { detailUrl, popularUrl, searchUrl } from "../constants/urls";
import fetchApi from "../utils/fetchApi";

const fetchApiWithValidation = async (url) => {
  const fetchedData = await fetchApi(url);
  if (fetchedData.status_code) {
    const error = {
      message: "API Error",
      code: fetchedData.status_code,
    };
    throw error;
  }

  return fetchedData;
};

export const fetchMovieListWithKeyword = async (pageNumber, keyword) => {
  const url = `${searchUrl}?api_key=${process.env.WEBPACK_API_KEY}&query=${keyword}&language=ko&page=${pageNumber}`;

  return await fetchApiWithValidation(url);
};

export const fetchPopularMovieList = async (pageNumber) => {
  const url = `${popularUrl}?api_key=${process.env.WEBPACK_API_KEY}&language=ko&page=${pageNumber}`;

  return await fetchApiWithValidation(url);
};

export const fetchMovieDetail = async (id) => {
  const url = `${detailUrl}/${id}?api_key=${process.env.WEBPACK_API_KEY}&language=ko`;

  return await fetchApiWithValidation(url);
};
