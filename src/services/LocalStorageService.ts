import { TotalMovieItemProps } from '../types/movie';
import LOCAL_STORAGE from '../constants/api/localStorage';

const LocalStorageService = {
  getData(): TotalMovieItemProps[] {
    const data = localStorage.getItem(LOCAL_STORAGE.KEY);
    if (data) {
      return JSON.parse(data);
    }
    return [];
  },

  setData(data: TotalMovieItemProps[]) {
    localStorage.setItem(LOCAL_STORAGE.KEY, JSON.stringify(data));
  },
};

export default LocalStorageService;
