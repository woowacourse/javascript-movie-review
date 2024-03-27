const ResponseValidator = (response: any) => {
  switch (response.status) {
    case 401: {
      throw new Error('API KEY 검증에 실패했습니다. 클릭하면 개발자의 Github로 이동합니다.');
    }
  }
};

export default ResponseValidator;
