import STAR_EMPTY from '../../public/images/star_empty.png';

export const Rate = ({ rateValue }: { rateValue: number }): HTMLElement => {
  const $container = document.createElement('div');
  $container.append('');

  const $img = document.createElement('img');
  $img.className = 'star';
  $img.src = STAR_EMPTY;
  $img.alt = 'star_empty';

  const $span = document.createElement('span');
  $span.className = 'rate-value';
  $span.textContent = String(rateValue);

  return $container;
};
