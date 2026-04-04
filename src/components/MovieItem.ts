import { MovieData } from '../api/type.ts';
import { Rate } from './Rate.ts';

const template = `
  <div class="item">
    <img class="thumbnail" />
    <div class="item-desc">
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

  const $itemDesc = $li.querySelector<HTMLElement>('.item-desc');
  if (!$itemDesc) {
    throw new Error('itemDesc 없음');
  }
  $itemDesc.append(Rate({ rateValue: vote_average }));

  return $li;
};
