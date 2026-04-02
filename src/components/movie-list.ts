import { createMovieCard } from "./movie-card";

interface Movie {
  title: string;
  imageSrc: string;
  rating: number;
}

interface MovieListOptions {
  sectionTitle: string;
  movies: Movie[];
}

export function createMovieList({ sectionTitle, movies }: MovieListOptions): HTMLElement {
  const section = document.createElement("section");

  const h2 = document.createElement("h2");
  h2.textContent = sectionTitle;

  const ul = document.createElement("ul");
  ul.className = "thumbnail-list";

  movies.forEach((movie) => {
    const card = createMovieCard({ ...movie });
    ul.appendChild(card);
  });

  section.append(h2, ul);
  return section;
}
