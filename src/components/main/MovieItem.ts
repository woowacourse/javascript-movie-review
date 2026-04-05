import { getThumbnailImageUrl } from '../../api/renderImage.ts';
import { $ } from '../../utils/dom.ts';
import { Star } from '../common/Star.ts';
import { MovieData } from '../../api/type.ts';

export const MovieItem = (data: MovieData) => {
  const { title, poster_path, vote_average } = data;

  const $li = document.createElement('li');

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

  $<HTMLImageElement>($li, '.thumbnail').src = getThumbnailImageUrl(poster_path);
  $($li, '.item-desc strong').textContent = title;
  $($li, '.rate span').textContent = vote_average.toFixed(1);
  $($li, '.rate').prepend(Star());

  return $li;
};
