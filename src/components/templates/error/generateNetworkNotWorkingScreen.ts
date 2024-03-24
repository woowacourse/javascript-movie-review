import IMAGES from "../../../images";
import { HTMLTemplate } from "../../abstract/BaseComponent";

export const generateNetworkNotWorkingScreen = (): HTMLTemplate => {
  return `
    <div class="fallback-container">
      <img class="fallback-image" src="${IMAGES.workers}" />
      <p class="fallback-message">네트워크를 확인해 주세요.</p>
      <button class="fallback-handle-button" onclick="location.reload()">새로고침하기</button>
    </div>
  `;
};
