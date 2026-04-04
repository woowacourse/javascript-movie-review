import { getThumbnailImageUrl } from '../../api/renderImage.ts';
import { MovieData } from '../../api/type.ts';
import { Star } from '../common/Star.ts';

export const MovieItem = (data: MovieData) => {
  const { title, poster_path } = data;

  const $li = document.createElement('li');

  const $item = document.createElement('div');
  $item.className = 'item';

  const $img = document.createElement('img');
  $img.className = 'thumbnail';
  $img.src = getThumbnailImageUrl(poster_path);
  $img.alt = title;

  const $itemDesc = document.createElement('div');
  $itemDesc.className = 'item-desc';

  const $strong = document.createElement('strong');
  $strong.textContent = title;

  const $p = document.createElement('p');
  $p.className = 'rate';

  const $span = document.createElement('span');
  $span.textContent = data.vote_average.toFixed(1);

  $p.append(Star(), $span);
  $itemDesc.append($p, $strong);
  $item.append($img, $itemDesc);
  $li.append($item);
  return $li;
};
