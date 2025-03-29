import "./skeletonDetailMovie.css";

const $SkeletonMovieDetail = () => {
  const $detailModal = createElement("div", {
    className: "skeleton-detail-movie",
  });
  const $imageBox = createElement("div", {
    className: "skeleton-modal-image-box",
  });
  const $image = createElement("div", {
    className: "skeleton-modal-image",
  });
  $imageBox.appendChild($image);

  const $detailBox = createElement("div", {
    className: "detail-movie-box",
  });

  const $title = createElement("h2", {
    className: "skeleton-detail-movie-title",
  });
  const $category = createElement("p", {
    className: "skeleton-detail-movie-category",
  });

  const $movieRate = createElement("p", {
    className: "skeleton-detail-movie-rate",
  });
  const $rateBox = createElement("div", {
    className: "skeleton-rate-box",
  });

  const $descriptionBox = createElement("div", {
    className: "skeleton-detail-movie-description-box",
  });

  $detailBox.append($title, $category, $movieRate, $rateBox, $descriptionBox);
  $detailModal.append($imageBox, $detailBox);

  return $detailModal;
};

export default $SkeletonMovieDetail;
