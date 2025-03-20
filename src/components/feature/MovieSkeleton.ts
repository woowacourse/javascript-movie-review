import { createElement } from '../../utils/createElement';

const SKELETON_ANIMATION =
  'animation: skeleton-gradient 1.5s infinite;' as const;
const SKELETON_BASE_COLOR = 'background-color: rgb(165, 165, 165);' as const;

const createPosterSkeleton = () => {
  return createElement<HTMLDivElement>('div', {
    style: `width: 100%; height: 300px; ${SKELETON_BASE_COLOR} border-radius: 8px; margin-bottom: 12px; ${SKELETON_ANIMATION}`,
  });
};

const createTitleSkeleton = () => {
  return createElement<HTMLDivElement>('div', {
    style: `width: 80%; height: 24px; ${SKELETON_BASE_COLOR} border-radius: 4px; margin-bottom: 8px; ${SKELETON_ANIMATION}`,
  });
};

const createDateSkeleton = () => {
  return createElement<HTMLDivElement>('div', {
    style: `width: 50%; height: 16px; ${SKELETON_BASE_COLOR} border-radius: 4px; ${SKELETON_ANIMATION}`,
  });
};

export const MovieSkeleton = () => {
  const posterSkeleton = createPosterSkeleton();
  const titleSkeleton = createTitleSkeleton();
  const dateSkeleton = createDateSkeleton();

  return createElement<HTMLLIElement>('li', {
    classList: 'movie-item skeleton-item',
    children: [posterSkeleton, titleSkeleton, dateSkeleton],
  });
};
