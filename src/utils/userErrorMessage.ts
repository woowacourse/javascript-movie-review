export function userErrorMessage(error: unknown): string {
  if (error instanceof TypeError) {
    return "네트워크 연결을 확인해주세요.";
  }

  if (error instanceof Error) {
    return "영화 정보를 불러오지 못했습니다.";
  }

  return "알 수 없는 오류가 발생했습니다.";
}
