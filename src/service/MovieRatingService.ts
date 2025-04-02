export interface MovieRating {
  movieId: number;
  rating: number;
}

const STORAGE_KEY = 'movie_ratings';

export const saveMovieRating = (movieId: number, rating: number): void => {
  try {
    const currentRatings = getMovieRatings();

    const existingIndex = currentRatings.findIndex(
      (item) => item.movieId === movieId,
    );

    if (existingIndex >= 0) {
      currentRatings[existingIndex].rating = rating;
    } else {
      currentRatings.push({ movieId, rating });
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentRatings));
  } catch (error) {
    console.error(error);
  }
};

export const getMovieRating = (movieId: number): number => {
  try {
    const currentRatings = getMovieRatings();
    const ratingItem = currentRatings.find((item) => item.movieId === movieId);

    return ratingItem ? ratingItem.rating : 0;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

export const getMovieRatings = (): MovieRating[] => {
  try {
    const ratingsJson = localStorage.getItem(STORAGE_KEY);

    if (!ratingsJson) {
      return [];
    }

    return JSON.parse(ratingsJson) as MovieRating[];
  } catch (error) {
    console.error(error);
    return [];
  }
};
