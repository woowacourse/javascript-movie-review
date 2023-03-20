export const getErrorMessageByStatusCode = (statusCode: number) => {
  switch (statusCode) {
    case 400:
      return '잘못된 요청입니다.';
    case 401:
      return '인증되지 않은 사용자입니다.';
    case 403:
      return '접근이 거부되었습니다.';
    case 404:
      return '요청하신 페이지를 찾을 수 없습니다.';
    case 500:
      return '서버에 오류가 발생했습니다.';
    default:
      return '알 수 없는 오류가 발생했습니다.';
  }
};

export const handleError = (error: Error) => {
  if (error instanceof TypeError) {
    alert('영화 목록을 불러올 수 없습니다. 네트워크 연결에 문제가 있는지 확인해 주세요.');
  } else {
    alert(error.message);
  }
};
