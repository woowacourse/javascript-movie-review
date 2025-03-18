import { MovieDetail } from "../../../types/type";
import $EmptyList from "../EmptyList/EmptyList";
import $MovieItem from "../MovieItem/MovieItem";

const $MovieList = (movieList: MovieDetail[]) => {
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
