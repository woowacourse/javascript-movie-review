export class InvalidRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidRequestError';
  }
}

export const handleError = (status: number) => {
  // if (status === 400) throw new BadRequestError('주소를 다시 입력해주세요.');
  // if (status === 401) throw new BadRequestError('[API ERROR] NOT_AUTHORIZED');
  // if (status === 404) throw new BadRequestError('페이지가 존재하지 않습니다.');
  if (status !== 200) throw new InvalidRequestError('영화가 존재하지 않습니다.');
};
