import { ComponentProps } from '../../types/Component.types';
import { createElement } from '../../utils/createElement';

type SkeletonProps = {
  width: number;
  height: number;
} & ComponentProps;

export const Skeleton = ({
  width,
  height,
  classList,
  props,
}: SkeletonProps) => {
  const skeletonElement = <HTMLImageElement>createElement('div', props);

  skeletonElement.width = width;
  skeletonElement.height = height;
  skeletonElement.classList.add('skeleton-gradient', classList.join(' '));

  return skeletonElement;
};
