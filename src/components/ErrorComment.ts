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
        <div class="error">${ERROR_MESSAGE[this._errorCode]}</div>
        `;
  }

  render() {
    const itemList = $(".item-list") as HTMLElement;
    itemList.innerHTML = this.create();
  }
}
