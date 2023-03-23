export type ERROR_MESSAGE = `[ERROR] ${string}.`;
export type ERROR_MESSAGE_FN = (payload: { [key: string]: unknown }) => ERROR_MESSAGE;
export type ERROR_MESSAGE_FORMAT = ERROR_MESSAGE | ERROR_MESSAGE_FN;

type CodeToMessage<T> = Record<keyof T, ERROR_MESSAGE_FORMAT>;

const STATUS_400 = `[ERROR] 잘못된 요청입니다.`;
const STATUS_401 = `[ERROR] 인증되지 않은 요청입니다.`;
const STATUS_403 = `[ERROR] 접근이 거부되었습니다.`;
const STATUS_404 = `[ERROR] 서버 내부 오류가 발생했습니다.`;
const STATUS_500 = `[ERROR] 서버 내부 오류가 발생했습니다.`;
const UNEXPECTED_ERROR = `[ERROR] 알 수 없는 오류가 발생했습니다.`;

export const STATUS_CODE = Object.freeze({
  STATUS_400: 400,
  STATUS_401: 401,
  STATUS_403: 403,
  STATUS_404: 404,
  STATUS_500: 500,
});

export const ERROR_CODE = Object.freeze({
  UNEXPECTED_ERROR: 'UNEXPECTED_ERROR',
  STATUS_400: 'STATUS_400',
  STATUS_401: 'STATUS_401',
  STATUS_403: 'STATUS_403',
  STATUS_404: 'STATUS_404',
  STATUS_500: 'STATUS_500',
});
export const ERROR_MESSAGE: CodeToMessage<typeof ERROR_CODE> = Object.freeze({
  STATUS_400,
  STATUS_401,
  STATUS_403,
  STATUS_404,
  STATUS_500,
  UNEXPECTED_ERROR,
});

export type StatusCode = typeof STATUS_CODE;
export type ErrorCode = typeof ERROR_CODE;
export type ErrorMessage = typeof ERROR_MESSAGE;
