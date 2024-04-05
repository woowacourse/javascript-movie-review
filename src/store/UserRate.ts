export const getUserRateFromLocalStorage = (movieId: string) => {
  const localData = localStorage.getItem('userRates');
  const userRateData = localData ? JSON.parse(localData) : null;

  if (!userRateData || typeof userRateData !== 'object') return 0;

  const userRateMap = new Map(Object.entries(userRateData));
  const userRate = userRateMap.has(movieId) ? Number(userRateMap.get(movieId)) : 0;

  return userRate;
};

export const updateUserRateToLocalStorage = (movieId: string, rate: string) => {
  const localData = localStorage.getItem('userRates');
  const userRateData = localData ? JSON.parse(localData) : {};

  if (typeof userRateData !== 'object') return;

  userRateData[movieId] = rate;

  localStorage.setItem('userRates', JSON.stringify(userRateData));
};
