const ResponseValidator = (response: any) => {
  switch (response.status) {
    case 401: {
      throw new Error('API KEY 검증에 실패했습니다. 개발자에게 문의해주세요. https://github.com/greetings1012');
    }
  }
};

export default ResponseValidator;
