const ErrorView = () => {
  const $main = document.querySelector("main");
  const $errorDiv = document.createElement("div");
  $errorDiv.classList.add("error-view");
  $errorDiv.textContent = "서버와의 연결이 불안정합니다. 다시 시도해주세요.";
  $main?.appendChild($errorDiv);
};

export default ErrorView;
