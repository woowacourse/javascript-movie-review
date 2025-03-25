import { $ } from "../../utils/dom";
import SkeletonMovieItem from "../movie/SkeletonMovieItem";

const showSkeleton = (count = 20) => {
  const container = $(".thumbnail-list");
  const fragment = document.createDocumentFragment();
  fragment.append(...Array.from({ length: count }).map(SkeletonMovieItem));

  container.appendChild(fragment);
};

export default showSkeleton;
