import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchPopularMovies } from '../src/api.ts';
import MOCK_DATA from './mock/page_1.json';

// 전역 fetch를 Vitest의 가짜 함수로 안전하게 덮어씌웁니다.
vi.stubGlobal('fetch', vi.fn());

describe('fetchPopularMovies API 통신 테스트', () => {
  // mock 함수의 호출 기록을 초기화.
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('올바른 URL, Authorization 헤더, 데이터를 성공적으로 가져와야 한다', async () => {
    // 가짜 응답 데이터 세팅
    const mockData = MOCK_DATA;

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    // 함수 실행
    const result = await fetchPopularMovies();

    // 리턴받은 데이터가 우리가 세팅한 가짜 데이터와 일치하는가?
    expect(result).toEqual(mockData);

    // fetch가 정확한 URL과 "options" 객체를 달고 1번 호출되었는가?
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          accept: 'application/json',
          // API_KEY는 환경에 따라 다를 수 있으므로 'Bearer '라는 글자가 포함되었는지만 검사
          Authorization: expect.stringContaining('Bearer '),
        }),
      }),
    );
  });
});
