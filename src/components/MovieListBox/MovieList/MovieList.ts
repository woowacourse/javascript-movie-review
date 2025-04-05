import { MovieData } from "../../../../types/type";
import $EmptyList from "../../EmptyList/EmptyList";
import $MovieItem from "./MovieItem/MovieItem";

export const addMovieItem = (movieList: MovieData[]) => {
  const $movieList = document.querySelector(
    ".thumbnail-list"
  ) as HTMLUListElement;

  const movieListFragment = wrapFragment(
    movieList.map((movieItemData) => $MovieItem(movieItemData))
  );
  $movieList.appendChild(movieListFragment);
};

const $MovieList = (movieList: MovieData[]) => {
  if (!movieList.length) {
    return $EmptyList();
  }

  const $movieList = createElement("ul", {
    className: "thumbnail-list",
  });

  $movieList.append(
    ...movieList.map((movieItemData) => $MovieItem(movieItemData))
  );

  return $movieList;
};

export default $MovieList;
