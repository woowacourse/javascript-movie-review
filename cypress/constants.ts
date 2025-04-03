export type RatingScore = 0 | 2 | 4 | 6 | 8 | 10;

export const RATING_COMMENTS: Record<RatingScore, string> = {
  0: '평가해주세요',
  2: '최악이예요',
  4: '별로예요',
  6: '보통이에요',
  8: '재미있어요',
  10: '명작이에요'
};
