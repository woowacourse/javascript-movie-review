import { RatingType } from '../types/ratings';

const rating = {
  getLocalData() {
    const data = JSON.parse(localStorage.getItem('ratings') ?? '[]');
    return data;
  },

  getLocalDataItem(id: number) {
    const dataList = this.getLocalData();
    return dataList.filter((data: RatingType) => data.id === id)[0] ?? { id, ratingValue: 0 };
  },
};

export default rating;
