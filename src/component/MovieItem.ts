import itemScoreIconPath from '../asset/star_filled.png';
import { MovieData } from '../interface/MovieInterface';
import { $ } from '../util/selector';

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

function injectMovieDataToItem({ item, movie }: { item: HTMLLIElement; movie: MovieData }) {
  const $itemThumbnail = $<HTMLImageElement>('.item-thumbnail', item);
  const $itemTitle = $<HTMLParagraphElement>('.item-title', item);
  const $itemScore = $<HTMLParagraphElement>('.item-score', item);

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

    $itemScore.append($itemScoreIcon, movie.voteAverage.toString());
  };

  $itemThumbnail.src = movie.posterPath;
}

export { createSkeletonMovieItem, injectMovieDataToItem };
