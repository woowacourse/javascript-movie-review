import { RatingScore } from '../type';

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
export const DEFAULT_IMAGE_URL = 'https://placehold.co/200x300?text=No+Image';
export const INITIAL_PAGE = 1;
export const API_PAGE_LIMIT = 500;
export const STORAGE_KEY = 'moviesRate';

export const RATING_COMMENTS: Record<RatingScore, string> = {
  0: '평가해주세요',
  2: '최악이예요',
  4: '별로예요',
  6: '보통이에요',
  8: '재미있어요',
  10: '명작이에요'
};

export const RATE_STAR_LENGTH = 5;
export const RATE_STAR_POINT_UNIT = 2;
