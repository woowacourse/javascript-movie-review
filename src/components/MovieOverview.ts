import { createElementWithAttribute } from "../utils";

const MovieOverview = (overview: string, className: string) => {
  const $overview = createElementWithAttribute("p", { class: className });
  $overview.textContent = overview;

  return $overview;
};

export default MovieOverview;
