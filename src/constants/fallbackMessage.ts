const FALLBACK_LOOKUP_TABLE: Record<string, string> = {
  default: '조건에 맞는 영화가 없어요 :(',
  '401': '접근 권한이 없어요 :(',
  '404': '잘못된 URL로 접근했어요 :(',
  '500': '서버에 일시적인 문제가 있어요 :(',
  '503': '서비스를 이용할 수 없어요 :(',
} as const;

export default FALLBACK_LOOKUP_TABLE;
