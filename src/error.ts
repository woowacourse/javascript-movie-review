import { showErrorToast } from "./toast";

export class AppError extends Error {
  constructor(
    message: string,
    cause?: unknown
  ) {
    super(message, { cause });
    this.name = this.constructor.name;
  }
}

export class APIError extends AppError {
  constructor(
    public readonly response: Response
  ) {
    super(`API 요청 실패: ${response.status} ${response.url}`);
  }
}

export class TimeoutError extends AppError {
  constructor(
    public readonly endpoint: string,
    public readonly timeoutMs: number
  ) {
    super(`요청 시간 초과 (${timeoutMs}ms): ${endpoint}`);
  }
}

export class ParseError extends AppError {
  public readonly type: "json";
  public readonly sourceName: string;
  public readonly raw: string | null | undefined;

  constructor(
    context: {
      type: "json",
      sourceName: string,
      raw: string | null | undefined
    },
    public readonly cause?: unknown
  ) {
    super(`${context.sourceName} 파싱 실패: ${context.raw}`, cause);
    this.type = context.type;
    this.sourceName = context.sourceName;
    this.raw = context.raw;
  }
}

export class StorageError extends AppError {
  public readonly key: string;
  public readonly action: "read" | "write";

  constructor(
    context: {
      key: string,
      action: "read" | "write",
    },
    public readonly cause?: unknown
  ) {
    super(`LocalStorage ${context.action === "read" ? "읽기" : "쓰기"} 에러: ${context.key}`, cause);
    this.key = context.key;
    this.action = context.action;
  }
}

export async function handleError(error: unknown) {
  console.error(error);

  if (error instanceof APIError) {
    const isJson = error.response.headers.get("content-type")?.includes("application/json");
    const body = isJson ? await error.response.json() : await error.response.text();
    const bodyStr = String(body);
    const message = bodyStr.length ? bodyStr : "응답이 없습니다.";
    showErrorToast({ title: `API 에러 (${error.response.status})`, message: `${message}` });
    return;
  }

  if (error instanceof TimeoutError) {
    showErrorToast({ title: "요청 시간 초과", message: error.message });
    return;
  }

  if (error instanceof AppError) {
    showErrorToast({ title: error.name, message: error.message });
    return;
  }

  const message = error instanceof Error ? error.message : "알 수 없는 에러가 발생했습니다.";
  showErrorToast({ title: "에러", message });
}
