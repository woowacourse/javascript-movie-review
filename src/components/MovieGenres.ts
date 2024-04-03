import { Genres } from "../type/movie";

const MovieGenres = (genres: Genres[], className: string) => {
  const $genres = document.createElement("p");
  $genres.classList.add(className);

  const genreList = genres.map((genre) => genre.name).join(", ");
  $genres.textContent = genreList;

  return $genres;
};
export default MovieGenres;
