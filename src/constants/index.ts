import { ErrorMessage } from '../types/movie';

export const BASE_URL = 'https://api.themoviedb.org/3/';

export const IMAGE_URL = 'https://image.tmdb.org/t/p/original';

export const ERROR_MESSAGE: ErrorMessage = {
  DATA_LOAD: '데이터를 불러올 수 없습니다.',
};

export const DEFAULT_LIST_LENGTH = 20;

export const MAX_PAGE = 500;
