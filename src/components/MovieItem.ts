import { MovieData } from '../api/type.ts';
import { createStarImage } from '../utils/createStartImage.ts';

const template = `
  <div class="item">
    <img class="thumbnail" />
    <div class="item-desc">
      <p class="rate">
        <span></span>
      </p>
      <strong></strong>
    </div>
  </div>
`;

export const MovieItem = (data: MovieData) => {
  const { poster_path, title, vote_average } = data;

  const $li = document.createElement('li');
  $li.insertAdjacentHTML('beforeend', template);

  const $thumbnail = $li.querySelector<HTMLImageElement>('.thumbnail');
  if (!$thumbnail) {
    throw new Error('.thumbnail 클래스를 가진 이미지가 없어');
  }

  $thumbnail.src = poster_path;
  $thumbnail.alt = title;

  const $rate = $li.querySelector<HTMLElement>('.rate');
  if (!$rate) {
    throw new Error('.rate태그가 없어요');
  }
  $rate.append(createStarImage());

  const $span = $rate.querySelector<HTMLElement>('span');
  if (!$span) {
    throw new Error('span 이 없어요');
  }
  $span.textContent = String(vote_average);

  return $li;
};
