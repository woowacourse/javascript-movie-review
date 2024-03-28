import { RatingListType, RatingType } from '../types/ratings';

const rating = {
  getLocalData(): RatingListType {
    const data = JSON.parse(localStorage.getItem('ratings') ?? '[]');
    return data;
  },

  getLocalDataItem(id: number) {
    const dataList = this.getLocalData();
    return dataList.filter((data: RatingType) => data.id === id)[0] ?? { id, ratingValue: 0 };
  },

  updateLocalData(id: number, ratingValue: number) {
    const dataList = this.getLocalData();
    const isIncluded = dataList.filter((data: RatingType) => data.id === id).length > 0;
    const newData = { id, ratingValue };

    const updatedData = dataList.map((data: RatingType) => {
      if (data.id !== id) return data;
      return newData;
    });
    if (!isIncluded) updatedData.push(newData);
    localStorage.setItem('ratings', JSON.stringify(updatedData));
  },
};

export default rating;
