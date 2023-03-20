import CustomComponent from "../../abstracts/CustomComponent";
import ErrorImg from "../../../templates/error.png";
export default class ErrorComponent extends CustomComponent {
  template() {
    return `
            <div class="error-title">
                <img src=${ErrorImg} alt="error_icon" width="100" height="100">
                <h2>오류</h2>
            </div>
            <p class="error-content">예상치 못한 오류가 발생했어요 :(</p>
            <button class="error-cta-btn" data-action="popular">눌러서 메인 페이지로 이동하기</button>
        `;
  }
}

customElements.define("error-page", ErrorComponent);
