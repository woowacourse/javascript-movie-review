import IMAGES from "../../../images";
import { HTMLTemplate } from "../../abstract/BaseComponent";

export const generateErrorFallbackScreen = (): HTMLTemplate => {
  return `
    <div class="fallback-container">
      <img class="fallback-image" src="${IMAGES.workers}" />
      <p class="fallback-message">예상치 못한 오류가 발생했습니다.</p>
      <p>같은 현상이 반복되면 관리자에게 문의해 주세요 (010-1234-1234)</p>
      <button class="fallback-handle-button" onclick="location.reload()">새로고침하기</button>
    </div>
  `;
};
