import { MovieSkeleton } from "../../features/movie/ui/components/MovieSkeleton";

export const createSkeletons = (count: number = 10) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    fragment.appendChild(MovieSkeleton());
  }

  return fragment;
};

export default MovieSkeleton;
