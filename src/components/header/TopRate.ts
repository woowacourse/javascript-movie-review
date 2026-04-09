import { MovieData } from '../../api/types.ts';
import { $ } from '../../utils/dom.ts';
import { Star } from '../common/Star.ts';

export const TopRate = (data: MovieData): HTMLElement => {
  const $container = document.createElement('div');
  $container.className = 'top-rated-movie';

  $container.innerHTML = `
    <div class="rate">
      <span class="rate-value">${data.vote_average.toFixed(1)}</span>
    </div>
    <div class="title"></div>
    <button class="primary detail">자세히 보기</button>
  `;

  $($container, '.rate').prepend(Star());
  $($container, '.title').textContent = data.title;

  return $container;
};
