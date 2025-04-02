import Button from "./Button";
import MoviePreviewInfo from "./MoviePreviewInfo";
import createElement from "./utils/createElement";
import openMovieModal from "./utils/openMovieModal";

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

  $topRatedMovie.append(
    MoviePreviewInfo({
      bigFont: true,
      movie: popularMovie,
    })
  );

  const $button = Button({ text: BUTTON_DETAIL, type: "detail" });

  $button.addEventListener("click", async () => {
    openMovieModal(popularMovie);
  });

  $topRatedMovie.append($button);
  $topRatedContainer.append($topRatedMovie);

  return $topRatedContainer;
};

export default TopRatedContainer;
