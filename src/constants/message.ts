export interface CustomErrorMessage {
  error: string;
  desc: string;
}

const FETCH_ERROR_MESSAGE: Record<number, CustomErrorMessage> = {
  400: { error: '잘못된 요청입니다.', desc: 'Status 400' },
  401: { error: '인증되지 않은 요청입니다.', desc: 'Status 401' },
  403: { error: '접근 권한이 없습니다.', desc: 'Status 403' },
  404: { error: '요청한 리소스를 찾을 수 없습니다.', desc: 'Status 404' },
  500: { error: '서버 내부 오류가 발생했습니다.', desc: 'Status 500' },
};

const DEFAULT_ERROR_MESSAGE: CustomErrorMessage = {
  error: '알 수 없는 오류가 발생했습니다.',
  desc: '다시 접속해주세요.',
};

export const SEARCH_ERROR_MESSAGE: Record<string, CustomErrorMessage> = {
  NO_RESULT: { error: '🔎 검색 결과가 없습니다. 🔎', desc: '검색 값이 올바른지 확인해주세요.' },
  EMPTY: { error: '빈 값이나 스페이스는 검색할 수 없습니다.', desc: '올바른 값을 입력해주세요.' },
  EQUAL: { error: '같은 입력 값을 검색했습니다.', desc: '다른 값을 검색해보세요.' },
};

export const getErrorMessage = (status: number) => FETCH_ERROR_MESSAGE[status] ?? DEFAULT_ERROR_MESSAGE;

export const isCustomErrorMessage = (message: any): message is CustomErrorMessage =>
  typeof message === 'object' && 'error' in message && 'desc' in message;
