import MovieListCardSkeleton from './MovieListCardSkeleton';

export const renderSkeletonList = ($container: HTMLElement, $target: HTMLElement, length: number) => {
  Array.from({ length }, () => new MovieListCardSkeleton($target));

  $container.append($target);
};
