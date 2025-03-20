import Button from './Button';
import MoviePreviewInfo from './MoviePreviewInfo';
import createElement from './utils/createElement';

const BUTTON_DETAIL = '자세히 보기';

const TopRatedContainer = ({popularMovie}) => {

  const $topRatedContainer = createElement({
    tag: 'div',
    classNames: ['top-rated-container'],
  });

  const $topRatedMovie = createElement({
    tag: 'div',
    classNames: ['top-rated-movie'],
  });

  $topRatedContainer.append($topRatedMovie);
  $topRatedMovie.append(MoviePreviewInfo({
    bigFont: true,
    movie: popularMovie
  }));
  $topRatedMovie.append(Button({ text: BUTTON_DETAIL, type: 'detail' }));

  return $topRatedContainer;
};

export default TopRatedContainer;
