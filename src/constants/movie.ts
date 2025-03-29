export const IMAGE = {
  prefix: "https://media.themoviedb.org/t/p/w440_and_h660_face",
  backdropPrefix: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces",
};

export const ITEMS = {
  perPage: 20,
  initialCount: 0,
};

export const VOTE = {
  rateDegit: 1,
  defaultRate: 0,
  MaximumRate: 10,
  maximumIconCount: 5,
  noticeMessage: "평점을 남겨주세요",
  filledStarImage: "./images/star_filled.png",
  emptyStarImage: "./images/star_empty.png",
};

export const RATING: Record<number, { score: number; text: string }> = {
  1: { score: 2, text: "최악이예요" },
  2: { score: 4, text: "별로예요" },
  3: { score: 6, text: "보통이에요" },
  4: { score: 8, text: "재미있어요" },
  5: { score: 10, text: "명작이에요" },
};
