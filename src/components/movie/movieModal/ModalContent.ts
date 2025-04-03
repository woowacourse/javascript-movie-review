import { MovieDetail } from "../../../types/Type";
import createElement from "../../utils/createElement";
import imageUrl from "../../../utils/imageUrl";
import { getGenres, getYear } from "../../../utils/parsingData";

const createModalContent = (movieDetail: MovieDetail) => {
  const { title, release_date, genres, vote_average, overview, poster_path } =
    movieDetail;

  const $modal = createElement({ tag: "div", classNames: ["modal"] });
  const $closeModal = createElement({
    tag: "button",
    classNames: ["close-modal"],
    id: "closeModal",
  });
  const $closeImg = createElement({
    tag: "img",
    src: "./images/modal_button_close.png",
  });
  $closeModal.appendChild($closeImg);

  const $modalContainer = createElement({
    tag: "div",
    classNames: ["modal-container"],
  });
  const $modalImage = createElement({
    tag: "div",
    classNames: ["modal-image"],
  });
  const $modalImg = createElement({ tag: "img", src: imageUrl(poster_path) });
  $modalImage.appendChild($modalImg);

  const $modalDescription = createElement({
    tag: "div",
    classNames: ["modal-description"],
  });
  const $title = createElement({ tag: "h1", id: "modalTitle" });
  $title.textContent = title;
  const $category = createElement({ tag: "p", classNames: ["category"] });
  $category.textContent = `${getYear(release_date)} · ${getGenres(genres)}`;

  const $averageRate = createElement({ tag: "p", classNames: ["rate"] });
  const $label = createElement({ tag: "span" });
  $label.textContent = "평균";
  const $starFilled = createElement({
    tag: "img",
    classNames: ["star"],
    src: "./images/star_filled.png",
  });
  const $rateScore = createElement({ tag: "span", classNames: ["rate-score"] });
  $rateScore.textContent = `${vote_average}`;
  $averageRate.append($label, $starFilled, $rateScore);

  const $rateBox = createElement({ tag: "div", classNames: ["rate-box"] });
  const $myStar = createElement({ tag: "h2", classNames: ["my-star"] });
  $myStar.textContent = "내 별점";

  const $starCommentBox = createElement({
    tag: "div",
    classNames: ["star-comment-box"],
  });
  const $stars = createElement({ tag: "div", classNames: ["stars"] });
  const $comment = createElement({ tag: "p", classNames: ["comment"] });
  const $score = createElement({ tag: "span", classNames: ["score"] });
  $starCommentBox.append($stars, $comment, $score);

  const $overview = createElement({ tag: "h2", classNames: ["overview"] });
  $overview.textContent = "줄거리";
  const $detail = createElement({ tag: "p", classNames: ["detail"] });
  $detail.textContent = overview;

  $rateBox.append($myStar, $starCommentBox);
  $modalDescription.append(
    $title,
    $category,
    $averageRate,
    $rateBox,
    $overview,
    $detail
  );
  $modalContainer.append($modalImage, $modalDescription);

  $modal.append($closeModal, $modalContainer);

  return { $modal, $stars, $score, $comment };
};

export default createModalContent;
