import fetchDetailsMovie from "../fetch/fetchDetailsMovie";
import Button from "./Button";
import Modal from "./Modal";
import MoviePreviewInfo from "./MoviePreviewInfo";
import createElement from "./utils/createElement";

const BUTTON_DETAIL = "자세히 보기";

const TopRatedContainer = ({ popularMovie }) => {
  const $topRatedContainer = createElement({
    tag: "div",
    classNames: ["top-rated-container"],
  });

  const $topRatedMovie = createElement({
    tag: "div",
    classNames: ["top-rated-movie"],
  });

  $topRatedContainer.append($topRatedMovie);
  $topRatedMovie.append(
    MoviePreviewInfo({
      bigFont: true,
      movie: popularMovie,
    })
  );

  const $button = Button({ text: BUTTON_DETAIL, type: "detail" });
  $topRatedMovie.append($button);

  $button.addEventListener("click", async () => {
    const movieDetails = await fetchDetailsMovie(popularMovie.id);
    const $wrap = document.querySelector("#wrap");
    $wrap.appendChild(Modal(movieDetails));
  });

  return $topRatedContainer;

};

export default TopRatedContainer;

