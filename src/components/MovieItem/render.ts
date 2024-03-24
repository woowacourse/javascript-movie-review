import createElement from '../../utils/createElement';
import starImg from '../../../templates/star_filled.png';
import formatToDecimalPlaces from '../../utils/formatToDecimalPlaces';
import { BASE_IMAGE_URL } from '../../constants/api/api';
import NoImage from '../ui/NoIamge';
import { Movie } from '../../domain/movie';

const THUMBNAIL_SIZE = 'w500';

const createItemScore = (vote_average: number) => {
  const itemScoreContainer = createElement('div', { className: 'item-score-container' });
  const itemScore = createElement('div', {
    className: 'item-score',
    textContent: formatToDecimalPlaces(vote_average, 1),
  });
  const starIcon = createElement('img', { src: starImg, alt: '별점' });
  [itemScore, starIcon].forEach((item) => itemScoreContainer.appendChild(item));
  return itemScoreContainer;
};

const createItemImage = (posterPath: string, title: string) => {
  if (posterPath === null) return NoImage();
  const image = createElement('img', {
    className: 'item-thumbnail skeleton',
    src: `${BASE_IMAGE_URL}${THUMBNAIL_SIZE}${posterPath}`,
    loading: 'lazy',
    alt: `${title} 포스터 이미지`,
    onload: toggleSkeleton,
  });

  return image;
};

const toggleSkeleton = (event: Event) => {
  const thumbnail = event.target as HTMLElement;
  thumbnail.classList.remove('skeleton');
};

export const createItemCardContent = (movie: Movie) => {
  const { posterPath, title, voteAverage } = movie;
  const itemImage = createItemImage(posterPath, title);
  const itemTitle = createElement('p', { className: 'item-title', textContent: title });
  const itemScore = createItemScore(voteAverage);
  const fragment = document.createDocumentFragment();
  [itemImage, itemTitle, itemScore].forEach((item) => fragment.appendChild(item));
  return fragment;
};

export const renderHandler = (movie: Movie) => {
  const li = createElement('li');
  const a = createElement('a');
  const itemCard = createElement('div', { className: 'item-card' });
  const itemCardContent = createItemCardContent(movie);
  itemCard.appendChild(itemCardContent);
  a.appendChild(itemCard);
  li.appendChild(a);
  return li;
};
