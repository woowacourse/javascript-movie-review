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
