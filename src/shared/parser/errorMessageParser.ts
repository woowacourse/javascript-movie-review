const errorMessageParser = (error: Error) => {
  let errorMessage = "영화를 불러오는데 실패했습니다.";

  if (error.message.includes("404")) {
    errorMessage = "요청하신 페이지를 찾을 수 없습니다.";
  }

  if (error.message.includes("500")) {
    errorMessage = "서버에 문제가 있습니다.";
  }

  return errorMessage;
};

export default errorMessageParser;
