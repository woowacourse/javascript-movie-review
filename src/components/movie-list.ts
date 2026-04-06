import { createMovieCard } from "./movie-card";

interface Movie {
  title: string;
  imageSrc: string;
  rating: number;
}

export function createMovieList(movies: Movie[]): HTMLElement {
  const section = document.createElement("section");

  const ul = document.createElement("ul");
  ul.className = "thumbnail-list";

  movies.forEach((movie) => {
    const card = createMovieCard({ ...movie });
    ul.appendChild(card);
  });

  section.append(ul);
  return section;
}
