import { ERROR_MESSAGE } from "../constants/errorMessages";
import { $ } from "../utils/selector";

export class ErrorComment {
  private _errorCode: number;

  constructor(errorCode: number) {
    this._errorCode = errorCode;
    this.render();
  }

  create() {
    return `
        <img src="/bear.png" class="empty-data-image"/>
        <div class="error">${ERROR_MESSAGE[this._errorCode]}</div>
        `;
  }

  removeTitle() {
    const title = $("h2") as HTMLElement;
    title.remove();
  }

  render() {
    this.removeTitle();
    const itemList = $(".item-list") as HTMLElement;
    itemList.innerHTML = this.create();
  }
}
