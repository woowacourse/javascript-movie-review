import "./movieItem.css";
import { MovieDetail } from "../../../../../types/type";
import getMovieDetail from "../../../../apis/getMovieDetail";
import { renderMovieDetailModal } from "../../../Modal/MovieDetail/MovieDetailModal";
import $MoviePoster from "../../../MoviePoster/MoviePoster";
import asyncErrorBoundary from "../../../ErrorBoundary/Async/asyncErrorBoundary";
import { addErrorBox } from "../../../ErrorBox/ErrorBox";

const $MovieItem = ({ id, title, poster_path, vote_average }: MovieDetail) => {
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

  const $posterBox = createElement("div", {
    className: "thumbnail-box",
  });
  $posterBox.appendChild(
    $MoviePoster({ className: "thumbnail", title, poster_path })
  );

  $item.append($posterBox, $description);

  $item.addEventListener("click", async () => {
    asyncErrorBoundary({
      asyncFn: () =>
        renderMovieDetailModal({ fetchFn: () => getMovieDetail(id) }),
      fallbackComponent: (errorMessage) =>
        addErrorBox({ selector: ".modal-content", errorMessage }),
    });
  });

  return $item;
};

export default $MovieItem;
