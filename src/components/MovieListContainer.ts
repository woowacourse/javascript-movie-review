import { ListType, Movie, PartialMovieDataForItemView } from "../type/movie";
import { createElementWithAttribute } from "../utils";

import MoreButton from "./MoreButton";
import MovieList from "./MovieList";
import Title from "./Title";

const makeSection = (titleText: string, movieList: Movie[] | undefined) => {
  const $section = createElementWithAttribute("section", {
    class: "movie-list-container",
  });
  $section.appendChild(Title(titleText));
  $section.appendChild(MovieList(movieList));

  return $section;
};

const MovieListContainer = (
  titleText: string,
  movieData: PartialMovieDataForItemView,
  listType: ListType,
) => {
  const $main = document.querySelector("main");
  const $section = makeSection(titleText, movieData.movieList);

  $main?.appendChild($section);
  MoreButton(listType, movieData.isShowMoreButton);
};
export default MovieListContainer;
