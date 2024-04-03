export const getUserRateFromLocalStorage = (movieId: string) => {
  const localData = localStorage.getItem(movieId);
  const userRate = Number(localData) ?? 0;

  return userRate;
};

export const updateUserRateToLocalStorage = (movieId: string, rate: string) => {
  if (Number(rate) === getUserRateFromLocalStorage(movieId)) return;
  localStorage.setItem(movieId, rate);
};
