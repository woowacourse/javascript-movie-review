import { createElementWithAttribute } from "../utils";

const MovieOverview = (overview: string, className: string) => {
  const $overview = createElementWithAttribute("p", { class: className });

  if (overview) {
    $overview.textContent = overview;
  } else {
    $overview.textContent = "영화 정보가 등록되어 있지 않습니다.";
  }

  return $overview;
};

export default MovieOverview;
