import { showErrorToast } from "./toast";

export class APIError extends Error {
  response?: Response;

  constructor(message: string, response?: Response) {
    super(message)
    this.name = "APIError";
    if (response) this.response = response;
  }
}

export async function handleError(catchedError: unknown) {
  if (catchedError instanceof APIError) {
    const body = await catchedError.response?.json().catch(() => catchedError.response?.text());
    showErrorToast({ title: catchedError.message, message: body ?? "응답을 찾을 수 없습니다." });
    return;
  }

  const error = catchedError instanceof Error ? catchedError : new Error("에러 객체를 찾을 수 없습니다.");
  const message = error.message ?? "에러 메시지가 없습니다.";
  showErrorToast({ title: "에러", message });
}