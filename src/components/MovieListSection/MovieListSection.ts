import { MovieDetail } from "../../../types/type";
import $MovieList from "../MovieList/MovieList";

interface MovieListSectionProps {
  title: string;
  movieList: MovieDetail[];
}

const $MovieListSection = ({ title, movieList }: MovieListSectionProps) => {
  const $title = createElement("h2", {
    textContent: title,
  });
  const $movieList = $MovieList(movieList);
  const $moreButton = createElement("button", {
    type: "button",
    className: "more-button",
    textContent: "더 보기",
  });

  const $section = createElement("section", {
    className: "movie-list-section",
  });

  $section.append($title, $movieList, $moreButton);
  return $section;
};

export default $MovieListSection;
