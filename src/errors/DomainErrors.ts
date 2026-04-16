export abstract class DomainError extends Error {
  constructor(
    message: string,
    public readonly cause?: unknown,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

/** 네트워크 자체 실패 (오프라인, DNS 실패, CORS 등) */
export class NetworkError extends DomainError {}

export class ApiError extends DomainError {
  constructor(
    public readonly status: number,
    message: string,
    cause?: unknown,
  ) {
    super(message, cause);
  }
}

/** 응답 본문 파싱 실패 (JSON 깨짐 등) */
export class ApiParseError extends DomainError {}

export class EmptyQueryError extends DomainError {
  constructor() {
    super("검색어를 입력해주세요.");
  }
}

/** 환경설정 문제 (API key 누락 등) — 개발자 문제. 사용자에게는 일반 메시지. */
export class ConfigError extends DomainError {}

/** 로컬/원격 저장소 쓰기 실패 */
export class StorageError extends DomainError {}