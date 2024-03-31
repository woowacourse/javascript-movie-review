import { TotalMovieItemProps } from '../types/movie';
import LOCAL_STORAGE from '../constants/api/localStorage';
import HttpError from '../error/HttpError';
import ERROR_MESSAGE from '../constants/api/messages';

const LocalStorageService = {
  getData(): TotalMovieItemProps[] {
    const data = localStorage.getItem(LOCAL_STORAGE.KEY);
    if (!data) {
      const error = new HttpError(ERROR_MESSAGE.FAIL_GET_DATA_FROM_LOCAL_STORAGE, 503);
      throw error;
    }
    return JSON.parse(data);
  },

  setData(data: TotalMovieItemProps[]) {
    localStorage.setItem(LOCAL_STORAGE.KEY, JSON.stringify(data));
  },
};

export default LocalStorageService;
