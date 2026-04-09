export const Star = (filled?: boolean) => {
  const $img = document.createElement('img');
  $img.className = 'star';
  $img.src = filled ? './images/star_filled.png' : './images/star_empty.png';
  $img.alt = filled ? 'star_filled' : 'star_empty';

  return $img;
};
