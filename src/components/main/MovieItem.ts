import { getThumbnailImageUrl } from '../../api/renderImage.ts';
import { $ } from '../../utils/dom.ts';
import { Star } from '../common/Star.ts';
import { MovieData } from '../../api/types.ts';

export const MovieItem = (data: MovieData) => {
  const { id, title, poster_path, vote_average } = data;

  const $li = document.createElement('li');
  $li.dataset.id = String(id);

  $li.innerHTML = `
    <div class="item">
      <img class="thumbnail" alt="" />
      <div class="item-desc">
        <p class="rate">
          <span></span>
        </p>
        <strong></strong>
      </div>
    </div>
  `;

  const $img = $<HTMLImageElement>($li, '.thumbnail');
  $img.src = getThumbnailImageUrl(poster_path);

  $img.onerror = () => {
    $img.src = './images/empty.png';
  };

  $($li, '.item-desc strong').textContent = title;
  $($li, '.rate span').textContent = vote_average.toFixed(1);
  $($li, '.rate').prepend(Star());

  return $li;
};
