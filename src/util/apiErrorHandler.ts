export const handleHTTPError = (errorStatus: number) => {
  const ApiError = {
    status: "rejected",
    error: errorStatus,
  };

  if (errorStatus >= 500) {
    return {
      ...ApiError,
      errorMessage: "서버측에서 예상치 못한 에러가 발생했습니다.",
    };
  }

  if (errorStatus >= 400) {
    return {
      ...ApiError,
      errorMessage: "요청하신 페이지를 찾을 수 없습니다.",
    };
  }

  return {
    ...ApiError,
    errorMessage: "예상치 못한 에러가 발생했습니다.",
  };
};

export const handleOffLine = () => {
  if (!navigator.onLine) {
    throw new Error("인터넷이 연결되어 있지 않습니다.");
  }
};
