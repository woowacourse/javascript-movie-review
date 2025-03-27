import MovieItem from "./MovieItem";
import SkeletonMovieItem from "./SkeletonMovieItem";
import NothingMovieList from "./NothingMovieList";
import createElement from "./utils/createElement";
import MovieType from "../types/MovieType";

const SKELETON_ITEMS_COUNT = 20;

interface MovieListProps {
  movies: MovieType[];
  status: "loading" | "fetched" | "error";
}

const MovieList = ({ movies, status }: MovieListProps) => {
  console.log(movies, status);
  const $ul = createElement({
    tag: "ul",
    classNames: ["thumbnail-list"],
  });

  if (status === "loading") {
    Array(SKELETON_ITEMS_COUNT)
      .fill(null)
      .forEach(() => {
        $ul.appendChild(SkeletonMovieItem());
      });
  }

  if (status === "fetched") {
    movies.forEach((movie) => {
      $ul.appendChild(MovieItem({ movie }));
    });
  }

  if (status === "fetched" && movies.length === 0) {
    return NothingMovieList();
  }
  return $ul;
};

export default MovieList;
