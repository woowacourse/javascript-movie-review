export const getData = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    switch (response.status) {
      case 401:
        throw new Error(
          "접근 권한이 없습니다. 해당 기능을 사용하려면 계정 권한을 확인하세요."
        );
      case 404:
        throw new Error("영화를 찾을 수 없습니다. 잠시후 다시 시도해주세요.");
      case 500:
        throw new Error(
          "서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
        );
      case 503:
        throw new Error(
          "일시적으로 서비스를 이용할 수 없습니다. 잠시 후 다시 시도해주세요."
        );
      default:
        throw new Error(
          "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
        );
    }
  }
  return data;
};
