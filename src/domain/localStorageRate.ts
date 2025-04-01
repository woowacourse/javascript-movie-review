import { STORAGE_KEY } from '../constant';
import { storageHandler } from '../util/storageHandler';

export const saveMovieRateToStorage = (id: number, rate: number) => {
  const result = storageHandler.findItem(STORAGE_KEY, id);

  if (result.status) {
    storageHandler.updateRate(STORAGE_KEY, { rate, id });
  } else {
    storageHandler.addItem(STORAGE_KEY, { rate, id });
  }
};

export const getStoredRate = (id: number) => {
  const result = storageHandler.findItem(STORAGE_KEY, id);

  return result;
};
