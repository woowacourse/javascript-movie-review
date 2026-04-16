import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchPopularMovies, fetchSearchMovies } from '../src/api/fetchApi.ts';
import MOCK_DATA from './mock/page_1.json';
import MOCK_ERROR from './mock/page_error.json';

vi.stubGlobal('fetch', vi.fn());

describe('fetchSearchMovies API 통신 테스트', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('검색어와 페이지를 포함한 URL로 fetch를 호출하고 데이터를 반환한다', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => MOCK_DATA,
    } as Response);

    const result = await fetchSearchMovies('해리포터', 1);

    expect(result).toEqual(MOCK_DATA);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('search/movie'), expect.any(Object));
  });
});
