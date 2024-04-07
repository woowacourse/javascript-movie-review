import MOVIE_REVIEW_MESSAGES from "../constants/messages";

const getReviewMessageByRating = (rating: number) => {
  switch (rating) {
    case 1:
      return MOVIE_REVIEW_MESSAGES.worst;
    case 2:
      return MOVIE_REVIEW_MESSAGES.bad;
    case 3:
      return MOVIE_REVIEW_MESSAGES.normal;
    case 4:
      return MOVIE_REVIEW_MESSAGES.good;
    case 5:
      return MOVIE_REVIEW_MESSAGES.best;
    default:
      return MOVIE_REVIEW_MESSAGES.default;
  }
};

export default getReviewMessageByRating;
