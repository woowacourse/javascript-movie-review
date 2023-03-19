import logo from '../../templates/logo.png';
import searchButton from '../../templates/search_button.png';
import starEmpty from '../../templates/star_empty.png';
import starFilled from '../../templates/star_filled.png';

const MOVIE_APP_IMG_PATH = {
  logo,
  searchButton,
  starEmpty,
  starFilled,
};

const ERROR_MESSAGE = {
  noResponse:
    '서버에서 영화 정보를 가져올 수 없습니다. 잠시 후 재접속을 시도해주세요.',
  wrongRequset: '잘못된 요청 방식입니다. 정상적인 주소를 입력해주세요.',
  unableAccess:
    '네트워크가 불안정하거나 서버 점검중일 수 있습니다. 잠시 후 재접속을 시도해주세요.',
};

export { MOVIE_APP_IMG_PATH, ERROR_MESSAGE };
