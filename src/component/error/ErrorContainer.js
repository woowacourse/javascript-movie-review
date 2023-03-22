import CustomElement from "../basic/CustomElement";
import ErrorBoss from "../../domain/ErrorBoss";
import { ERROR } from "../../abstract/constants";
import { $ } from "../../util/dom";

class ErrorContainer extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    ErrorBoss.subscribe(this);
  }

  template() {
    return `
        <section class="item-view error-message">
        </section>
    `;
  }

  rerender(errorCode) {
    $(".movie-container").remove();

    console.log(errorCode);
    const errorMessage = this.makeErrorMessage(errorCode);

    $(".error-message").innerHTML = `
      <h2 class='movie-container-title'>오류가 발생 했습니다.</h2>

      <div>
       ${errorMessage}
      </div>
      `;
  }

  makeErrorMessage(errorCode) {
    if (errorCode === ERROR.SERVER)
      return `<h3 class="text-subtitle">현재 서버와 연결이 어렵습니다.</h3>`;
    if (errorCode === ERROR.ACCESS)
      return `<h3 class="text-subtitle">잘못된 접근입니다.</h3>
      <p class="text-subtitle">접근 권한을 확인해주세요.</p>`;
    if (errorCode === ERROR.ROUTE)
      return `<h3 class="text-subtitle">잘못된 접근입니다.</h3>
      <p class="text-subtitle">페이지 경로를 확인해주세요.</p>`;
    if (errorCode === ERROR.UNKNOWN)
      return `<h3 class="text-subtitle">알 수 없는 오류가 발생했습니다.</h3>`;
  }
}

customElements.define("error-container", ErrorContainer);

export default ErrorContainer;
