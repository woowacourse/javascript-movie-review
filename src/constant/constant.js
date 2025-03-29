export const MOVIE_COUNT_PER_PAGE = 20;
export const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";
// export const RATING_MESSAGES = {
//     "0": "별점 미등록",
//     "2": "최악이에요",
//     "4": "별로예요",
//     "6": "보통이에요",
//     "8": "재밌어요",
//     "10": "명작이에요",
//   };
export const RATING_MESSAGES = {
    "0": {comment:"별점 미등록"},
    "2": {comment:"최악이에요", star:0},
    "4": {comment:"별로예요", star:1},
    "6": {comment:"보통이에요", star:2},
    "8": {comment:"재밌어요", star:3},
    "10": {comment:"명작이에요", star:4},
  };