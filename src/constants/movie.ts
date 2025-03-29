export const IMAGE = {
  prefix: "https://media.themoviedb.org/t/p/w440_and_h660_face",
  backdropPrefix: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces",
};

export const ITEMS = {
  perPage: 20,
  initialCount: 0,
};

export const DETAILS = {
  defaultOverview: "줄거리 정보가 없습니다.",
};

export const VOTE = {
  rateDegit: 1,
  defaultRate: 0,
  MaximumRate: 10,
  maximumIconCount: 5,
  unitRate: 2,
  noticeMessage: "평점 없음",
  filledStarImage: "./images/star_filled.png",
  emptyStarImage: "./images/star_empty.png",
};

export const RATING_SCORE: Record<number, number> = {
  1: 2,
  2: 4,
  3: 6,
  4: 8,
  5: 10,
};

export const RATING_MESSAGE: Record<number, string> = {
  2: "최악이예요",
  4: "별로예요",
  6: "보통이에요",
  8: "재미있어요",
  10: "명작이에요",
};
