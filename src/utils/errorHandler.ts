import { StatusCode } from "./constants";

export const onHandleStatusError = (status: number) => {
  switch (status) {
    case StatusCode[401]:
      return "잘못된 요청입니다.";
    case StatusCode[402]:
      return "인증되지 않은 요청입니다.";
    case StatusCode[403]:
      return "접근 권한이 없습니다.";
    case StatusCode[404]:
      return "요청한 리소스를 찾을 수 없습니다.";
    case StatusCode[500]:
      return "서버 내부 오류가 발생했습니다.";
    default:
      return "알 수 없는 오류가 발생했습니다.";
  }
};

export const onHandleCatchError = (error: string) => {
  switch (error) {
    case undefined:
      return "영화 목록을 받아올 수 없습니다";
    default:
      return "페이지를 불러올 수 없습니다";
  }
};
