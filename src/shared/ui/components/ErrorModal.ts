import { toElement } from "../../utils/toElement";
import { CustomButton } from "./CustomButton";

export default function ErrorModal(errorMessage?: string) {
  const $container = document.getElementById("wrap");

  const errorModalContainer = toElement(`
    <div class="error-modal-container">
      <div class="close-error-modal">
      X
      </div>
      <h1>오류가 발생했습니다.</h1>
      <p>${errorMessage}</p>
      ${
        CustomButton({
          title: "홈으로 돌아가기",
          className: "error-modal-button",
        }).outerHTML
      }
    </div>
  `);

  const errorModalButton = errorModalContainer.querySelector(
    ".error-modal-button"
  );

  errorModalButton!.addEventListener("click", () => {
    window.location.replace("/");
  });

  $container!.appendChild(errorModalContainer);

  closeErrorModal(errorModalContainer);
}

function closeErrorModal(errorModalContainer: HTMLElement) {
  const $closeErrorModalButton = document.querySelector(".close-error-modal");
  $closeErrorModalButton?.addEventListener("click", () => {
    errorModalContainer.remove();
  });
}
