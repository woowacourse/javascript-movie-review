import Button from './Button';
import Gnb from './Gnb';
import MoviePreviewInfo from './MoviePreviewInfo';
import createElement from './utils/createElement';
import BUTTON from '../constants/constant';

const TopRatedContainer = ({popularMovie}) => {

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
  $topRatedMovie.append(MoviePreviewInfo({
    bigFont: true,
    movie: popularMovie
  }));
  $topRatedMovie.append(Button({ text: BUTTON.DETAIL, type: 'detail' }));

  return $topRatedContainer;
};

export default TopRatedContainer;
