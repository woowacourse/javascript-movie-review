import { ComponentProps } from '../../types/Component.types';
import { Box } from './Box';

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
  return Box({
    classList: ['skeleton-gradient', ...(classList || [])],
    props: {
      style: `width: ${width}px; height: ${height}px;`,
      ...props,
    },
  });
};
