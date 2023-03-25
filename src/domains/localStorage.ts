export const setMovieSelfScore = (movieId: string, score: string | number) => {
  window.localStorage.setItem(movieId, String(score));
};

export const getMovieSelfScore = (movieId: string) => {
  const selfScore = Number(window.localStorage.getItem(movieId));

  return selfScore ?? 0;
};
