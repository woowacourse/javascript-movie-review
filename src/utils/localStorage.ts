export const requestLocalStorage = {
  setMyRating: (item: MyRating): void => {
    localStorage.setItem('myRating', JSON.stringify(item));
  },

  getMyRating: (): MyRating => {
    const item = localStorage.getItem('myRating');
    if (item) return JSON.parse(item);
    return [];
  },
};
