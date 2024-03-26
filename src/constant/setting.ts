export const TITLE_TEXT = {
  POPULAR: '지금 인기 있는 영화',
  SEARCH: (title: string) => `"${title}" 검색 결과`,
};

export const MAX_PAGE_PER_REQUEST = 20;

export const TAB = {
  POPULAR: 'popular',
  SEARCH: 'search',
};

export const ERROR_MESSAGE = {
  UNAUTHORIZED:
    '접근 권한이 없습니다. 해당 기능을 사용하려면 계정 권한을 확인하세요.',
  NOT_FOUND: '영화를 찾을 수 없습니다. 잠시후 다시 시도해주세요.',
  INTERNAL_SERVER: '서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  SERVICE_UNAVAILABLE:
    '일시적으로 서비스를 이용할 수 없습니다. 잠시 후 다시 시도해주세요.',
  UNKNOWN: '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  INVALID_API_KEY:
    '유효하지 않은 API 키입니다. 올바른 API 키를 확인하고 다시 시도해주세요.',
  FETCH_POPULAR_MOVIES_FAILED:
    '인기 영화를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.',
  FETCH_SEARCHED_MOVIES_FAILED:
    '해당 키워드로 작품을 찾을 수 없습니다. 다른 키워드를 입력해주세요.',
};

export const INFO_MESSAGE = {
  EMPTY_SEARCH_KEYWORD: '검색어를 입력해주세요.',
  MAX_PAGE: '목록의 끝에 도달했습니다 🚀',
};
