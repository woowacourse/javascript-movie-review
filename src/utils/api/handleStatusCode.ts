export const handleStatusCode = (response: Response) => {
  switch (response.status) {
    case 200:
      return response;
    case 500:
      throw new Error('네트워크 에러가 발생했습니다.');
  }
};
