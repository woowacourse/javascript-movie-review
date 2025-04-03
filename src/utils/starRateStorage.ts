import { getLocalStorage, setLocalStorage } from "./localStorage";

type StarRateStorage = Record<string, number>;

const STAR_RATE_STORAGE_ID = "starRateStorageId";

export const setMovieStarRate = (id: number, starRate: number) => {
  const starRateStorage = getLocalStorage<StarRateStorage>(
    STAR_RATE_STORAGE_ID,
    {}
  );

  setLocalStorage<StarRateStorage>(STAR_RATE_STORAGE_ID, {
    ...starRateStorage,
    [id]: starRate,
  });
};

export const getStarRateByMovieId = (id: number) => {
  if (
    JSON.parse(localStorage.getItem(STAR_RATE_STORAGE_ID) ?? "{}")[id] ===
    undefined
  ) {
    setMovieStarRate(id, 0);
  }

  const starRateStorage = getLocalStorage<StarRateStorage>(
    STAR_RATE_STORAGE_ID,
    {}
  );

  return starRateStorage[String(id)];
};
