import {
  NetworkError,
  ServerError,
  ServerResponseTypeError,
} from "./fetchError";

export const fetchWithValidation = async (url: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const statusCode = response.status;

      if (statusCode >= 400 && statusCode < 500)
        throw new ServerError(getErrorMessage(statusCode), statusCode);

      if (statusCode >= 500 && statusCode < 600)
        throw new ServerError(getErrorMessage(statusCode), statusCode);

      throw new ServerError("예기치 못한 에러가 발생하였습니다.", statusCode);
    }

    const result = await response.json();

    if (typeof result !== "object")
      throw new ServerResponseTypeError("서버 응답 오류가 발생하였습니다.");

    return result;
  } catch (error) {
    if (
      error instanceof ServerResponseTypeError ||
      error instanceof ServerError
    )
      throw error;

    if (error instanceof TypeError)
      throw new NetworkError("네트워크 오류가 발생하였습니다.");

    throw new Error("예기치 못한 오류가 발생하였습니다.");
  }
};

const getErrorMessage = (status: number) => {
  switch (true) {
    case status === 401:
      return "접근 권한이 없습니다.";
    case status === 404:
      return "요청한 리소스를 찾을 수 없습니다.";
    case status >= 400 && status < 500:
      return "클라이언트 오류가 발생하였습니다";
    case status >= 500 && status < 600:
      return "서버 오류가 발생하였습니다.";
    default:
      return "알 수 없는 오류가 발생했습니다.";
  }
};
