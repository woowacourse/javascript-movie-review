import { ERROR_VIEW_TEXT } from "../constants/system";

const ErrorView = () => {
  const $main = document.querySelector("main");
  const $errorDiv = document.createElement("div");
  $errorDiv.classList.add("error-view");
  $errorDiv.textContent = ERROR_VIEW_TEXT;

  $main?.appendChild($errorDiv);
};

export default ErrorView;
