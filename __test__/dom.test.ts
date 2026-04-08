// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { $ } from '../src/utils/dom';

describe('$', () => {
  it('셀렉터에 해당하는 엘리먼트를 반환한다', () => {
    const parent = document.createElement('div');
    const child = document.createElement('span');
    child.className = 'target';
    parent.appendChild(child);

    expect($(parent, '.target')).toBe(child);
  });

  it('엘리먼트가 없으면 에러를 던진다', () => {
    const parent = document.createElement('div');

    expect(() => $(parent, '.missing')).toThrow('.missing 없음');
  });
});
