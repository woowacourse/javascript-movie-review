import { MovieDetail } from "../../../../../types/type";

const defaultPosterPath = "./default-poster.svg";
const imagePathPreFix = "https://image.tmdb.org/t/p/w440_and_h660_face";

const $MovieItem = ({ title, poster_path, vote_average }: MovieDetail) => {
  const $rate = createElement("p", {
    className: "rate",
  });
  const $star = createElement("img", {
    src: "./star_empty.png",
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
    src: "./placeholder-poster.svg",
    alt: title,
    loading: "lazy",
    onerror: "this.src='./error-poster.svg'",
    onload: function () {
      this.src = poster_path
        ? imagePathPreFix + poster_path
        : defaultPosterPath;
    },
  });
  $item.append($poster, $description);
  return $item;
};

export default $MovieItem;
