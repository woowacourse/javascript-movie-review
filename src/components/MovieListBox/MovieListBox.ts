import { MovieListSectionProps } from "../../../types/type";
import $MovieList from "../MovieList/MovieList";

const $MovieListBox = ({ title, movieList }: MovieListSectionProps) => {
  const $title = createElement("h2", {
    textContent: title,
  });
  const $movieList = $MovieList(movieList);
  const $moreButton = createElement("button", {
    type: "button",
    className: "more-button",
    textContent: "더 보기",
  });

  const $movieListBox = createElement("div", {
    className: "movie-list-box",
  });

  $movieListBox.append($title, $movieList, $moreButton);
  return $movieListBox;
};

export default $MovieListBox;
