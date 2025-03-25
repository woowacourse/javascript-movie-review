import { ICON_PATH } from "../../constants/imagePaths";

export const removeBanner = () => {
  const $header = document.querySelector("header") as HTMLElement;
  $header.classList.remove("banner-open");

  const $banner = document.querySelector(".background-container");
  $banner?.remove();
};

export const addBanner = () => {
  const $header = document.querySelector("header") as HTMLElement;
  $header.classList.add("banner-open");
  $header.prepend($Banner());
};

const $Banner = () => {
  const $backgroundContainer = createElement("div", {
    className: "background-container",
  });

  const $overlay = createElement("div", {
    className: "overlay",
    ariaHidden: "true",
  });

  const $star = createElement("img", {
    src: ICON_PATH.STAR_EMPTY,
    className: "star",
  });
  const $rateValue = createElement("span", {
    className: "rate-value",
    textContent: "9.5",
  });
  const $rate = createElement("div", {
    className: "rate",
  });
  $rate.append($star, $rateValue);

  const $title = createElement("div", {
    className: "title",
    textContent: "인사이드 아웃2",
  });

  const $topRatedContainer = createElement("div", {
    className: "top-rated-container",
  });
  $topRatedContainer.append($rate, $title);

  $backgroundContainer.append($overlay, $topRatedContainer);

  return $backgroundContainer;
};

export default $Banner;
