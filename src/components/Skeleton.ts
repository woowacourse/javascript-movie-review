import { createElement } from "../utils";

interface SkeletonProps {
  width: number;
  height: number;
}

export default function Skeleton({ width, height }: SkeletonProps) {
  const $skeleton = createElement(`
      <div class="skeleton"></div>
    `);

  $skeleton.style.width = `${width}px`;
  $skeleton.style.height = `${height}px`;

  return $skeleton;
}
``;
