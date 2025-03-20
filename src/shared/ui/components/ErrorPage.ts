import { CustomButton } from "./CustomButton";

const ErrorPage = () => {
  const errorPageContainer = document.createElement("div");
  errorPageContainer.className = "error-page-container";

  errorPageContainer.innerHTML = /*html*/ `
      <img src="./images/으아아행성이.png" alt="error-page-image" class="error-page-image" />
      <h1>오류가 발생했습니다.</h1>
      ${
        CustomButton({
          title: "홈으로 돌아가기",
          className: "error-page-button",
        }).outerHTML
      }
  `;

  const errorPageButton =
    errorPageContainer.querySelector(".error-page-button");

  errorPageButton!.addEventListener("click", () => {
    window.location.replace("/");
  });

  return errorPageContainer;
};

export default ErrorPage;
