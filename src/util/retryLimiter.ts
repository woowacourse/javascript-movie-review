export class RetryLimitError extends Error {
  constructor() {
    super('더 이상 요청할 수 없습니다.');
  }
}

export function retryLimiter(tryCount: number) {
  if (tryCount > 5) throw new RetryLimitError();
}
