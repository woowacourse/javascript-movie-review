import { MovieSkeleton } from "../../features/movie/ui/components/MovieSkeleton";

export const createSkeletons = (count: number = 10) => {
  const skeleton = document.createElement("div");
  skeleton.classList.add("skeleton");

  for (let i = 0; i < count; i++) {
    skeleton.appendChild(MovieSkeleton());
  }

  return skeleton;
};

export default MovieSkeleton;
