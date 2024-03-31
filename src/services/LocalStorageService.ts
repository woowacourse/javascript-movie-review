export interface StarRating {
  id: number;
  ratingNumber: number;
  ratingText: string;
}

export const LocalStorageService = {
  setData(key: string, data: StarRating[]) {
    localStorage.setItem(key, JSON.stringify(data));
  },

  getData(key: string) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },
};
