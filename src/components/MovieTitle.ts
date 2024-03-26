import { createElementWithAttribute } from "../utils";

const MovieTitle = (movieTitle: string, className: string) => {
  const $title = createElementWithAttribute("p", { class: className });
  $title.textContent = movieTitle;

  return $title;
};
export default MovieTitle;
