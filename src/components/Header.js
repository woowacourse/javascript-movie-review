import Button from './Button';
import Gnb from './Gnb';
import createElement from './utils/createElement';
import BUTTON from '../constants/constant';

const Header = () => {
  const $header = createElement({
    tag: 'header',
  });

  const $backgroundContainer = createElement({
    tag: 'div',
    classNames: ['background-container'],
  });

  const $overlay = createElement({
    tag: 'div',
    classNames: ['overlay'],
    'aria-hidden': 'true',
  });

  const $topRatedContainer = createElement({
    tag: 'div',
    classNames: ['top-rated-container'],
  });

  const $topRatedMovie = createElement({
    tag: 'div',
    classNames: ['top-rated-movie'],
  });

  const $rate = createElement({ tag: 'div', classNames: ['rate'] });

  const $starImg = createElement({
    tag: 'img',
    classNames: ['star'],
    src: ['./images/star_empty.png'],
  });

  const $rateValue = createElement({
    tag: 'span',
    classNames: ['rate-value'],

  });

  $rateValue.textContent = '9.5';

  const $title = createElement({
    tag: 'div',
    classNames: ['title'],
  });

  $title.textContent = '인사이드 아웃2';

  $header.append($backgroundContainer);
  $backgroundContainer.append($overlay);
  $backgroundContainer.append($topRatedContainer);
  $topRatedContainer.append(Gnb());
  $topRatedContainer.append($topRatedMovie);
  $topRatedMovie.append($rate);
  $rate.append($starImg);
  $rate.append($rateValue);
  $topRatedMovie.append($title);
  $topRatedMovie.append(Button({ text: BUTTON.DETAIL }));

  return $header;
};

export default Header;
