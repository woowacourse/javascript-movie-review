import renderHandler from './renderHandler';

const RatingStars = (movieId: number) => {
  const ratingStars = renderHandler(movieId);

  return ratingStars;
};

export default RatingStars;
