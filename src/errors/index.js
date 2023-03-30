import { ERROR_MESSAGE } from "../constants/errorMessage";

export class ResponseError extends Error {
  constructor() {
    super(ERROR_MESSAGE.RESPONSE);
    this.name = "Response Error";
  }
}

export class OfflineError extends Error {
  constructor() {
    super(ERROR_MESSAGE.OFFLINE);
    this.name = "Offline Error";
  }
}

export class APIError extends Error {
  constructor(code) {
    super(ERROR_MESSAGE.API[code] || ERROR_MESSAGE.API_DEFAULT);
    this.name = "API Error";
    this.code = code;
  }
}
