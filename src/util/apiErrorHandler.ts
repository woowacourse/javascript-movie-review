export const handleHTTPError = (errorStatus: number) => {
  if (errorStatus >= 500) {
    throw new Error("서버측에서 예상치 못한 에러가 발생했습니다.");
  }

  if (errorStatus >= 400) {
    throw new Error("요청하신 페이지를 불러올 수 없습니다.");
  }

  throw new Error("예상치 못한 에러가 발생했습니다.");
};

export const handleOffLine = () => {
  if (!navigator.onLine) {
    throw new Error("인터넷이 연결되어 있지 않습니다.");
  }
};
