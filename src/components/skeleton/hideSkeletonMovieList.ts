import { $$ } from "../utils/selectors";

const hideSkeletonMovieList = () => {
  const $skeleton = $$(".skeleton-movie");
  if (!$skeleton) {
    return;
  }

  $skeleton.forEach(($skeletonMovie) => {
    if ($skeletonMovie) {
      $skeletonMovie.remove();
    }
  });
};

export default hideSkeletonMovieList;
