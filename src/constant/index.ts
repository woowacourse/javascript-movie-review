import logo from '../../templates/logo.png';
import searchButton from '../../templates/search_button.png';
import starEmpty from '../../templates/star_empty.png';
import starFilled from '../../templates/star_filled.png';

const MOVIE_APP_IMG_PATH = Object.freeze({
  logo,
  searchButton,
  starEmpty,
  starFilled,
});

const MOVIE_LOCAL_STORAGE_KEY = 'MOVIE_APP';

const VoteMessage = Object.freeze([
  '본인의 점수를 매겨주세요!!',
  '점: 최악이예요',
  '점: 별로예요',
  '점: 보통이에요',
  '점: 재미있어요',
  '점: 명작이에요',
]);

export { MOVIE_APP_IMG_PATH, MOVIE_LOCAL_STORAGE_KEY, VoteMessage };
