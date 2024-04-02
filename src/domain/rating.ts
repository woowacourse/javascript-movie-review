import { RatingListType, RatingType, ClickedRatingValueType } from '../types/ratings';

const rating = {
  getLocalData(): RatingListType {
    const data = JSON.parse(localStorage.getItem('ratings') ?? '[]') as RatingListType;
    return data;
  },

  getLocalDataItem(id: number): RatingType {
    const dataList = this.getLocalData();
    return dataList.find((data) => data.id === id) ?? { id, ratingValue: 0 };
  },

  updateLocalData(id: number, ratingValue: ClickedRatingValueType) {
    const dataList = this.getLocalData();
    const newData: RatingType = { id, ratingValue };
    const updatedDataList = dataList.map((data) => (data.id !== id ? data : newData));

    if (!dataList.some((data) => data.id === id)) {
      updatedDataList.push(newData);
    }

    localStorage.setItem('ratings', JSON.stringify(updatedDataList));
  },
};

export default rating;
