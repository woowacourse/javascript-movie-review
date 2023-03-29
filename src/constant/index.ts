import logo from '../../templates/logo.png';
import searchButton from '../../templates/search_button.png';
import starEmpty from '../../templates/star_empty.png';
import starFilled from '../../templates/star_filled.png';
import posterEmpty from '../../templates/poster_empty.png';
import cancelButton from '../../templates/cancel_button.png';
import backToTop from '../../templates/back_to_top.png';
import { StarConditionType, StarMentType } from '../type/movie';

const MOVIE_APP_IMG_PATH = {
  logo,
  searchButton,
  starEmpty,
  starFilled,
  posterEmpty,
  cancelButton,
  backToTop,
};

const ERROR_MESSAGE = {
  unableAccess:
    '네트워크가 불안정하거나 서버 점검중일 수 있습니다. 잠시 후 재접속을 시도해주세요.',
  noResult: '찾으시는 영화 목록이 없습니다.',
};

const STAR_CONDITION: StarConditionType = {
  1: [true, false, false, false, false],
  2: [true, true, false, false, false],
  3: [true, true, true, false, false],
  4: [true, true, true, true, false],
  5: [true, true, true, true, true],
};

const STAR_MENT: StarMentType = {
  1: '최악',
  2: '별로',
  3: '보통',
  4: '준수',
  5: '최고',
};

export { MOVIE_APP_IMG_PATH, ERROR_MESSAGE, STAR_CONDITION, STAR_MENT };
