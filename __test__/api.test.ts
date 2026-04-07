import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchPopularMovies, fetchSearchMovies } from '../src/api.ts';
import MOCK_DATA from './mock/page_1.json';

// 전역 fetch를 Vitest의 가짜 함수로 안전하게 덮어씌웁니다.
vi.stubGlobal('fetch', vi.fn());

describe('API 래퍼 파라미터 검증 테스트', () => {
  // mock 함수의 호출 기록을 초기화.
  beforeEach(() => {
    vi.clearAllMocks();
    // 가짜 응답 데이터 세팅
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => MOCK_DATA,
    } as Response);
  });

  it('fetchPopularMovies 검증 : 올바른 Path, 기본 파라미터(page, region, language)를 성공적으로 가져와야 한다', async () => {
    // 함수 실행
    const result = await fetchPopularMovies(1);

    // 리턴받은 데이터가 우리가 세팅한 가짜 데이터와 일치하는가?
    expect(result).toEqual(MOCK_DATA);

    // URL과 options 가져오기
    const [calledUrl, options] = vi.mocked(fetch).mock.calls[0];
    // 문자열을 URL 객체로 변환하여 규칙 검증
    const url = new URL(calledUrl as string);

    // Path 검증
    expect(url.pathname).toBe('/3/movie/popular');

    // 기본 파라미터가 잘 들어가 있는가?
    expect(url.searchParams.get('page')).toBe('1');
    expect(url.searchParams.get('region')).toBe('ko-KR');
    expect(url.searchParams.get('language')).toBe('ko');
    expect(url.searchParams.has('query')).toBe(false);

    // API 키 형태는 잘 들어가 있는가?
    expect(options?.headers).toEqual(
      expect.objectContaining({
        Authorization: expect.stringContaining('Bearer '),
        accept: 'application/json',
      }),
    );
  });

  it('fetchSearchMovies 검증 : query를 포함하여 파라미터를 성공적으로 가져와야 한다', async () => {
    await fetchSearchMovies('해리포터', 1);

    const [calledUrl, options] = vi.mocked(fetch).mock.calls[0];
    const url = new URL(calledUrl as string);

    // 쿼리 추가
    expect(url.pathname).toBe('/3/search/movie');
    expect(url.searchParams.get('query')).toBe('해리포터');
    expect(url.searchParams.get('page')).toBe('1');
    expect(url.searchParams.get('region')).toBe('ko-KR');

    expect(options?.headers).toEqual(
      expect.objectContaining({
        Authorization: expect.stringContaining('Bearer '),
      }),
    );
  });
});
