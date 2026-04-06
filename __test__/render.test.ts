// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import Main from '../src/components/main/Main.ts';
import MOCK_DATA from './mock/page_1.json';

describe('영화목록을 불러와서 렌더링하기', () => {
  it('성공 시 20개의 li가 나온다', () => {
    const main = new Main('인기 영화');
    document.body.appendChild(main.$element);

    main.renderMovies(MOCK_DATA.results);

    const $listItems = document.body.querySelectorAll('li');
    expect($listItems.length).toBe(20);

    document.body.innerHTML = '';
  });

  it('renderSkeletons 호출 시 20개의 스켈레톤 li가 렌더링된다', () => {
    const main = new Main('인기 영화');
    document.body.appendChild(main.$element);

    main.renderSkeletons(20);

    const $listItems = document.body.querySelectorAll('li');
    expect($listItems.length).toBe(20);

    document.body.innerHTML = '';
  });
});
