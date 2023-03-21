import { ERROR_MESSAGE } from "../constants/errorMessages";

export class ErrorComment {
  private _errorCode: number;

  constructor(errorCode: number) {
    this._errorCode = errorCode;
  }

  create() {
    return `
        <div class="error">${ERROR_MESSAGE[this._errorCode]}</div>
        `;
  }

  render() {
    document.querySelector(".item-list")!.innerHTML = this.create();
  }
}
