import { RateMovieType } from '../type';

export const movieStorageManager = {
  getItem: (storageKey: string) => JSON.parse(localStorage.getItem(storageKey) ?? '[]') || [],
  setItem: (storageKey: string, value: RateMovieType[]) => localStorage.setItem(storageKey, JSON.stringify(value)),
  findItem: (storageKey: string, id: number): { rate: number; status: boolean } => {
    const data = movieStorageManager.getItem(storageKey);
    const item = data.filter((item: RateMovieType) => item.id === id);
    if (item.length > 0) {
      return { rate: item[0].rate, status: true };
    }

    return { rate: 0, status: false };
  },
  addItem: (storageKey: string, value: RateMovieType) => {
    const data = movieStorageManager.getItem(storageKey);
    movieStorageManager.setItem(storageKey, [...data, value]);
  },
  updateRate: (storageKey: string, movies: RateMovieType) => {
    const data = movieStorageManager.getItem(storageKey);

    const updateData = data.map((item: RateMovieType) =>
      item.id === movies.id ? { ...item, rate: movies.rate } : item
    );

    movieStorageManager.setItem(storageKey, updateData);
  }
};
