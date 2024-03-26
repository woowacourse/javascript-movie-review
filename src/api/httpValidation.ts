import { MovieListType } from '../types/movie';
import HTTPError from './HttpError';

const httpValidation = (statusCode: number, movieList: MovieListType) => {
  if (statusCode !== 200) {
    throw new HTTPError(statusCode);
  }

  if (movieList.length === 0) {
    throw new HTTPError(200, '검색된 영화가 없습니다 💢');
  }
};

export default httpValidation;
