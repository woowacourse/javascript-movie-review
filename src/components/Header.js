import Button from './Button';
import Gnb from './Gnb';
import MoviePreviewInfo from './MoviePreviewInfo';
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

  $header.append($backgroundContainer);
  $backgroundContainer.append($overlay);
  $backgroundContainer.append($topRatedContainer);
  $topRatedContainer.append(Gnb());
  $topRatedContainer.append($topRatedMovie);
  $topRatedMovie.append(MoviePreviewInfo());
  $topRatedMovie.append(Button({ text: BUTTON.DETAIL }));

  return $header;
};

export default Header;
