export const EMPTY_SEARCH_RESULT = '검색 결과가 없습니다.(철자 또는 특수문자를 확인해주세요.)';

export const PAGE_TITLE = Object.freeze({
  POPULAR_NOW: '지금 인기 있는 영화',
  showSearchResult: (keyword: string) => `"${keyword}" 검색 결과`,
});

export const MAX_KEYWORD_LENGTH = 150;

export const ERROR_MESSAGE = Object.freeze({
  EMPTY: '아무것도 입력하지 않았습니다.',
  KEYWORD_LENGTH: `검색 키워드는 ${MAX_KEYWORD_LENGTH}자 이하로 입력해주세요.`,
});
