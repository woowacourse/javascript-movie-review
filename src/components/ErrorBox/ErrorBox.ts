import { IMAGE_PATH } from "../../constants/imagePaths";
import { createElement } from "../../utils/dom";

export const addErrorBox = (text: string) => {
  const $movieListSection = document.querySelector(
    ".movie-list-section"
  ) as HTMLElement;
  const $errorBox = $ErrorBox({ text });
  $movieListSection.appendChild($errorBox);
  return $errorBox;
};

export const removeErrorBox = () => {
  const $errorBox = document.querySelector(".error-box");
  if ($errorBox) {
    $errorBox.remove();
  }
};

interface ErrorBoxProps {
  text: string;
}

const $ErrorBox = ({ text }: ErrorBoxProps) => {
  const $errorPlanet = createElement("img", {
    src: IMAGE_PATH.EMPTY_PLANET,
    className: "empty-planet",
    alt: text,
  });
  const $emptyText = createElement("h2", {
    textContent: text,
  });

  const $box = createElement("div", {
    className: "error-box",
  });
  $box.append($errorPlanet, $emptyText);

  return $box;
};

export default $ErrorBox;
