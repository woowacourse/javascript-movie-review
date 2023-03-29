export const setMovieSelfScore = (movieId: string, score: string) => {
  window.localStorage.setItem(movieId, score);
};

export const getMovieSelfScore = (movieId: string) => {
  const selfScore = Number(window.localStorage.getItem(movieId));

  return selfScore ?? 0;
};
