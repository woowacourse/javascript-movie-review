import { toElement } from "../../utils/toElement";
import { CustomButton } from "./CustomButton";

export default function ErrorPage(errorMessage?: string) {
  const $container = document.querySelector(".container");

  const errorPageContainer = toElement(`
    <div class="error-page-container">
      <img src="./images/으아아행성이.png" alt="error-page-image" class="error-page-image" />
      <h1>오류가 발생했습니다.</h1>
      <p>${errorMessage}</p>
      ${
        CustomButton({
          title: "홈으로 돌아가기",
          className: "error-page-button",
        }).outerHTML
      }
    </div>
  `);

  const errorPageButton =
    errorPageContainer.querySelector(".error-page-button");

  errorPageButton!.addEventListener("click", () => {
    window.location.replace("/");
  });

  $container!.replaceChildren(errorPageContainer);
}
