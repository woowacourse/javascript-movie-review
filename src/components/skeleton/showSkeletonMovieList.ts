import skeletonMovieList from "./internal/skeletonMovieList";

const showSkeletonMovieList = ($targetElement: Element | null) => {
  if (!$targetElement) {
    return;
  }

  const $skeletonMovieList = skeletonMovieList(20);

  $targetElement.append(...$skeletonMovieList.children);
};

export default showSkeletonMovieList;
