import { createElement } from '../../utils/createElement';

export const MovieSkeleton = () => {
  const skeletonItem = createElement<HTMLLIElement>('li', {
    classList: 'movie-item skeleton-item',
  });

  const posterSkeleton = createElement<HTMLDivElement>('div', {
    classList: 'poster-skeleton',
    style:
      'width: 100%; height: 300px; background-color:rgb(165, 165, 165); border-radius: 8px; margin-bottom: 12px; animation: skeleton-gradient 1.5s infinite;',
  });

  const titleSkeleton = createElement<HTMLDivElement>('div', {
    classList: 'title-skeleton',
    style:
      'width: 80%; height: 24px; background-color: rgb(165, 165, 165); border-radius: 4px; margin-bottom: 8px; animation: skeleton-gradient 1.5s infinite;',
  });

  const dateSkeleton = createElement<HTMLDivElement>('div', {
    classList: 'date-skeleton',
    style:
      'width: 50%; height: 16px; background-color: rgb(165, 165, 165); border-radius: 4px; animation: skeleton-gradient 1.5s infinite;',
  });

  skeletonItem.append(posterSkeleton, titleSkeleton, dateSkeleton);
  return skeletonItem;
};
