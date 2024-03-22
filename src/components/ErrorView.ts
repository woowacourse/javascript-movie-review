import { createElementWithAttribute } from "../utils";

const handleClickRetryButton = (event: Event) => {
  event.stopPropagation();
  window.location.reload();
};

const makeRetryButton = () => {
  const $retryButton = document.createElement("button");
  $retryButton.textContent = "새로 고침 🔁";

  $retryButton.addEventListener("click", handleClickRetryButton);

  return $retryButton;
};
const makeErrorDiv = (errorMessage: string) => {
  const $errorDiv = document.createElement("div");
  const $retryButton = makeRetryButton();
  const $errorMessage = createElementWithAttribute("div", {
    class: "error-message",
  });

  $errorDiv.classList.add("error-view");
  $errorMessage.textContent = errorMessage;
  $errorDiv.appendChild($errorMessage);
  $errorDiv.appendChild($retryButton);

  return $errorDiv;
};

const ErrorView = (errorMessage: string) => {
  const $main = document.querySelector("main");
  const $errorDiv = makeErrorDiv(errorMessage);

  $main?.appendChild($errorDiv);
};

export default ErrorView;
