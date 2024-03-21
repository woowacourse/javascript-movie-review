import IMAGES from "../../images";
import { HTMLTemplate } from "../abstract/BaseComponent";

export const generateNetworkNotWorkingScreen = (): HTMLTemplate => {
  return `
    <div class="unexpected-case-container"><img class="unexpected-case-image" src='${IMAGES.workers}' />
      <p class="unexpected-case-message">네트워크를 확인해 주세요.</p>
    </div>
  `;
};

export const generateEmptyMovieListScreen = (): HTMLTemplate => {
  return `
    <div class="unexpected-case-container">
      <img class="unexpected-case-image" src="${IMAGES.emptyMovieList}" />
      <p class="unexpected-case-message">표시할 영화 정보가 없습니다.</p>
    </div>
  `;
};
