// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderFetchMovieItem } from '../src/render.ts';
import MOCK_DATA from './mock/page_1.json';

vi.stubGlobal('fetch', vi.fn());

describe('영화목록을 불러와서 렌더링하기', () => {
  it('성공 시 20개의 li가 나온다', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => MOCK_DATA,
    } as Response);

    const $target = document.body;
    await renderFetchMovieItem($target, 1);

    const $listItems = $target.querySelectorAll('li');
    expect($listItems.length).toBe(20);
  });

  it('검색 결과가 없을 경우 "검색결과없음" UI 렌더링하기', async () => {
    // 가짜 데이터 응답 세팅
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ page: 1, results: [], total_pages: 0 }),
    } as Response);

    const $target = document.body;
    
    // 이상한 검색어로 렌더링 실행
    await renderFetchMovieItem($target, 1, 'ㅇㅅㅇ');

    // .empty-result 클래스를 가진 요소가 화면에 나타나는지 검증
    const $emptyUI = $target.querySelector('.empty-result');
    expect($emptyUI).not.toBeNull(); 
    expect($emptyUI?.textContent).toContain('검색 결과가 없습니다');
  });
});
