import { STORAGE_KEY } from '../constant';
import { $ } from '../util/selector';
import { storageHandler } from '../util/storageHandler';

export const localStorageRate = (clickRate: number) => {
  const idInput = $('#movieId') as HTMLInputElement;
  const movieId = idInput.value;
  const result = storageHandler.isFindItem(STORAGE_KEY, Number(movieId));

  if (result.status) {
    storageHandler.updateRate(STORAGE_KEY, { rate: clickRate, id: Number(movieId) });
  } else {
    storageHandler.addItem(STORAGE_KEY, { rate: clickRate, id: Number(movieId) });
  }
};

export const renderRate = (id: number) => {
  const result = storageHandler.isFindItem(STORAGE_KEY, Number(id));

  return result;
};
