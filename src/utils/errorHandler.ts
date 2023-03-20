export const errorHandler = (status: string) => {
  switch (status) {
    case "401":
      return "접근 권한이 없습니다.";
    case "404":
      return "요청한 리소스를 찾을 수 없습니다.";
    case "500":
      return "서버 오류가 발생하였습니다.";
    default:
      return "알 수 없는 오류가 발생했습니다.";
  }
};
