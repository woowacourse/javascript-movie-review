import { STORAGE_KEY } from '../constant';
import { currentRateType } from '../type';
import { movieStorageManager } from './movieStorageManager';

export const saveMovieRateToStorage = (id: number, rate: number) => {
  const result = movieStorageManager.findItem(STORAGE_KEY, id);

  if (result.status) {
    movieStorageManager.updateRate(STORAGE_KEY, { rate, id });
  } else {
    movieStorageManager.addItem(STORAGE_KEY, { rate, id });
  }
};

export const getStoredRate = (id: number): currentRateType => {
  const result = movieStorageManager.findItem(STORAGE_KEY, id);

  return result;
};
