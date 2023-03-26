import { UserScores } from '../types/movie';

const SCROLL_OFFSET = 250;
const STAR_MAX_COUNT = 5;
const MAX_VOTE_SCORE = 10;
const VOTE_SCORE_AND_STAR_RATIO = 2;

const MOVIE_LIST_MAIN_TITLE = '지금 인기 있는 영화';
const EMPTY_OVERVIEW_MESSAGE = '이 영화는 줄거리가 없습니다.';

const USER_SCORES = [0, 2, 4, 6, 8, 10] as const;

const USER_VOTE_MESSAGE: Record<UserScores, string> = {
  0: '평가하기',
  2: '최악이예요',
  4: '별로예요',
  6: '보통이에요',
  8: '재미있어요',
  10: '명작이에요',
} as const;

export {
  SCROLL_OFFSET,
  STAR_MAX_COUNT,
  MAX_VOTE_SCORE,
  VOTE_SCORE_AND_STAR_RATIO,
  MOVIE_LIST_MAIN_TITLE,
  EMPTY_OVERVIEW_MESSAGE,
  USER_SCORES,
  USER_VOTE_MESSAGE,
};
