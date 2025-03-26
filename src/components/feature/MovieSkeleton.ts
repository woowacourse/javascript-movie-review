import { createElement } from '../../utils/createElement';
import { Box } from '../common/Box';

export const createPosterSkeleton = () => {
  return Box({
    classList: ['skeleton-animation'],
    props: {
      style: `width: 200px; height: 300px;  border-radius: 8px;`,
    },
  });
};

const createTitleSkeleton = () => {
  return Box({
    classList: ['skeleton-animation'],
    props: {
      style: `width: 50px; height: 20px;  border-radius: 4px;`,
    },
  });
};

const createDateSkeleton = () => {
  return Box({
    classList: ['skeleton-animation'],
    props: {
      style: `width: 200px; height: 20px;  border-radius: 4px; margin-bottom: 18px;`,
    },
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
