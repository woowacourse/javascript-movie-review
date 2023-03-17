import CustomComponent from "../../abstracts/CustomComponent";
import ErrorImg from "../../../templates/error.png";

export default class ErrorComponent extends CustomComponent {
  template() {
    return `
            <div class="error-title">
                <img src=${ErrorImg} alt="error_icon" width="100" height="100">
                <h1>오류</h1>
            </div>
            <p class="error-content">예상치 못한 오류가 발생했어요 :(</p>
        `;
  }
}

customElements.define("error-page", ErrorComponent);
