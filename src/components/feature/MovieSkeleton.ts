import { createElement } from '../../utils/createElement';
import { Box } from '../common/Box';

const createPosterSkeleton = () => {
  return Box({
    classList: ['skeleton-animation'],
    props: {
      style: `width: 100%; height: 300px;  border-radius: 8px; margin-bottom: 12px; `,
    },
  });
};

const createTitleSkeleton = () => {
  return Box({
    classList: ['skeleton-animation'],
    props: {
      style: `width: 80%; height: 24px;  border-radius: 4px; margin-bottom: 8px; `,
    },
  });
};

const createDateSkeleton = () => {
  return Box({
    classList: ['skeleton-animation'],
    props: {
      style: `width: 50%; height: 16px;  border-radius: 4px; `,
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
