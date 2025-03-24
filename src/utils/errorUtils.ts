export const errorMessages = (status: number) => {
  switch (status) {
    case 400:
      return "검색 가능한 페이지 수를 넘겼습니다.";
    case 401:
      return "사용자 인증 정보가 잘못되었습니다.";
    default:
      return "예상치 못한 오류가 발생했습니다.";
  }
};
