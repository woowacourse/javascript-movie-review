import { MovieData } from '../../interface/MovieInterface';
import formatScoreNumber from '../../util/formatScoreNumber';
import { $ } from '../../util/selector';

function createSkeletonMovieItem() {
  const itemCard = document.createElement('div');
  itemCard.classList.add('item-card');
  itemCard.append(...createSkeletonMovieItemElements());

  return itemCard;
}

function createSkeletonMovieItemElements() {
  const itemThumbnailBox = document.createElement('div');
  const itemThumbnail = document.createElement('img');
  const itemTitle = document.createElement('p');
  const itemScore = document.createElement('p');
  itemThumbnailBox.classList.add('item-thumbnail-box');
  itemThumbnail.classList.add('item-thumbnail', 'skeleton');
  itemTitle.classList.add('item-title', 'skeleton');
  itemScore.classList.add('item-score', 'skeleton');
  itemThumbnailBox.append(itemThumbnail);

  return [itemThumbnailBox, itemTitle, itemScore];
}

function injectMovieDataToItem({
  item,
  movie,
  onClick,
}: {
  item: HTMLLIElement;
  movie: MovieData;
  onClick: (item: HTMLLIElement, movieId: number) => void;
}) {
  return new Promise<void>((resolve) => {
    const $itemThumbnail = $<HTMLImageElement>('.item-thumbnail', item);
    const $itemTitle = $<HTMLParagraphElement>('.item-title', item);
    const $itemScore = $<HTMLParagraphElement>('.item-score', item);

    $itemThumbnail.onload = () => {
      [$itemThumbnail, $itemTitle, $itemScore].forEach((element: HTMLElement) => element.classList.remove('skeleton'));
      $itemThumbnail.alt = movie.title;
      $itemTitle.textContent = movie.title;
      $itemScore.classList.add('loaded');
      $itemScore.append(formatScoreNumber(movie.voteAverage).toString());

      item.addEventListener('click', () => onClick(item, movie.id));

      resolve();
    };

    $itemThumbnail.src = movie.posterPath;
  });
}

export { createSkeletonMovieItem, injectMovieDataToItem };
