import { MovieDetail } from "../../../types/type";

const defaultPosterPath = "/images/default-poster.svg";

const IMAGE_PATH_PREFIX = "https://image.tmdb.org/t/p/w440_and_h660_face";
const $MovieItem = ({ title, poster_path, vote_average }: MovieDetail) => {
  const $rate = createElement("p", {
    className: "rate",
  });
  const $star = createElement("img", {
    src: "./images/star_empty.png",
    className: "star",
  });
  const $rateValue = createElement("span", {
    textContent: `${vote_average}`,
  });
  $rate.append($star, $rateValue);

  const $movieTitle = createElement("strong", {
    textContent: title,
  });
  const $description = createElement("div", {
    className: "item-desc",
  });
  $description.append($rate, $movieTitle);

  const $item = createElement("li", {
    className: "item",
  });
  const $poster = createElement("img", {
    className: "thumbnail",
    src: poster_path ? IMAGE_PATH_PREFIX + poster_path : defaultPosterPath,
    alt: title,
  });
  $item.append($poster, $description);
  return $item;
};

export default $MovieItem;
