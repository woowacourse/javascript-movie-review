import { $ } from "../../utils/dom";
import Component from "../common/Component";

import "./NetworkErrorMessage.css";

export default class NetworkErrorMessage extends Component {
  protected getTemplate(): string {
    return /*html*/ `
      <div id="error-message-container" class="w-4_5 rounded-lg error-message-container hidden">
        <p class="error-title">! 문제가 발생했습니다.</p>
        <p id="error-description" class="font-normal error-text"></p> 
        <p class="font-normal error-text">페이지를 새로 고침 하거나 다시 시도해주세요.</p>
      </div>
    `;
  }

  protected render(): void {
    this.$target.insertAdjacentHTML("beforeend", this.getTemplate());
  }

  private showErrorMessage(message: string) {
    const $div = $<HTMLDivElement>("#error-message-container");
    const $p = $<HTMLParagraphElement>("#error-description");

    if (!$div || !$p) return;

    $div.classList.remove("hidden");
    $p.innerText = message;

    document.body.classList.add("overflow-hidden");
  }

  public show(message: string) {
    this.showErrorMessage(message);
  }
}
