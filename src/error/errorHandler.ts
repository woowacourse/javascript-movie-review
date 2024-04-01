const errorHandler = (status: number) => {
  switch (status) {
    case 400:
      return '잘못된 문법으로 인하여 서버가 요청을 이해할 수 없는 상태입니다.';
    case 404:
      return '서버가 요청한 URL을 찾을 수 없습니다.';
    case 500:
      return '서버 내부에 어떠한 원인으로 인해 문제가 발생해서 요청을 처리할 수 없는 상태입니다.';
    case 503:
      return '서버가 일시적인 과부하에 걸리거나 예정된 작업으로 잠시 요청을 처리할 수 없는 상태입니다.';
    default:
      return '알 수 없는 오류가 발생했습니다.';
  }
};

export default errorHandler;
