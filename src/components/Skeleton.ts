interface SkeletonProps {
  width: number;
  height: number;
}

export default function Skeleton({ width, height }: SkeletonProps) {
  const $skeletonContainer = document.createElement("div");

  $skeletonContainer.className = "skeleton";
  $skeletonContainer.style.width = `${width}px`;
  $skeletonContainer.style.height = `${height}px`;

  return $skeletonContainer;
}
