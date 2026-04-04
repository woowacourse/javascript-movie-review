import { getThumbnailImageUrl } from '../../api/renderImage.ts';
import { MovieData } from '../../api/type.ts';

export const TopRate = (data: MovieData): HTMLElement => {
  const $container = document.createElement('div');
  $container.className = 'top-rated-movie';

  const $title = document.createElement('div');
  $title.textContent = data.title;

  const $button = document.createElement('button');
  $button.className = 'primary detail';
  $button.textContent = '자세히 보기';

  $container.append(Rate(data), $title, $button);
  return $container;
};

const Rate = (data: MovieData) => {
  const $rate = document.createElement('div');
  $rate.className = 'rate';

  const $img = document.createElement('img');
  $img.className = 'star';
  $img.src = './images/star_empty.png';
  $img.alt = 'star_empty';

  const $span = document.createElement('span');
  $span.className = 'rate-value';
  $span.textContent = String(data.vote_average);

  return $rate;
};
