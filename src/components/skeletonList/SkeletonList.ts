import Skeleton from "../skeleton/Skeleton";

const SkeletonList = () => {
  return `
    <ul class="thumbnail-list">
      ${Array(20)
        .fill(null)
        .map(() => Skeleton())
        .join("")}
    </ul>
  `;
};

export default SkeletonList;
