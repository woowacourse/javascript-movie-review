import renderHandler from './renderHandler';

const RatingStars = (movieId: number) => {
  console.log('movieId', movieId);
  const ratingStars = renderHandler(movieId);

  return ratingStars;
};

export default RatingStars;
