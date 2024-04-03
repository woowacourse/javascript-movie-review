import { ERROR_VIEW_TEXT } from "../constants/system";

const $main = document.querySelector("main");

export const removeErrorView = () => {
  const $errorView = document.querySelector(".error-view");
  $errorView?.remove();
};

export const renderErrorItemView = () => {
  const $errorView = document.querySelector(".error-view");
  if ($errorView) {
    return;
  }
  const $errorDiv = document.createElement("div");
  $errorDiv.classList.add("error-view");
  $errorDiv.textContent = ERROR_VIEW_TEXT;

  $main?.appendChild($errorDiv);
};
