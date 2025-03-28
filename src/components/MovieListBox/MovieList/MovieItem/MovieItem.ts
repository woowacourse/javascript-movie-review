import { MovieData } from "../../../../../types/type";
import { createElement } from "../../../../utils/dom";
import { POSTER_PATH, ICON_PATH } from "../../../../constants/imagePaths";
import { getPosterUrl } from "../../../../utils/getPosterUrl";

export const MOVIE_ITEM_CLICK = "movie-item:click";

const $MovieItem = ({ id, title, poster_path, vote_average }: MovieData) => {
  const $rate = createElement("p", {
    className: "rate",
  });
  const $star = createElement("img", {
    src: ICON_PATH.STAR_EMPTY,
    className: "star",
  });
  const $rateValue = createElement("span", {
    textContent: `${vote_average.toFixed(1)}`,
  });
  $rate.append($star, $rateValue);

  const $movieTitle = createElement("strong", {
    className: "movie-title",
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
    src: POSTER_PATH.LOADING,
    alt: title,
    loading: "lazy",
  }) as HTMLImageElement;

  if (poster_path) {
    const posterUrl = getPosterUrl(poster_path);

    const actualImage = new Image();
    actualImage.src = posterUrl;

    actualImage.onload = () => {
      $poster.src = posterUrl;
    };

    actualImage.onerror = () => {
      $poster.src = POSTER_PATH.ERROR;
    };
  } else {
    $poster.src = POSTER_PATH.DEFAULT;
  }

  $item.append($poster, $description);

  $item.addEventListener("click", () => {
    const event = new CustomEvent(MOVIE_ITEM_CLICK, {
      detail: { movieId: id },
      bubbles: true,
    });
    $item.dispatchEvent(event);
  });

  return $item;
};

export default $MovieItem;
