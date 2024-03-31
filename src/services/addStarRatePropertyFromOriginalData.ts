import { MovieItemProps, TotalMovieItemProps } from '../types/movie';

const addStarRatePropertyFromOriginalData = (originalData: MovieItemProps[]): TotalMovieItemProps[] => {
  return originalData.map((item) => ({
    ...item,
    star_rating: 0,
  }));
};

export default addStarRatePropertyFromOriginalData;
