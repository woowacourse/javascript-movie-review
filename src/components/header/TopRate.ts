import { MovieData } from '../../api/type.ts';
import { Star } from '../common/Star.ts';

export const TopRate = (data: MovieData): HTMLElement => {
  const $container = document.createElement('div');
  $container.className = 'top-rated-movie';

  const $rate = document.createElement('div');
  $rate.className = 'rate';

  const $title = document.createElement('div');
  $title.textContent = data.title;

  const $button = document.createElement('button');
  $button.className = 'primary detail';
  $button.textContent = '자세히 보기';

  const $span = document.createElement('span');
  $span.textContent = data.vote_average.toFixed(1);
  $span.className = 'rate-value';

  $rate.append(Star(), $span);
  $container.append($title, $rate, $button);
  return $container;
};
