import { PopularMovie } from "../types/api";
import { createMovieCard } from "./movie-card";

export function createMovieList(movies: PopularMovie[]): HTMLElement {
  const section = document.createElement("section");

  const ul = document.createElement("ul");
  ul.className = "thumbnail-list";

  movies.forEach((movie) => {
    const card = createMovieCard(movie);
    ul.appendChild(card);
  });

  section.append(ul);
  return section;
}
