import itemScoreIconPath from '../asset/star_filled.png';
import { MovieData } from '../interface/MovieInterface';
import { $ } from '../util/selector';

function createSkeletonMovieItem() {
  const itemCard = document.createElement('div');
  itemCard.classList.add('item-card');
  itemCard.append(...createSkeletonMovieItemElements());

  return itemCard;
}

function createSkeletonMovieItemElements() {
  const itemThumbnail = document.createElement('img');
  const itemTitle = document.createElement('p');
  const itemScore = document.createElement('p');
  itemThumbnail.classList.add('item-thumbnail', 'skeleton');
  itemTitle.classList.add('item-title', 'skeleton');
  itemScore.classList.add('item-score', 'skeleton');

  return [itemThumbnail, itemTitle, itemScore];
}

function injectMovieDataToItem({
  item,
  movie,
  onClick,
}: {
  item: HTMLLIElement;
  movie: MovieData;
  onClick: (movieId: number) => void;
}) {
  const $itemThumbnail = $<HTMLImageElement>('.item-thumbnail', item);
  const $itemTitle = $<HTMLParagraphElement>('.item-title', item);
  const $itemScore = $<HTMLParagraphElement>('.item-score', item);

  $itemThumbnail.onload = () => {
    [$itemThumbnail, $itemTitle, $itemScore].forEach((element: HTMLElement) => element.classList.remove('skeleton'));
    $itemThumbnail.alt = movie.title;
    $itemTitle.textContent = movie.title;
    $itemScore.append(createScoreIcon(), movie.voteAverage.toString());

    item.addEventListener('click', () => onClick(movie.id));
  };

  $itemThumbnail.src = movie.posterPath;
}

function createScoreIcon() {
  const scoreIcon = document.createElement('img');
  scoreIcon.src = itemScoreIconPath;
  scoreIcon.alt = '별점';

  return scoreIcon;
}

export { createSkeletonMovieItem, injectMovieDataToItem };
