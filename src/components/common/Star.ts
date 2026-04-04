import { MovieData } from '../../api/type.ts';

export const Star = () => {
  const $img = document.createElement('img');
  $img.className = 'star';
  $img.src = './images/star_empty.png';
  $img.alt = 'star_empty';

  return $img;
};
