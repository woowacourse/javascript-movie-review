// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderFetchMovieItem } from '../src/api.ts';
import MOCK_DATA from './mock/page_1.json';

vi.stubGlobal('fetch', vi.fn());

describe('영화목록을 불러와서 렌더링하기', () => {
  it('성공 시 20개의 li가 나온다', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => MOCK_DATA,
    } as Response);

    const $target = document.body;
    await renderFetchMovieItem($target);

    const $listItems = $target.querySelectorAll('li');
    expect($listItems.length).toBe(20);
  });
});
