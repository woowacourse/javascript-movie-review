export const requestLocalStorage = {
  setMyRating: (item: { movieId: number; score: number }[]): void => {
    localStorage.setItem("myRating", JSON.stringify(item));
  },

  getMyRating: (): { movieId: number; score: number }[] | [] => {
    const item = localStorage.getItem("myRating");
    if (item) return JSON.parse(item);
    return [];
  },
};
