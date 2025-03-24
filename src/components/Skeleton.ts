import { toElement } from "../utils/domUtils";

interface SkeletonProps {
  width: number;
  height: number;
}

export default function Skeleton({ width, height }: SkeletonProps): Element {
  return toElement(
    ` <div class="skeleton" style="width: ${width}px; height: ${height}px;"></div>`
  );
}
