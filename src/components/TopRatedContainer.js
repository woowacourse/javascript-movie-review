import Button from './Button';
import Gnb from './Gnb';
import MoviePreviewInfo from './MoviePreviewInfo';
import createElement from './utils/createElement';
import BUTTON from '../constants/constant';

const TopRatedContainer = () => {
  const $topRatedContainer = createElement({
    tag: 'div',
    classNames: ['top-rated-container'],
  });

  const $topRatedMovie = createElement({
    tag: 'div',
    classNames: ['top-rated-movie'],
  });

  $topRatedContainer.append(Gnb());
  $topRatedContainer.append($topRatedMovie);
  $topRatedMovie.append(MoviePreviewInfo());
  $topRatedMovie.append(Button({ text: BUTTON.DETAIL }));

  return $topRatedContainer;
};

export default TopRatedContainer;
