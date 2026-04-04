import STAR_EMPTY from '../../public/images/star_empty.png';
import STAR_FILLED from '../../public/images/star_filled.png';

type StarOptions = {
  filled?: boolean;
};

export const createStarImage = ({ filled = true }: StarOptions = {}) => {
  const $img = document.createElement('img');
  $img.className = 'star';
  $img.src = filled ? STAR_FILLED : STAR_EMPTY;
  $img.alt = filled ? 'star_filled' : 'star_empty';
  return $img;
};
