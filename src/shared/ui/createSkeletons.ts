import { MovieSkeleton } from "./components/MovieSkeleton";

export const createSkeletons = (count = 10) => {
  const skeleton = document.createElement("div");
  skeleton.classList.add("skeleton");

  for (let i = 0; i < count; i++) {
    skeleton.appendChild(MovieSkeleton());
  }

  return skeleton;
};
