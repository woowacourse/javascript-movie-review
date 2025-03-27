import MovieList from "./MovieList";
import createElement from "./utils/createElement";
import Button from "./Button";
import MovieType from "../types/MovieType";

const BUTTON_MORE = "더보기";

interface MovieContainerProps {
  movies: MovieType[];
  status: "loading" | "fetched" | "error";
}

const MovieContainer = ({ movies, status }: MovieContainerProps) => {
  const $container = createElement({ tag: "div", classNames: ["container"] });
  const $main = createElement({ tag: "main" });
  const $section = createElement({ tag: "section" });
  const $h2 = createElement({ tag: "h2", classNames: ["list-title"] });

  $h2.textContent = "지금 인기 있는 영화";

  const movieListElement = MovieList({ movies, status });

  $section.appendChild($h2);
  $section.appendChild(movieListElement);
  $main.appendChild($section);
  $main.appendChild(Button({ text: BUTTON_MORE, type: "more" }));
  $container.appendChild($main);

  return $container;
};

export default MovieContainer;
