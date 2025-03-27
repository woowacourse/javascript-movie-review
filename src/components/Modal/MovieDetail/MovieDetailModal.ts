import { Genre, MovieDetail } from "../../../../types/type";
import $MoviePoster from "../../MoviePoster/MoviePoster";
import $RateBox from "../../RateBox/RateBox";

const parseReleaseDate = (releaseDate: string) => {
  const date = new Date(releaseDate);
  return date.getFullYear();
};

const parseGenre = (genres: Genre[]) => {
  return genres.map(({ name }) => name).join(", ");
};

const $MovieDetailModal = ({
  id,
  poster_path,
  release_date,
  genres,
  title,
  overview,
  vote_average,
}: MovieDetail) => {
  const $detailModal = createElement("div", {
    className: "detail-movie",
  });

  const $imageBox = createElement("div", {
    className: "modal-image",
  });
  $imageBox.appendChild(
    $MoviePoster({
      className: "detail-movie-poster",
      title,
      poster_path,
    })
  );

  const $detailBox = createElement("div", {
    className: "detail-movie-box",
  });

  const $title = createElement("h2", {
    className: "detail-movie-title",
    textContent: title,
  });
  const $category = createElement("p", {
    className: "detail-movie-category",
    textContent: `${parseReleaseDate(release_date)} · ${parseGenre(genres)}`,
  });

  const $movieRate = createElement("p", {
    className: "detail-movie-rate",
  });
  const $rateSpan = createElement("span", { textContent: "평균" });
  const $rateImage = createElement("img", {
    src: "./star_filled.png",
    className: "rate-star",
    alt: "평점",
  });
  const $rateText = createElement("span", {
    className: "rate-text",
    textContent: vote_average.toFixed(1),
  });
  $movieRate.append($rateSpan, $rateImage, $rateText);

  const $descriptionBox = createElement("div", {
    className: "detail-movie-description-box",
  });
  const $descriptionTitle = createElement("p", {
    className: "detail-movie-description-title",
    textContent: "줄거리",
  });
  const $descriptionContent = createElement("p", {
    className: "detail-movie-description-content",
    textContent: overview || "제공된 줄거리 정보가 없습니다.",
  });
  $descriptionBox.append($descriptionTitle, $descriptionContent);

  $detailBox.append(
    $title,
    $category,
    $movieRate,
    $RateBox(id),
    $descriptionBox
  );
  $detailModal.append($imageBox, $detailBox);

  return $detailModal;
};

export default $MovieDetailModal;
