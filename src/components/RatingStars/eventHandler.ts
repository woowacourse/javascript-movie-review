const handleMouseover = (updateStars: (rating: number) => void, rating: number) => {
  return () => {
    updateStars(rating);
  };
};

const handleClick =
  ({ rating, movieId }: { rating: number; movieId: number }) =>
  () => {
    const ratingsStr = localStorage.getItem('movieRatings');
    const ratings = ratingsStr ? JSON.parse(ratingsStr) : [];

    const existingRatingIndex = ratings.findIndex((item: any) => item.movieId === movieId);

    if (existingRatingIndex >= 0) {
      ratings[existingRatingIndex].rating = rating;
    } else {
      ratings.push({ movieId, rating: rating });
    }

    localStorage.setItem('movieRatings', JSON.stringify(ratings));
  };

export { handleMouseover, handleClick };
