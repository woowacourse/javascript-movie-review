import IMAGES from "../images";
import BaseComponent, { HTMLTemplate } from "./abstract/BaseComponent";

export default class MovieHeader extends BaseComponent {
  getTemplate(): HTMLTemplate {
    return `
      <h1><img src="${IMAGES.logo}" alt="MovieList 로고" /></h1>
      <div class="search-box">
        <input type="text" placeholder="검색" />
        <button class="search-button">검색</button>
      </div>
  `;
  }
}
