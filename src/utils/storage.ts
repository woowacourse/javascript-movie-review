export const getStarRateById = (movieId: number) => {
  const storageData = localStorage.getItem("starRate");

  if (storageData) {
    const starRate = JSON.parse(storageData)[`${movieId}`];

    if (starRate) return Number(starRate);
  }

  return 0;
};

export const setStarRateById = (movieId: number, starRate: number) => {
  const storageData = localStorage.getItem("starRate");

  if (storageData) {
    const json = JSON.parse(storageData);

    localStorage.setItem(
      "starRate",
      JSON.stringify({ ...json, [movieId]: starRate })
    );

    return;
  }

  localStorage.setItem("starRate", JSON.stringify({ [movieId]: starRate }));
};
