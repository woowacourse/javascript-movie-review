import { createElement } from "../../utils/dom";
import { getPosterUrl } from "../../utils/getPosterUrl";
import { MovieDetail } from "../../../types/type";
import { ICON_PATH } from "../../constants/imagePaths";

export const handleModal = {
  open() {
    const $modal = document.getElementById("modalBackground");
    if (!$modal) return;

    $modal.classList.add("active");
    document.body.classList.add("modal-open");
  },

  close() {
    const $modal = document.getElementById("modalBackground");
    if (!$modal) return;

    $modal.classList.remove("active");
    document.body.classList.remove("modal-open");
  },

  updateModalContent(movieData: MovieDetail) {
    const $modal = document.getElementById("modalBackground");
    if (!$modal) return;

    const posterUrl = getPosterUrl(movieData.poster_path);

    const $image = $modal.querySelector(".modal-image img") as HTMLImageElement;
    if ($image) $image.src = posterUrl;

    const $title = $modal.querySelector(".modal-description h2");
    if ($title) $title.textContent = movieData.title;

    const $category = $modal.querySelector(".category");
    if ($category)
      $category.textContent =
        movieData.release_year + " · " + movieData.genres.join(", ") || "";

    const $rateValue = $modal.querySelector(".rate span");
    if ($rateValue)
      $rateValue.textContent = movieData.vote_average?.toFixed(1) || "0.0";

    const $detail = $modal.querySelector(".detail");
    if ($detail) $detail.textContent = movieData.overview || "";

    this.open();
  },
};

const $Modal = () => {
  const $modal = createElement("div", {
    className: "modal-background",
    id: "modalBackground",
  });

  const $modalElement = createElement("div", {
    className: "modal",
  });

  const $closeButton = createElement("button", {
    className: "close-modal",
    id: "closeModal",
  });

  const $closeImage = createElement("img", {
    src: ICON_PATH.MODAL_CLOSE,
  });
  $closeButton.appendChild($closeImage);

  const $modalContainer = createElement("div", {
    className: "modal-container",
  });

  const $modalImage = createElement("div", {
    className: "modal-image",
  });

  const $image = createElement("img", {
    src: "",
  });
  $modalImage.appendChild($image);

  const $modalDescription = createElement("div", {
    className: "modal-description",
  });

  const $title = createElement("h2", {
    textContent: "",
    className: "title",
  });

  const $category = createElement("p", {
    className: "category",
    textContent: "",
  });

  const $rateContainer = createElement("div", {
    className: "rate-container",
  });

  const $rateTitle = createElement("span", {
    textContent: "평균",
  });

  const $rate = createElement("p", {
    className: "rate",
  });

  const $star = createElement("img", {
    src: ICON_PATH.STAR_EMPTY,
    className: "star",
  });

  const $rateValue = createElement("span", {
    textContent: "",
  });

  $rate.append($star, $rateValue);
  $rateContainer.append($rateTitle, $rate);

  const $rateHr = createElement("hr", {});
  const $userRateHr = createElement("hr", {});

  const $userRateContainer = createElement("div", {
    className: "user-rate-container",
  });

  const $userRateTitle = createElement("h3", {
    textContent: "내 별점",
    className: "container-title",
  });

  const $userRate = createElement("div", {
    className: "user-rate",
  });

  const $userRateStars = createElement("div", {
    className: "user-rate-stars",
  });

  const $userRateStar1 = createElement("img", {
    src: ICON_PATH.STAR_FILLED,
    className: "star",
    id: "userRateStar1",
  });

  const $userRateStar2 = createElement("img", {
    src: ICON_PATH.STAR_EMPTY,
    className: "star",
    id: "userRateStar2",
  });

  const $userRateStar3 = createElement("img", {
    src: ICON_PATH.STAR_EMPTY,
    className: "star",
    id: "userRateStar3",
  });

  const $userRateStar4 = createElement("img", {
    src: ICON_PATH.STAR_EMPTY,
    className: "star",
    id: "userRateStar4",
  });

  const $userRateStar5 = createElement("img", {
    src: ICON_PATH.STAR_EMPTY,
    className: "star",
    id: "userRateStar5",
  });

  $userRateStars.append(
    $userRateStar1,
    $userRateStar2,
    $userRateStar3,
    $userRateStar4,
    $userRateStar5
  );

  const $userRateTextContainer = createElement("div", {
    className: "user-rate-text-container",
  });

  const $userRateText = createElement("p", {
    textContent: "최악이예요",
    className: "user-rate-text",
    id: "userRateText",
  });

  const $userRateValue = createElement("p", {
    textContent: "(2/10)",
    className: "user-rate-value",
    id: "userRateValue",
  });

  $userRateTextContainer.append($userRateText, $userRateValue);
  $userRate.append($userRateStars, $userRateTextContainer);

  $userRateContainer.append($userRateTitle, $userRate);

  const $detailContainer = createElement("div", {
    className: "detail-container",
  });

  const $detailTitle = createElement("h3", {
    textContent: "줄거리",
    className: "container-title",
  });

  const $detail = createElement("p", {
    className: "detail",
    textContent: "",
  });

  $detailContainer.append($detailTitle, $detail);

  $modalDescription.append(
    $title,
    $category,
    $rateContainer,
    $rateHr,
    $userRateContainer,
    $userRateHr,
    $detailContainer
  );
  $modalContainer.append($modalImage, $modalDescription);
  $modalElement.append($closeButton, $modalContainer);
  $modal.appendChild($modalElement);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      handleModal.close();
    }
  };

  document.addEventListener("keydown", handleKeyDown);

  $closeButton.addEventListener("click", handleModal.close);

  $modal.addEventListener("click", (e) => {
    if (e.target === $modal) {
      handleModal.close();
    }
  });

  return $modal;
};

export default $Modal;
