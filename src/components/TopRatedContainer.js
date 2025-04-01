import fetchDetailsMovie from "../fetch/fetchDetailsMovie";
import Button from "./Button";
import Modal from "./Modal";
import MovieItemModal from "./MovieItemModal";
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

  $topRatedMovie.append(
    MoviePreviewInfo({
      bigFont: true,
      movie: popularMovie,
    })
  );

  const $button = Button({ text: BUTTON_DETAIL, type: "detail" });

  $button.addEventListener("click", async () => {
    const movieDetails = await fetchDetailsMovie(popularMovie.id);
    const initialRate =
      Number(localStorage.getItem(String(movieDetails.id))) || 0;
    const $modal = Modal({
      content: MovieItemModal(movieDetails, initialRate),
      onOpen: () => document.querySelector(".gnb")?.classList.add("disappear"),
      onClose: () =>
        document.querySelector(".gnb")?.classList.remove("disappear"),
    });

    document.body.appendChild($modal);
  });

  $topRatedMovie.append($button);
  $topRatedContainer.append($topRatedMovie);

  return $topRatedContainer;
};

export default TopRatedContainer;
