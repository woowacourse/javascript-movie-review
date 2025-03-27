const ErrorMessages: { [key: number]: string } = {
  400: "검색 가능한 페이지 수를 넘겼습니다.",
  401: "사용자 인증 정보가 잘못되었습니다.",
};
export const errorMessages = (status: number) => {
  return ErrorMessages[status] ?? "예상치 못한 오류가 발생했습니다.";
};
