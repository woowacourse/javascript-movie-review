import { createElement } from "../../utils/dom";
import { ICON_PATH } from "../../constants/imagePaths";
import handleModal from "../../domains/modal/modalHandler";

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
    src: ICON_PATH.STAR_EMPTY,
    className: "star",
    id: "userRateStar1",
  }) as HTMLImageElement;
  $userRateStar1.dataset.value = "1";

  const $userRateStar2 = createElement("img", {
    src: ICON_PATH.STAR_EMPTY,
    className: "star",
    id: "userRateStar2",
  }) as HTMLImageElement;
  $userRateStar2.dataset.value = "2";

  const $userRateStar3 = createElement("img", {
    src: ICON_PATH.STAR_EMPTY,
    className: "star",
    id: "userRateStar3",
  }) as HTMLImageElement;
  $userRateStar3.dataset.value = "3";

  const $userRateStar4 = createElement("img", {
    src: ICON_PATH.STAR_EMPTY,
    className: "star",
    id: "userRateStar4",
  }) as HTMLImageElement;
  $userRateStar4.dataset.value = "4";

  const $userRateStar5 = createElement("img", {
    src: ICON_PATH.STAR_EMPTY,
    className: "star",
    id: "userRateStar5",
  }) as HTMLImageElement;
  $userRateStar5.dataset.value = "5";

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
    textContent: "내 평점을 남겨주세요",
    className: "user-rate-text",
    id: "userRateText",
  });

  const $userRateValue = createElement("p", {
    textContent: "(0/10)",
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

  const handleStarClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("star") && target.dataset.value) {
      const value = parseInt(target.dataset.value);
      const currentMovieId = (window as any).currentMovieId;

      if (currentMovieId) {
        handleModal.saveRating(currentMovieId, value);
      }
    }
  };

  $userRateStars.addEventListener("click", handleStarClick);

  return $modal;
};

export default $Modal;
