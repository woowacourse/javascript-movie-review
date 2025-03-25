import { createElement } from '../../utils/createElement';
import { Box } from '../common/Box';

const createPosterSkeleton = () => {
  return Box({
    classList: ['skeleton-animation', 'poster-skeleton'],
  });
};

const createTitleSkeleton = () => {
  return Box({
    classList: ['skeleton-animation', 'title-skeleton'],
  });
};

const createDateSkeleton = () => {
  return Box({
    classList: ['skeleton-animation', 'date-skeleton'],
  });
};

export const MovieSkeleton = () => {
  return createElement<HTMLLIElement>('li', {
    classList: 'movie-item skeleton-item',
    children: [
      createPosterSkeleton(),
      createTitleSkeleton(),
      createDateSkeleton(),
    ],
  });
};
