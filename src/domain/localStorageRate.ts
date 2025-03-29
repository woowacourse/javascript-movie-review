import { STORAGE_KEY } from '../constant';
import { $ } from '../util/selector';
import { storageHandler } from '../util/storageHandler';

export const localStorageRate = (rate: number) => {
  const idInput = $('#movieId') as HTMLInputElement;
  const movieId = idInput.value;

  if (storageHandler.isFindItem(STORAGE_KEY, Number(movieId))) {
    storageHandler.updateRate(STORAGE_KEY, { rate, id: Number(movieId) });
  } else {
    storageHandler.addItem(STORAGE_KEY, { rate, id: Number(movieId) });
  }
};
