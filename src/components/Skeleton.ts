interface SkeletonProps {
  width: string | null;
  height: string | null;
}

export default function Skeleton({
  width = null,
  height = null,
}: SkeletonProps) {
  return ` <div class="skeleton" style=
  "width: ${width}; height: ${height};"></div>`;
}
