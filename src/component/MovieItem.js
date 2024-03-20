import itemScoreIconPath from '../asset/star_filled.png';
import { $ } from '../util/selector.js';

function createSkeletonMovieItem() {
  const aLink = document.createElement('a');
  aLink.href = '#';

  const itemCard = document.createElement('div');
  itemCard.classList.add('item-card');

  const itemThumbnail = document.createElement('img');
  itemThumbnail.classList.add('item-thumbnail', 'skeleton');

  const itemTitle = document.createElement('p');
  itemTitle.classList.add('item-title', 'skeleton');

  const itemScore = document.createElement('p');
  itemScore.classList.add('item-score', 'skeleton');

  itemCard.append(itemThumbnail, itemTitle, itemScore);
  aLink.append(itemCard);

  return aLink;
}

function injectMovieDataToItem({ item, movie }) {
  const $itemThumbnail = item.querySelector('.item-thumbnail');
  const $itemTitle = item.querySelector('.item-title');
  const $itemScore = item.querySelector('.item-score');

  $itemThumbnail.onload = () => {
    $itemThumbnail.classList.remove('skeleton');
    $itemTitle.classList.remove('skeleton');
    $itemScore.classList.remove('skeleton');

    $itemThumbnail.loading = 'lazy';
    $itemThumbnail.alt = movie.title;
    $itemTitle.textContent = movie.title;

    const $itemScoreIcon = document.createElement('img');

    $itemScoreIcon.src = itemScoreIconPath;
    $itemScoreIcon.alt = '별점';

    $itemScore.append($itemScoreIcon, movie.voteAverage);
  };

  $itemThumbnail.src = movie.posterPath;
}

export { createSkeletonMovieItem, injectMovieDataToItem };
