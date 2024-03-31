export const STAR_RATES = Object.freeze([0, 2, 4, 6, 8, 10]);

export const RATE_STANDARD = 2;
export const MAX_STAR_LENGTH = 10;

const MATCHED_STAR_RATING = [
  {
    RATE: 0,
    TEXT: '별점을 남겨주세요!',
  },
  {
    RATE: 2,
    TEXT: '최악이에요',
  },
  {
    RATE: 4,
    TEXT: '별로에요',
  },
  {
    RATE: 6,
    TEXT: '보통이에요',
  },
  {
    RATE: 8,
    TEXT: '재미있어요',
  },
  {
    RATE: 10,
    TEXT: '명작이에요',
  },
];

export default MATCHED_STAR_RATING;
