import { InvalidMessage, InvalidMessageType } from '../types/ui';

const NO_SEARCH_RESULT = 'NO_SEARCH_RESULT';
const ERROR_400_RANGE = 'ERROR_400_RANGE';
const ERROR_500_RANGE = 'ERROR_500_RANGE';

const HTTP_ERROR_CODE: Record<number, InvalidMessageType> = {
  400: ERROR_400_RANGE,
  500: ERROR_500_RANGE,
};

const INVALID_MESSAGE_TYPES = [NO_SEARCH_RESULT, ERROR_400_RANGE, ERROR_500_RANGE] as const;

const INVALID_MESSAGE: Record<InvalidMessageType, InvalidMessage> = {
  NO_SEARCH_RESULT: {
    HEADING: (searchKey: string) =>
      `입력하신 검색어 "${searchKey}"(와)과 일치하는 결과가 없습니다.`,
    CONTENT: '다른 키워드를 입력해 보세요.',
  },
  ERROR_400_RANGE: {
    HEADING: '요청하신 작업을 할 수 없습니다.',
    CONTENT: '다시 시도해 주세요.',
  },
  ERROR_500_RANGE: {
    HEADING: '서비스 이용에 불편을 드려 죄송합니다.',
    CONTENT: '새로고침 단추를 클릭하거나 나중에 다시 시도해 주세요.',
  },
} as const;

export { HTTP_ERROR_CODE, INVALID_MESSAGE_TYPES, INVALID_MESSAGE };
