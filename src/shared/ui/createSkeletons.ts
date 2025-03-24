import { createFragment } from "../utils/createFragment";
import { MovieSkeleton } from "./components/MovieSkeleton";

export const createSkeletons = (count = 10) => {
  const skeleton = document.createElement("div");
  skeleton.classList.add("skeleton");

  skeleton.append(
    createFragment(Array.from({ length: count }, () => MovieSkeleton()))
  );

  return skeleton;
};
