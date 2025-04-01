interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: Partial<CSSStyleDeclaration>;
}

export default function Skeleton({
  width = "",
  height = "",
  className = "",
  style = {},
}: SkeletonProps) {
  const $skeletonContainer = document.createElement("div");
  $skeletonContainer.className = `skeleton ${className}`.trim();

  $skeletonContainer.style.width =
    typeof width === "number" ? `${width}px` : width;

  $skeletonContainer.style.height =
    typeof height === "number" ? `${height}px` : height;

  Object.entries(style).forEach(([property, value]) => {
    const cssProperty = property.replace(
      /[A-Z]/g,
      (match) => `-${match.toLowerCase()}`
    );

    if (value !== undefined && value !== null) {
      $skeletonContainer.style.setProperty(cssProperty, String(value));
    }
  });

  return $skeletonContainer;
}
