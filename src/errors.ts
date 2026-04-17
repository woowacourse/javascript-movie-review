export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export class UnauthorizedError extends ApiError {
  constructor() {
    super(401, "인증에 실패했습니다.");
    this.name = "UnauthorizedError";
  }
}

export class NotFoundError extends ApiError {
  constructor() {
    super(404, "요청한 리소스를 찾을 수 없습니다.");
    this.name = "NotFoundError";
  }
}

export class TooManyRequestsError extends ApiError {
  constructor() {
    super(429, "요청이 너무 많습니다. 잠시 후 새로고침 해주세요.");
    this.name = "TooManyRequestsError";
  }
}

export class ServiceUnavailableError extends ApiError {
  constructor() {
    super(503, "서버가 일시적으로 사용 불가 상태입니다. 잠시 후 다시 시도해주세요.");
    this.name = "ServiceUnavailableError";
  }
}
