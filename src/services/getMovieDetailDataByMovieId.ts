import { api } from '../api';
import { API_ENDPOINT, API_OPTION } from '../constants/api/api';

const getMovieDetailDataByMovieId = async (movieId: number) => {
  const movieDetailData = await api.sendRequest(API_ENDPOINT.ID(movieId), {
    headers: API_OPTION.headers,
  });

  return movieDetailData;
};

export default getMovieDetailDataByMovieId;
