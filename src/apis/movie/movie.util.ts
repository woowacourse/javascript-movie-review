import MovieAPI from './movie';

export const isMovieErrorStatusCode = (status: number): status is keyof typeof MovieAPI.ERROR_MESSAGES_MAP => {
  return status in MovieAPI.ERROR_MESSAGES_MAP;
};
