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

  updateLocalData(id: number, ratingValue: number) {
    const dataList = this.getLocalData();
    const exceptForIdData = dataList.map((data: RatingType) => {
      if (data.id !== id) {
        return data;
      }
    });
    const newData = [...exceptForIdData, { id, ratingValue }];
    localStorage.setItem('ratings', JSON.stringify(newData));
  },
};

export default rating;
