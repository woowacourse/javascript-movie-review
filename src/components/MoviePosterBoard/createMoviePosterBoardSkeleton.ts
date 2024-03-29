import createElement from "../../utils/createElement";
import { createMoviePreviewSkeleton } from "../MoviePreview/utils/createMovieSkeleton";

const createMoviePosterBoardSkeleton = () => {
  const posterBoard = createElement("ul", {
    attrs: { class: "item-list item-list-skeleton" },
  });

  const skeletonPosters = Array.from({ length: 20 }).map(
    createMoviePreviewSkeleton
  );

  posterBoard.append(...skeletonPosters);

  return posterBoard;
};

export default createMoviePosterBoardSkeleton;
